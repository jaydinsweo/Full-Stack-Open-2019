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

#### Object methods and `this`

`object method` is the function that is the property of an object.

In this case, greet function is an object method that user can _act_.

```javascript
const Tom = {
	age: 23,
	country: 'US',
	greet: function() {
		console.log('Hello, my name is ', this.name);
	},
};
```

`this` keyword is defined based on **how the method is called**. When calling
the method through a reference the value of `this` becomes the `global object`.

`this` keyword should not be use with the arrow functions because the `this`
does not work well with it.

![this keyword](https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth)

#### Classes

---

## C.

### Component state, event handlers

#### Component helper functions

The helper function is defined inside of another function that defines the
behavior of our component.

#### Destructuring

Destructuring make the assignment of variable easier, since we can use it to
extract and gather the values of an object's properties into separate variables.

```javascript
const Hello = props => {
	const name = props.name;
	const age = props.age;
};

const Hello = props => {
	const { name, age } = props;
};

const Hello = ({ name, age }) => {};
```

#### Stateful component

The function call adds _state_ to the component and renders it initialized with
the initial value.

```javascript
const [counter, setCounter] = useState(0)
...
() => setCounter(counter + 1)
```

When the state modifying function `setCounter` is called, React re-renders the
component.

#### Event handlers are functions

```javascript
const App = props => {
	const [counter, setCounter] = useState(0);
	const setToValue = value => setCounter(value);
	return (
		<div>
			<button onClick={setToValue(counter + 1)}> {counter} </button>

			<button onClick={setToValue(0)}> zero </button>
		</div>
	);
};
```

This code will break the app, because the event handler is supposed to define a
_reference to a function_ not to be call directly. The `onClick={setToValue(0)}`
function make a call to the `setCounter` function, which causes the component to
be re-rendered.

A solution is to make an event handler a function that calls the `setToValue`
function with the appropriate parameter.

```javascript
onClick={()=> setToValue(counter + 1)}
onClick={()=> setToValue(0)}
```

#### Function that returns a function

Another solution is to define the `setToValue` a function that returns a
function

```javascript
const setToValue = value => {
	return () => {
		setCounter(value);
	};
};
// in 1 line

const setToValue = value => () => setCounter(value);
```

The double arrow functions can be thought of as functions that have to be called
twice in order to get the final result. The fist function call is used to
"configure" the second function, by defining some of its parameters.

> Currying function - http://www.datchley.name/currying-vs-partial-application/

#### Passing state to child components

Make a Button component for the buttons, we have to pass the event handler as
well as the title of the button through the component's props.

```javascript
const Button = ({ onClick, text }) => {
	<button onClick={onClick}>{text}</button>;
};

//in App component

<Button onClick={() => setToValue(counter + 1)} text="plus" />;
```

The event handler is passed to the Button component throught the `onClick` prop.

---

## d.

### Complex state, debugging React Apps

#### Complex state

For most case, the best way to satisfy requirement of more complex case will be
using the `useState` function multiple times to create separate "pieces" of
state.

```javascript
const [left, setLeft] = useState(0);
const [right, setRight] = useState(0);
```

The component'state can be of any type. To refactor multiple state into a single
object

```javascript
const [clicks, setClicks] = useState({
	left: 0,
	right: 0,
});

const handleLeftClick = () => {
	const newClicsk = {
		left: clicks.left + 1,
		right: clicks.right,
	};
	setClicks(newClicks);
};
// object spread

const handleRightClick = () =>
	setClicks({ ...clicks, right: clicks.right + 1 });
```

Now the component has one state and the event handlers have to take care of
changing the _entired application state_.

In practice `{...clicks}` creates a new object that has copies of all of the
propertises of the `clicks` object. **object spread**.

Another example is to mutate state directly such

```javascript
const handleLeftClick = () => {
	clicks.left++;
	setClicks(clicks);
};
```

This function is forbidden in React since it can result in unexpected side
effects. Changing state has to always be done by setting the state to a new
object. If properties from a previous state object want to simply be copied,
this has to be done by copying those properties into a new object.

Storing all of the state in a single state object is a bad choice for this
particular application; there's no apparent benefit and the resulting
application is a lot more complex. In this case storing the click counters into
separate pieces of state is a far more suitable choice.

#### Conditional rendering

```javascript
const History = props => {
	if (props.allClicks.length === 0) {
		return <div> length is 0 </div>;
	}
	return <div>button press history: </div>;
};
```

The History component renders completely differently React-elements depending on
the state of the application - _conditional rendering_.

#### Rules of Hooks

The `useState` function _must not be called_ from inside of a loop, a
conditional expression, or any place that is not a function defining a
component.

#### Event handling revisited

#### Passing event handlers to child components

#### Do not define components within components
