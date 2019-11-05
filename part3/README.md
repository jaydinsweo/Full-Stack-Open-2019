## Node.js and Express

Working toward implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library and application'data will be stored in a MongoDB database.

NodeJS - JavaScript runtime based on Google's Chrom V8 engine.

The newest features of JS often the browser don't support yet, that is why browser must be transpiled with `babel`.
However, JS in the backend doesn't need to transpile since the newest version of Node support a large majority of the latest features of JS.

---

`npm init` to create a new template for the application. It will auto generated a `package.json` at the root of the project that contains information about the project.

Make a run script: `"start" : "node index.js"`. It will tell node to run the `index.js` file.

### Simple web server

```javascript
const http = require("http");

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
```

`http` is Node's built-in web server module. Using the `createServer` method of the http module to create a new web server. An event handler is registered to the server, that is called every time an HTTP request is made to the server's address.
