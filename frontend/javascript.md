# JavaScript Style Guide

## Table Of Contents

### Grammar

* [Block Statements](#block-statements)
* [Conditional Statements](#conditional-statements)
* [Commas](#commas)
* [Semicolons](#semicolons)
* [Comments](#comments)
* [Assignment](#assignment)
* [Whitespace](#whitespace)
* [Naming conventions](#naming-conventions)

### Constructors

* [Constructors](#constructors)

### Objects

* [Objects](#objects)
* [Properties](#properties)

### Strings

* [Strings](#strings)

### Arrays

* [Arrays](#arrays)

### Functions

* [Functions](#functions)
* [Function Arguments](#function-arguments)

### General Performance

* [General Performance](#general-performance)

## Block Statements

+ Use spaces before leading brace.

```javascript
// good
function doStuff(foo) {
  return foo;
};

// bad
function doStuff(foo){
  return foo;
};
```

+ Opening curly brace (`{`) should be on the same line as the beginning of a
statement or declaration.

```javascript
// good
return fooBar(foo, (bars) => {
  return bars.map((bar) => {
    return bar * 2;
  });
});

//bad
return fooBar(foo, (bars) =>
{
  return bars.map((bar) =>
  {
    return bar * 2;
  });
});
```

+ Keep `else` and its accompanying braces on the same line.

```javascript
let bar;

// good
if (foo === 1) {
  bar = 2;
} else {
  bar = '2';
}

// bad
if (foo === 1) {
  bar = 2;
}
else if (foo === 2) {
  bar = 1;
}
else {
  bar = 3;
}
```

## Conditional Statements

+ Use strict equality (`===` and `!==`).

+ Use curly braces for all conditional blocks.

```javascript
// good
if (notFound) {
  doBarrelRoll();
} else {
  jumpOnCouch();
}

// bad
if (notFound)
  doBarrelRoll();
else
  jumpOnCouch();
```

+ Use explicit conditions when checking for non `null`, `undefined`, `true`,
`false` values.

```javascript
const foo = 'foo';
const arr = [1, 2, 3];

// good
if (arr.length > 0) {
  return;
}

if (foo !== '') {
  // code
}

// bad
if (!arr.length) {
  return;
}

if (!foo) {
  return;
}
```

+ Use multiline format.

```javascript
// good
if (foo === 'bar') {
  return;
}

// bad
if (foo === 'bar') { return; }
```

+ Avoid use of `switch` statements. It is too easy to make logic mistakes in the code and can increase the code complexity. The same logic can be managed better using [polymorphism](https://sourcemaking.com/refactoring/replace-conditional-with-polymorphism).

```javascript
// bad
let className;

switch (state) {
  case 'success':
    className = 'text-success';
    break;
  case 'error':
    className = 'text-danger';
    break;
  case 'pending':
    className = 'text-warning';
    break;
  default:
    className = 'text-info';
}

// good
const STATE_CLASS_NAMES = {
  _default: 'text-info',
  success: 'text-success',
  error: 'text-danger',
  pending: 'text-warning'
};

const STATE_HANDLERS = {
  _default() { … },
  success() { … },
  pending() { … },
  error() { … }
};

let className = STATE_CLASS_NAMES[state] || STATE_CLASS_NAMES._default;

let handler = STATE_HANDLERS[state] || STATE_HANDLERS._default;
handler();
// If the handlers use `this` you will have to manage the context. For example:
handler.call(this);
```

+ Put parens and statements of multiline conditionals on their own lines

```javascript
// good
if (
  someBool && someReallyLongVariableName > 10000000000000000000000000
) {
  // code
}

if (
  (someBool && someOtherBool)
  || (someThirdBool && yetAnotherBool)
) {
  // code
}

// bad
if (someBool
    && someOtherBool) {
  // code
}

```

## Commas

+ Skip trailing commas.

```javascript
// good
const foo = {
  bar: [1, 2, 3],
  baz: {
    a: 'a'
  }
}

// bad
const foo = {
  bar: [1, 2, 3],
  baz: {
    a: 'a',
  },
}
```

+ Skip leading commas.

```javascript
// good
const potato = [
  'potatoes',
  'are',
  'delicious'
];

// bad
const potato = [
  'potatoes'
, 'are'
, 'delicious'
];
```

## Semicolons

+ Use semicolons`;`

## Comments

+ Use multiline comments with two leading asterisks for documentation.

```javascript
// good
/**
  This is documentation for something just below.
*/
function isItLunchTimeYet(time) {
  if (time) {
    return 'Yes.';
  }
}

// bad
//
// This is documentation for something just below.
//
function isItLunchTimeYet(time) {
  if (time) {
    return 'Yes.';
  }
}
```

+ Use [ESDoc](https://esdoc.org/) comments for documenting class, modules,
  functions, and constants.

+ Use `//` for non-documenting comments (both single and multiline).

```javascript
// good
function foo() {
  const bar = 5;

  // multiplies `bar` by 2.
  const newBar = fooBar(bar);

  console.log(newBar);
}

// bad
function foo() {
  const bar = 5;

  /* multiplies `bar` by 2. */
  const newBar = fooBar(bar);

  console.log(newBar);
}
```

+ Pad comments with a space.

## Assignment

+ Never use `var`. Prefer [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
in general unless the value of a variable must change, in which case use [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).

```javascript
// good
const a = [1, 2, 3];
let b = [4, 5, 6];

function doStuff() {
  b = [1, 2, 3];

  return b;
}

// bad
var a = [1, 2, 3];
let b = [1, 2, 3]; // isn't reassigned
```

+ Note that `const` refers to a **constant reference**, not a constant value.

```javascript
const coolKids = ['Estelle', 'Lauren', 'Romina'];
coolKids.push('Marin');
console.log(coolKids); // ['Estelle', 'Lauren', 'Romina', 'Marin']

coolKids = ['Doug', 'Lin', 'Dan']; // SyntaxError: "coolKids" is read-only
```

+ Note that both `let` and `const` are block scoped.

```javascript
{
  let a = 1;
  const b = 2;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

+ Group your `const`s and then group your `let`s.

```javascript
// good
const isTrue = true;
const bar = 123;
let foo;
let arr = [1, 2, 3];

// bad
let foo;
const bar = 123;
let arr = [1, 2, 3];
const isTrue = true;
```

+ Put all non-assigning declarations on one line.

```javascript
// good
let a, b;

// bad
let a,
b;
```

+ Use a single `const` declaration for each assignment.

```javascript
// good
const a = 1;
const b = 2;

// bad
const a = 1, b = 2;
```

+ Declare variables at the top of their block scope.

```javascript
function mutate(thing) {
  return new Promise((resolve) => {
    resolve(thing);
  });
}

// good
function bar() {
  const itemToPush = 'foo';
  const coolList = [1, 2, 3, 4, 5, 6];
  let updatedList = coolList.filter((item) => {
    return (item % 2) === 0;
  });

  mutate(updatedList).then((list) => {
    updatedList = list.push(itemToPush);
  });

  return updatedList;
}

// bad
function bar() {
  let updatedList = coolList.filter((item) => {
    return (item % 2) === 0;
  });

  const coolList = [1, 2, 3, 4, 5, 6];

  mutate(updatedList).then((list) => {
    updatedList = list.push(result);
  });

  const result = 'foo';
  return updatedList;
}
```

+ Use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  when assigning data from arrays or objects.

```javascript
let foo = ['one', 'two', 'three'];

// bad (without destructuring)
let one   = foo[0];
let two   = foo[1];
let three = foo[2];

// good (with destructuring)
let [one, two, three] = foo;

// bad
let id = model.id;
let name = model.name;

// good
let { id, name } = model;
```

## Whitespace

+ Use soft tabs set to 2 spaces.

```javascript
// good
function() {
∙∙const name;
}

// bad
function() {
⇥const name;
}
```

+ Place 1 space before a leading brace (`{`).

```javascript
// good
obj.set('foo', {
  foo: 'bar'
});

test('foo-bar', function() {
});

// bad
obj.set('foo',{
  foo: 'bar'
});

test('foo-bar', ()=>{
});
```

+ No spaces before semicolons.

```javascript
// good
const foo = {};

// bad
const foo = {} ;
```

+ Keep parentheses adjacent to the function name when declared or called.

```javascript
// good
function foo(bar) {
}

foo(1);

// bad
function foo (bar) {
}

foo (1);
```

+ No trailing whitespaces.

## Naming Conventions

+ Be descriptive with naming.

```javascript
// good
function checkValidKey(key, value = 0) {
  // ...
}

// bad
function check(k, v = 0) {
  // ...
}
```

+ Use PascalCase only for constructors or classes.

```javascript
// good
class Validator {
  constructor(options) {
    this.rules = options.rules;
  }
}

const presenceValidator = new Validator({
  rules: {}
});

// bad
function Validate(options) {
  return options === true;
}

const validatedItem = Validate(item);
```

+ Prefix with an underscore `_` when naming private properties or methods.

```javascript
// good
const foo = {
  _firstName: 'Yehuda',

  _somePrivateMethod() {
    console.log(this._firstName);
  }
};

// bad
const foo = {
  __firstName__: 'Yehuda',

  somePrivateMethod_() {
    console.log(this.__firstName__);
  }
};
```

## Constructors

+ Use `class` instead of manipulating `prototype`.

```javascript
// good
class Car {
  constructor(make = 'Tesla') {
    this.make = make;
    this.position = { x: 0, y: 0 };
  }

  move(x = 0, y = 0) {
    this.position = { x, y };
    return this.position;
  }
}

// bad
function Car(make = 'Tesla') {
  this.make = make;
  this.position = { x: 0, y: 0 };
}

Car.prototype.move = function(x = 0, y = 0) {
  this.position = { x, y };
  return this.position;
}
```

+ Use `extends` for inheritance.

```javascript
class HondaCivic extends Car {
  constructor() {
    super('Honda');
  }
}
```

## Objects

+ Use literal form for object creation.

```javascript
// good
const doug = {};

// bad
const doug = new Object();
```

+ Pad single-line objects with white-space.

```javascript
// good
const rob = { likes: 'ember' };

// bad
const rob = {hates: 'spiders'};
```

+ For multiline object declarations, brackets should be on their own line.
Values may either be on a single line, or each on their own line.

```javascript
// good
const foo = {
  foo: 1, bar: 2, baz: 3
};

const bar = {
  foo: 1,
  bar: 2,
  baz: 3
};

const baz = {
  foo: [
    1, 2, 3
  ],

  bar: {
    prop1: true, prop2: false
  },

  baz() {
    // code
  }
};

// bad
const foo = { foo: 1,
  bar: 2, baz: 3 };

const bar = {
  foo: 1, bar: 2,
  baz: 3
};

const baz = { foo: 1,
              bar: 2,
              baz: 3 };

// scope becomes confusing
const qux = { foo: 1, bar: 2, baz() {
  //code
}};
```

## Strings

+ Prefer single quotes, and use double quotes to avoid escaping.

```javascript
// good:
const foo = 'bar';
const baz = "What's this?";

// bad
const foo = "bar";
```

+ When constructing strings with dynamic values, prefer template strings.

```javascript
const prefix = 'Hello';
const suffix = 'and have a good day.';

// good
return `${prefix} world, ${suffix}`;

// bad
return prefix + ' world, ' + suffix;
```

## Arrays

+ Use literal form for array creation (unless you know the exact length).

```javascript
// good
const foo = [1, 2, 3];
const bar = new Array(3);

// bad
const foo = new Array();
const bar = new Array(1, 2, 3);
```

+ Use `new Array` if you know the exact length of the array and know that its
length will not change.

```javascript
const foo = new Array(16);
```

+ For multiline array declarations, brackets should be on their own line unless the
lines end/begin with a bracket. Values may either be on a single line, or each on
their own line.

```javascript
// good
const foo = [
  1, 2, 3
];

const bar = [
  1,
  2,
  3
];

const baz = [1, 2, {
  prop: 3
}];

const qux = [{
  prop: 1
}, 2, 3];

const quux = [{
  prop: 1
}, [
  1, 2, 3
]];

cost quuz = [
  {
    prop: 1
  },
  [
    1, 2, 3
  ],
  3
];

// bad
const foo = [1
  2, 3];

const bar = [
  1, 2,
  3
];

const baz = [1,
             2,
             3];

const qux = [{
  prop: 1
}, 2, 3, {
  prop: 4
}];

```

+ Use `push`/`unshift` to add an item to an array.

```javascript
const foo = [];
const { length } = foo;

// good
foo.push('bar');

// bad
foo[length] = 'bar';
```

+ Use spread.

```javascript
// join 2 arrays
const foo = [0, 1, 2];
const bar = [3, 4, 5];

foo.push(...bar);

// avoid using `Function.prototype.apply`
const values = [25, 50, 75, 100];

// good
const max = Math.max.apply(Math, values);

// better
const max = Math.max(...values);
```

+ Join single line array items with a space.

```javascript
// good
const foo = ['a', 'b', 'c'];

// bad
const foo = ['a','b','c'];
```

+ Do not use spaces inside array brackets

```javascript
// good
const foo = ['a', 'b', 'c'];

// bad
const foo = [ 'a', 'b', 'c' ];
```

+ Use array destructuring.

```javascript
const arr = [1, 2, 3, 4];

// good
const [head, ...tail] = arr;

// bad
const head = arr.shift();
const tail = arr;
```

## Properties

+ Use property value shorthand.

```javascript
const name = 'Derek Zoolander';
const age = 25;

// good
const foo = {
  name,
  age
};

// bad
const foo = {
  name: name,
  age: age
};
```

+ Group shorthand properties at the beginning.

```javascript
const name = 'Derek Zoolander';
const age = 25;

// good
const foo = {
  name,
  age,
  currentShow: 'Derelicte',
  enemy: 'Hansel'
};

// bad
const foo = {
  currentShow: 'Derelicte',
  name,
  enemy: 'Hansel',
  age
};
```

+ Use dot-notation when accessing properties by name if the name is a valid
identifier

```javascript
const foo = {
  bar: 'bar'
};

// good
foo.bar;

foo['baz-qux']; // ok because `foo.baz-qux` is not valid

// bad
foo['bar'];
```

+ Use object destructuring when accessing multiple properties on an object.

```javascript
// good
function foo(person) {
  const { name, age, height } = person;

  return `${name} is ${age} years old and ${height} tall.`
}

// bad
function foo(person) {
  const name = person.name;
  const age = person.age;
  const height = person.height;

  return `${name} is ${age} years old and ${height} tall.`
}
```

## Functions

+ Use object method shorthand.

```javascript
// good
const foo = {
  value: 0,

  bar(value) {
    return foo.value + value;
  }
};

// bad
const foo = {
  value: 0,

  bar: function bar(value) {
    return foo.value + value;
  }
};
```

+ Use scope to lookup functions (not variables).

```javascript
// good
function foo() {
  function bar() {
    // code
  }

  bar();
}

// bad
function foo() {
  const bar = function bar() {
    // code
  }

  bar();
}
```

+ Use arrow functions to preserve `this` when using function expressions or
anonymous functions.

```javascript
const foo = {
  base: 0,

  // good
  bar(items) {
    return items.map((item) => {
      return this.base + item.value;
    });
  },

  // good
  bar(items) {
    return items.map((item) => this.base + item.value);
  },

  // bad
  bar(items) {
    const _this = this;
    return items.map(function(item) {
      return _this.base + item.value;
    });
  }
};
```

+ Only use arrow function implicit returns when the statement is a single line,
or when it is:
  + An object declaration
  + An array declaration
  + A `new` instance of a class (`create` is allowed as well)
  + A boolean statement (`===`, `>=`, `&&`, etc)
  + A template

  These statements would not make sense without the implicit return, so we know
  that their values must be used somewhere. Single line statements are still allowed
  for brevity.

```javascript
// good
let foo = [1, 2, 3];

foo.forEach((number) => console.log(number));

const tripleArrays = foo.map((number) => [
  number, number, number
]);

const isTwoOrThree = foo.map((number) =>
  number === 2 || number === 3
);

const bars = foo.map((number) =>
  new Bar({ number })
);

const bazs = foo.map((number) =>
  Baz.create({ number })
);

// bad

foo.forEach(() =>
  console.log(number)
);

const bars = foo.map((number) =>
  makeBar({ number }) // Could be returning a Bar, could be side-effecting - we'll never know!
);
```

+ Always use parentheses around arguments.

```javascript
// good
[1, 2, 3].map((x) => x * x);

// bad
[1, 2, 3].map(x => x * x);
```

+ For multiline function definitions, the parentheses and each parameter should be
on its own line. The closing paren should not be indented, and parameters should be
indented once.

```javascript
// good
function foo(
  bar,
  baz,
  qux
) {
  // code
}

// bad

function foo(bar,
             baz,
             qux) {

}

function foo(bar, baz, qux,
  quux, quuz) {

}
```

+ For multiline function calls, parentheses should be on their own line unless the
lines end/begin with a bracket. Arguments may either be on a single line, or each on
their own line. The closing paren should not be indented, and the arguments should
be indented once.

```javascript
// good

foo(bar, baz, qux);

foo(
  bar, baz, qux
);

foo(bar, baz, () => {
  // code
});

setTimeout(() => {
  // code
}, 1000);

foo(bar, baz, () => {

}, {
  qux: 1
}, quux, quuz);

foo({
  bar: 1
}, [
  baz
]);

foo(
  bar,
  baz,
  {
    qux: 1
  },
  [
    quux
  ],
  function() {
    // code
  }
);

// bad

foo(bar, baz
    qux);

foo(bar, {
  baz: 1
},
qux);

foo(
  bar, function() {
    //code
  }
);

foo(bar, baz, function() {

}, qux, {
  quux: 1
}, quuz, [
  2, 3, 4
]);
```

## Function Arguments

+ Never use `arguments` – use rest instead.

```javascript
// good
function foo(...args) {
  return args.join('');
}

// bad
function foo() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
```

+ `arguments` object must not be passed or leaked anywhere. See the [reference](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments).

+ Don't re-assign the arguments.

```javascript
// good
// Use a new variable if you need to assign the value of an argument
function fooBar(opt) {
  let _opt = opt;

  _opt = 3;
}

// bad
function fooBar() {
  arguments = 3;
}

// bad
function fooBar(opt) {
  opt = 3;
}
```

+ Use default params instead of mutating them.

```javascript
// good
function fooBar(obj = {}, key = 'id', value = 0) {
  if (key) {
    return obj[key];
  } else {
    obj[key] = value;
    return obj[key];
  }
}

// bad
function fooBar(obj, key, value) {
  obj = obj || {};
  key = key || 'id';
  // ...
}
```

## General Performance

+ Use maps instead of arrays for enums. Maps have an `O(1)` lookup time,
whereas arrays have `O(n)` which builds up even for small enums:

```javascript
// good

const AVAILABLE_TYPES = {
  default: true,
  success: true,
  failure: true,
  warning: true
};

function typeIsAvailable(typeName) {
  return AVAILABLE_TYPES[typeName] || false;
}

// bad
const AVAILABLE_TYPES = [
  'default', 'success', 'failure', 'warning'
];

function typeIsAvailable(typeName) {
  return AVAILABLE_TYPES.includes(typeName);
}
```

+ When defining classes, add all properties that can exist on the class to the
class definition, or in the `constructor`/`init` hook. The default values
should be of the type that the property will be, unless it is an object/array/function
(requires an instantiation) in which case it should be `null`.

  This has to do with [hidden classes](https://gist.github.com/twokul/9501770)
  and inline caching, a technique which VMs use to optimize code as it is
  running. Adding new properties to an object changes the hidden class, which
  will cause the VM to deoptimize functions.

```javascript
// good

const Foo = Ember.Component.extend({
  _isOpen: false,

  _hoverHandler: null,

  didInsertElement() {
    this._hoverHandler = () => this.set('_isOpen', false);

    this.element.addEventListener('hover', this._hoverHandler);
  },

  actions: {
    open() {
      this.set('_isOpen', true);
    }
  }
});

// bad

const Foo = Ember.Component.extend({
  didInsertElement() {
    this._hoverHandler = () => this.set('_isOpen', false);

    this.element.addEventListener('hover', this._hoverHandler);
  },

  actions: {
    open() {
      this.set('_isOpen', true);
    }
  }
});

const Foo = Ember.Component.extend({
  _isOpen: null,

  _hoverHandler: () => null,

  didInsertElement() {
    this._hoverHandler = () => this.set('_isOpen', false);

    this.element.addEventListener('hover', this._hoverHandler);
  },

  actions: {
    open() {
      this.set('_isOpen', true);
    }
  }
});
```

