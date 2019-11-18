# Structure of backend application, introduction to testing

## Project structure

The structure of project following Node.js best practices.

```
 |-index.js
 |-app.js
 |-build
 | |-
 |-controllers
 | |-
 |-models
 | |-
 |-package.json
 |-utils
 | |- config.js
 | |- middleware.js
```

### Questions

- what is the build folder?
  is the front end build folder that connected to the backend
- What should be in the `index.js` file?

  - The `index.js` file only imports the application from the `app.js` and starts the application.

  ```javascript
  const app = require("./app");
  const http = require("http");
  const config = require("./utils/config");

  const server = http.createServer(app);

  server.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
  ```

- Where should the handling of enviroment variables store at?

  - Such as PORT or MONGODB_URI should be stored at `.env` file and access and config in `./utils/config.js` file.

  ```javascript
  require("dotenv").config();

  const PORT = process.env.PORT;
  let MONGODB_URI = process.env.MONGODB_URI;

  module.exports = {
    PORT,
    MONGODB_URI
  };
  ```

- what is the controllers folder?
  The controllers folder handling events handlers of routes.
  For the route handlers, use `express.Router` instead of `app.use`.

      - What is the difference between `express.Router` and `app.use`?
          - `express.router` creates an modular and mountable route handlers. Reduce the code in the `app.js` file, make it easier to testing and maintaining the code.

  ```javascript
  const Router = require('express').Router()
  const ObjectSchema = require('../models/schema')

  Router.get('/:id', (req, res, next) => {
   ....
  })
  // similar for post, delete, and put.

  module.exports = Router
  ```

  The paths in the route handlers is shortended, instead of `/api/notes/:id` we use `/:id`. Router is a router object isolated instance of middleware and routes.

  Later we can call the route in the `app.js`

  ```javascript
  const notesRouter = require("./controllers/notes");
  app.use("/api/notes", notesRouter);
  ```

- How should the `app.js` look like?

  It should requires these libraries and objects - utils - controllers - express, body-parsers, cors, mongoose

  The purpose of `app.js` is to connect the backend to the database.

  ```javascript
  console.log("connecting to", config.MONGODB_URI);

  mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch(error => {
      console.log("error connection to MongoDB:", error.message);
    });

  app.use(cors());
  app.use(express.static("build"));
  app.use(bodyParser.json());
  app.use(middleware.requestLogger);

  app.use("/api/notes", notesRouter);

  app.use(middleware.unknownEndpoint);
  app.use(middleware.errorHandler);

  module.exports = app;
  ```

- Where should the Mongoose schema stored at?

  It should be store under the `./models` directory.

  ```javascript
  const mongoose = require("mongoose");
  const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      minlength: 5
    },
    date: Date,
    important: Boolean
  });

  noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

  module.exports = mongoose.model("Note", noteSchema);
  ```

---

## Testing Node applications

First, unit tests - write a couple of simple functions.

```javascript
const palindrome = string => {
  return string
    .split("")
    .reverse()
    .join("");
};

const average = array => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0) / array.length;
};

module.exports = {
  palindrome,
  average
};
```

Install Jest, a testing library for React `npm i --save-dev jest`.
We also need to specify the execution environment in the `package.json`

```javascript
{ //...
	"jest": {
   	"testEnvironment": "node"
 	}
}
```

To test our code, need to create a new file `xxx.test.js`.

For the palindrome function aboves

```javascript
const palindrome = require("../utils/for_testing").palindrome;

test("palindrome of a", () => {
  const result = palindrome("a");

  expect(result).toBe("a");
});

test("palindrome of react", () => {
  const result = palindrome("react");

  expect(result).toBe("tcaer");
});

test("palindrome of releveler", () => {
  const result = palindrome("releveler");

  expect(result).toBe("releveler");
});
```

The test file imports the function to be tested and assigns it to the variable. Each individual test cases are defined with the `test` or `it` function.

The first parameter of the function is the test description as a string.

The second parameter is the function that defines the functionality for the test case.

- First we execute the code to be tested
- Second we verify the results with the expect function. By expect wraps the resulting value into an object that offers a collection of _matcher_ function.
