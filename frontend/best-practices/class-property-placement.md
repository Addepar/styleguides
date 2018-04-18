# Class Property Placement

Classes in Javascript can be confusing, and knowing where to put a value can be
hard to figure out. Should it be on the prototype of the class? Should it be a
static value? Should it be a variable outside of the class?

This guide breaks down what the different types of placements are, how they
differ from each other, and when you should use which. It assumes that you have
some knowledge of how Prototypical Inheritance works, if not [this chapter from
You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md)
is a great primer.

## Types of Placement

There are 4 basic kinds of places you can put a value in Javascript in relation
to a class. You can place it as a:

* Class instance property
* Class static property
* Class prototype property
* Module variable

## Class Instance Properties

Instance properties are values that are assigned to each instance of the class.
In generic Javascript this is generally done in the class constructor, and in
Ember it can be done in the `init` hook (which is analagous to the constructor):

```js
class Foo {
  constructor() {
    this.values = [1, 2, 3];
  }
}

// using class fields
class Foo {
  values = [1, 2, 3];
}

// Using EmberObject
const Foo = EmberObject.extend({
  init() {
    this.values = [1, 2, 3];
  },
});
```

Instance properties (also known as class fields) are unique to each instance of
the class, which allows them to maintain different state:

```js
let foo1 = new Foo();
let foo2 = new Foo();

console.log(foo1.values); // [1, 2, 3]
console.log(foo2.values); // [1, 2, 3]

foo1.values.push(4);

console.log(foo1.values); // [1, 2, 3, 4]
console.log(foo2.values); // [1, 2, 3]
```

The same effect can also be achieved by using a computed property without
dependent keys in Ember:

```js
const Foo = EmberObject.extend({
  values: computed(() => [])
});
```

You should use instance properties whenever you have a value that could change,
and you don't want or need to share that information with other instances of the
class. This is generally the most common type of placement for properties.

If you're certain that the property being shared will never change (e.g. it is
an enum or a constant value) you should instead use a module variable, as it is
more performant. Particularly for arrays/objects, new instances of values will
be created for every instance of the class, which is not ideal for constant
values.

## Class Static Properties

Static properties are placed directly on the constructor of the class. In native
classes they will be enabled by class fields, and in Ember they can be added
using `reopenClass`:

```js
class Foo {
  static values = [1, 2, 3];
}

let Foo = EmberObject.extend();

Foo.reopenClass({
  values: [1, 2, 3],
});
```

Static properties only exist on the constructor, and they should generally be
referenced directly:

```js
let foo = new Foo();

console.log(foo.values); // undefined
console.log(Foo.values); // [1, 2, 3]

// good
Foo.values;

// bad
foo.constructor.values;
```

Static properties (and functions/methods) are useful when they describe the
class itself and not the individual instances, or provide functionality
directly. `EmberObject.extend` and `EmberObject.create` are static methods that
wrap standard ES6 class syntax but add extra Ember functionality for instance.

Static properties can be used for state that should be shared across all
instances of a class, should be publicly accessible from the outside world, and
does not belong in a service or another construct. Static properties should
NOT be used for constant values and enums, instead you should use module
variables.

## Class Prototype Properties

Class prototype properties are currently the main way that Ember assigns
properties to classes when using `extend`. They do not have an analog in
standard native classes, except in directly manipulating the prototype. Because
they exist on the prototype, they are shared state between classes, which can
become confusing:

```js
const Foo = EmberObject.extend({
  prop: true,
  values: [1, 2, 3],
});

let foo1 = Foo.create();
let foo2 = Foo.create();

foo1.values.push(4);

console.log(foo1.values); // [1, 2, 3, 4]
console.log(foo2.values); // [1, 2, 3, 4]

foo1.prop = false;

console.log(foo1.prop); // false
console.log(foo1.prototype.prop); // true
console.log(foo2.prop); // true
```

Prototype properties should _only_ be used for Ember classes, and should _only_
be used for primitive values. They should _never_ be used for objects or arrays
since the state is shared between all instances. If it is appropriate to share
state, consider a module variable or a static class property, or storing the
state elsewhere (a service for instance).

## Module Variables

Javascript is all about closure, and modules are really just a closure in the
end. This means that you can store some values outside of class definitions when
it makes sense:

```js
const PI = 3.14;

class MathyThings {
  area(r) {
    return PI * r * r;
  }
}
```

This also works perfectly well for enumerations:

```js
const VALID_TYPES = {
  success: true,
  error: true,
}

const RESIZE_MODE = {
  STANDARD: 'standard',
  NONE: 'none',
}

class Foo {
  isValid() {
    return VALID_TYPES[this.type];
  }

  onResize() {
    if (this.resizeMode === RESIZE_MODE.STANDARD) {
      //...
    }
  }
}
```

These values can also be exported if you want to share them with the wider app:

```js
export const PI = 3.14;
export const E = 2.72;
```

Generally speaking, you should not store mutable state as a module variable,
even though it's technically possible. If you do need to store some state and
want to do it via a module variable, use a `WeakMap`:

```js
// bad
let id = 0;
let PRIVATE_STATE = {};

class Foo {
  constructor() {
    this.id = id++;

    PRIVATE_STATE[id] = 'a private field';
  }

  getPrivate() {
    return PRIVATE_STATE[id];
  }
}

// good
let PRIVATE_STATE = new WeakMap();

class Foo {
  constructor() {
    PRIVATE_STATE.set(this, 'a private field');
  }

  getPrivate() {
    return PRIVATE_STATE.get(this);
  }
}
```

This is a powerful pattern and can be used to make what are essentially private
fields for a class. However, it is a lot of boilerplate, adds a complex level of
indirection, and is hard to understand and easy to mess up. Private fields are
in the process of being added to Javascript, and they essentially work like
this, so if you are thinking of adding a `WeakMap` for your class for a few
private values, it is probably a better idea to wait until they are available.
