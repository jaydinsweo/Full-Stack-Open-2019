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

## Web and express

import express and use it as a function to create an express application and stored in the app variable.

```javascript
const express = require("express");
const app = express();

app.get("/", (request, respond) => {
  res.send("<h1>Hello World!</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

The app listen to the http requests made to the application's / root and the respone parameter. In this case, the respone is call the send method contain the string Hello World. Express auto sets the value of the Content-Type header to be text/html and the status code to 200.

```javascript
const notes = [...];
app.get('/notes', (request, response) => {
  response.json(notes)
})
```

In this case, the app listen to the http request made to the /notes page. Then responded with the json method of the respone object. It will sents the note array as a JSON formatted string.

## Nodemon

> nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

```javascript
    "watch": "nodemon index.js"
```

## REST

Notes, persons are called **resources** in RESTful thinking. Every resource has an associated URL which is the resource's unique address.

One convention is to create the unique address for resources by combining the name of the resource type with the resource's unique identifier.

Let's assume that the root URL of our service is www.example.com/api.

This way of interpreting REST falls under the second level of RESTful maturity in the Richardson Maturity Model

## Fetch a single resource

```javascript
app.get("/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === id);
  response.json(note);
});
```

Difference between find and filter

## Delete resources

```javascript
app.delete("/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});
```
