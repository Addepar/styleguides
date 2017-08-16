# Ember.js Style Guide

## Table Of Contents

* [General](#general)
* [Organizing your modules](#organizing-your-modules)
* [Models](#models)
* [Controllers](#controllers)
* [Templates](#templates)
* [Routing](#routing)
* [ES Classes](#es-classes)

## General

### Import what you use, do not use globals

Ember recently converted to a modules based API where you import what you use
rather than the whole Ember namespace. This has a number of benefits, including
enabling tree-shaking (where we remove all unused code from the final build of the
app) and splitting Ember into smaller, self-contained libraries.

You can read up on the JS Module API in and it's usage in [the RFC](https://github.com/emberjs/rfcs/blob/master/text/0176-javascript-module-api.md#addenda).

For Ember Data, [another RFC](https://github.com/emberjs/rfcs/blob/ember-data-modules/text/0000-ember-data-javascript-module-api.md)
is currently in the works to nail down the exact modules. In the meantime, we should
import the `DS` namespace and destructure values off of it to emulate importing modules
directly.

```javascript
// Good

import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),

  surname: alias('lastName'),

  fullName: computed('firstName', 'lastName', function() {
    // Code
  })
});

// Bad

import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  surname: Ember.computed.alias('lastName'),

  fullName: Ember.computed('firstName', 'lastName', function() {
    // Code
  })
});
```

### Don't use Ember's prototype extensions

Avoid Ember's `Date`, `Function` and `String` prototype extensions. Prefer the
corresponding functions from the `Ember` object.

Preferably turn the prototype extensions off by updating the
`EmberENV.EXTEND_PROTOTYPES` setting in your `config/environment` file.

```javascript
module.exports = function(environment) {
  var ENV = {
    EmberENV: {
      EXTEND_PROTOTYPES: {
        Date: false,
        Function: false,
        String: false
      }
    }
```

```javascript
// Good

export default Model.extend({
  hobbies: w('surfing skateboarding skydiving'),
  fullName: computed('firstName', 'lastName', function() { ... }),
  didError: on('error', function() { ... })
});

// Bad

export default Model.extend({
  hobbies: 'surfing skateboarding skydiving'.w(),
  fullName: function() { ... }.property('firstName', 'lastName'),
  didError: function() { ... }.on('error')
});
```

Array extensions should be avoided. Ember Arrays are necessary for watching
array changes in computeds and in templates, but they should be used _explicitly_
when possible, especially in addons:

```javascript
// good

let foo = [];
foo.pushObject('bar');

// better
import { A } from '@ember/array';

let foo = A();
foo.pushObject('bar');
```

## Organizing your modules

Ordering a module's properties in a predictable manner will make it easier to
scan.

1. __Plain properties__

   Start with properties that configure the module's behavior. Examples are
   `tagName` and `classNames` on components and `queryParams` on controllers and
   routes. Followed by any other simple properties, like default values for properties.

2. __Single line computed property macros__

   E.g. `alias`, `sort` and other macros. Start with service injections. If the
   module is a model, then `attr` properties should be first, followed by
   `belongsTo` and `hasMany`.

3. __Multi line computed property functions__

4. __Lifecycle hooks__

   The hooks should be chronologically ordered by the order they are invoked in.

5. __Functions__

   Public functions first, internal functions after.

6. __Actions__

```js
export default Component.extend({
  // Plain properties
  tagName: 'span',

  // Single line CP
  post: alias('myPost'),

  // Multiline CP
  authorName: computed('author.{firstName,lastName}', function() {
    // code
  }),

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    // code
  },

  // Functions
  someFunction() {
    // code
  },

  actions: {
    someAction() {
      // Code
    }
  }
});
```

### Override init

Rather than using the object's `init` hook via `on`, override init and
call `_super` with `...arguments`. This allows you to control execution
order. [Don't Don't Override Init](https://dockyard.com/blog/2015/10/19/2015-dont-dont-override-init)

## Models

### Organization

Models should be grouped as follows:

* Attributes
* Associations
* Computed Properties

Within each section, the attributes should be ordered alphabetically.

```js
// Good

import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  // Attributes
  firstName: attr('string'),
  lastName: attr('string'),

  // Associations
  children: hasMany('child'),

  // Computed Properties
  fullName: computed('firstName', 'lastName', function() {
    // Code
  })
});

// Bad

import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  children: hasMany('child'),
  firstName: attr('string'),
  lastName: attr('string'),

  fullName: computed('firstName', 'lastName', function() {
    // Code
  })
});

```

## Controllers

### Define query params first

For consistency and ease of discovery, list your query params first in
your controller. These should be listed above default values.

### Alias your model

It provides a cleaner code to name your model `user` if it is a user. It
is more maintainable

```javascript
export default Controller.extend({
  user: alias('model')
});
```

## Templates

### Do not use partials

Always use components. Partials share scope with the parent view, using
components will provide a consistent scope.

For a demonstration of why this is bad, consider if the following Javascript
was valid:

```javascript
function logX() {
  console.log(x);
}


function foo() {
  let x = 4;

  function bar() {
    let x = 'baz';

    logX();
  }

  logX(); // '4'
  bar(); // 'baz'
}
```

This is essentially what partials are doing by pulling variables, bindings,
and values from whichever scope they are used in. It creates brittle, error
prone code without a strong contract over its usage.

### Don't yield `this`

_Note: Pending Ember 1.13, the hash helper is not yet available_

Use the hash helper to yield what you need instead.

```hbs
{{! Good }}
{{yield (hash thing=thing action=(action "action"))}}

{{! Bad }}
{{yield this}}
```

### Always use the `action` keyword to pass actions.

_Note: Pending Ember 1.13, the action keyword is not yet available_

Although it's not strictly needed to use the `action` keyword to pass on
actions that have already been passed with the `action` keyword once,
it's recommended to always use the `action` keyword when passing an action
to another component. This will prevent some potential bugs that can happen
and also make it more clear that you are passing an action.

```hbs
{{! Good }}
{{edit-post post=post deletePost=(action deletePost)}}

{{! Bad }}
{{edit-post post=post deletePost=deletePost}}
```

### Ordering static attributes, dynamic attributes, and action helpers for HTML elements

Ultimately, we should make it easier for other developers to read templates.
Ordering attributes and then action helpers will provide clarity.

```hbs
{{! Bad }}

<button disabled={{isDisabled}} data-auto-id="click-me" {{action (action click)}} name="wonderful-button" class="wonderful-button">Click me</button>
```

```hbs
{{! Good }}

<button class="wonderful-button"
  data-auto-id="click-me"
  name="wonderful-button"
  disabled={{isDisabled}}
  onclick={{action click}}>
    Click me
</button>
```

## Routing

### Perform all async actions required for the page to load in route `model` hooks

The model hooks are async hooks, and will wait for any promises returned
to resolve. An example of this would be models needed to fill a drop
down in a form, you don't want to render this page without the options
in the dropdown. A counter example would be comments on a page. The
comments should be fetched along side the model, but should not block
your page from loading if the required model is there.

## ES Classes

Now that ES Classes have solidified and features like decorators and properties
have begun to be built out, Ember is beginning to move toward using them, and long
run they will become the standard. We can begin using ES Classes now, with certain
caveats.

NOTE: ES Classes are not truly usable without [decorators](https://github.com/tc39/proposal-decorators)
which are currently stage 2 in TC39 and [class fields](https://github.com/tc39/proposal-class-fields)
which are currently stage 3. Until both proposals are at least stage 3 we can't
recommend their usage as truly stable, so they should only be used in addons and
relatively small applications.

### Example Usage

Before:

```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  foo: Ember.inject.service(),

  bar: Ember.computed('someKey', 'otherKey', function() {
    var someKey = this.get('someKey');
    var otherKey = this.get('otherKey');

    return `${someKey} - ${otherKey}`;
  }),

  actions: {
    handleClick() {
      // do stuff
    }
  }
});
```

After:

```javascript
import Component from '@ember/component'
import { action, computed } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class ExampleComponent extends Component {
  @service foo

  @computed('someKey', 'otherKey')
  bar(someKey, otherKey) {
    return `${someKey} - ${otherKey}`;
  }

  @action
  handleClick() {
    // do stuff
  }
}
```

### Style Notes

+ Use the [ember-decorators](https://github.com/ember-decorators/ember-decorators) and
[utility-decorators](https://github.com/ember-decorators/utility-decorators) decorator
libraries
+ Always specify a class name rather than using anonymous classes. This gives the
prototype a name, which will allow us to identify instances, and also makes it easier
to grep the codebase for classes.
+ Use the `constructor` rather than init
+ Assign default values in the `constructor`

```javascript
// before
export default Ember.Component.extend({
  foo: 'bar'
});

// after
export default class ExampleComponent extends Component {
  constructor() {
    this.super(...arguments);

    this.foo = this.foo !== undefined ? this.foo : 'bar';
  }
}
```

### With Ember 2.13+

Classes can be used with modern Ember versions with the following caveats:

+ Observers and event listeners will not work at all
+ Merged/concatenated properties will not work by default
  * There will be an `@className` decorator added to ember-decorators soon
  to enable `classNameBindings`, and there is an `@action` decorator already

### With Ember 1.11 - 2.12

Classes can be used as reliably as far back as Ember 1.11 with the following caveats:

+ The `constructor` is never called due to the double extend which was used
for injections until 2.13, so `init` must be used instead. This also means
that class fields will never have their default values assigned.
  * The `property` decorator in `@addepar/ice-box` can be used to assign
  class properties directly to the prototype of the class, emulating past
  ember behavior. This should be made available in an `ember-decorators`
  utility library soon as an `@proto` decorator.


