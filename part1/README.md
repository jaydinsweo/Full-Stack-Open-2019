#### NOTE:

**props: passing data to components**

The Hello function has a **parameter** _props_. As an argument, the parameter
receives an object, which has fields corresponding to all the "props" the user
of the component defines.

```javascript
const Hello = props => <p> Hello {props.name}</p>;

const App = () => <Hello name="World" age="4.54 billion years old" />;
```

props is an object - `{name: 'world, age: '4.54 billion years old}`.
