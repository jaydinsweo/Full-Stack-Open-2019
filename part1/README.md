# NOTE:

---

## a.

**props: passing data to components**

The Hello function has a **parameter** _props_. As an argument, the parameter
receives an object, which has fields corresponding to all the "props" the user
of the component defines.

```javascript
const Hello = props => <p> Hello {props.name}</p>;

const App = () => <Hello name="World" age="4.54 billion years old" />;
```

props is an object - `{name: 'world, age: '4.54 billion years old}`.

> props, components, state

---

## b.

### **JavaScript**

#### Variables:

- const - constant variable does not change
- let - block scope variable

#### Arrays:

Content of the array can be modified.

- Array is an object, the variable always points to the same object. The content
  of the array changes as new items are added to it.

```javascript
const t = [1, 2, 3];
t.push(4);
t; // [1,2,3,4]
```

- `forEach` method - call a provided `callback` function to each element in the
  array.

- `concat` method over `push` method when add new elements into the array.
  - Difference: `push` modified the array while `concat` return a new array
    contains the items of the old array and the new items.

```javascript
const t = [1, 2, 3];
h = t.concat(5);

t; // [1,2,3]
h; // [1,2,3,5]
```

- `map` method - similar to `forEach` however `map` returns a new array, while
  the `forEach` method mutate the original array.

* `destructuring assignment` upack values from arrays, properties from objects,
  into distinct variables.

```javascript
const t = [1, 2, 3, 4, 5, 6];

const [a, b, ...rest] = t;

a; // 1
b; // 2
rest; // [3,4,5,6]
```

> rest and spread operators

#### Objects

One common way to define objects in JS is to use `object literals`, which
listing its properties within braces.

What is object literals? - is a way to define an object How does object literals
define an object? - by using curly bracket, `{}`.

```javascript
const user = {
	name: 'Tom',
	age: '20',
	education: 'MA',
};
```

The values of the properties of an object can be any type. The properties
referenced by using the `dot` notation or `bracket` notation.

```javascript
user.name; // "Tom"
user[age]; // 20
```

#### Functions

How a function can be referenced to?

By giving a name in `function declaration` or define the function using a
`function expression`.

```javascript
// function declaration
function product(a, b) {
	return a * b;
}

//function expression
const product = function(a, b) {
	return a * b;
};
```
