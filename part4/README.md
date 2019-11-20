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

---

## Test environment

The convention in Node is to define the execution mode of the application with the `NODE_ENV` environment variable.

```javascript
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "watch": "NODE_ENV=development nodemon index.js",
    "test": "NODE_ENV=test jest --verbose --runInBand"
  }
```

We can change the `NODE_ENV` value by set it in the `package.json` script.

The `runInBand` option will prevent Jest from running tests in parallel.

To test using a database, the optimal solution is to have every test execution use its own separate database.

```javascript
// in utils/config.js

require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}
module.exports = {
  MONGODB_URI,
  PORT
};
```

## supertest

`supertest` - testing the API.
`npm i --save-dev supertest` - install supertest package.

In `tests/node_api.test.js`, this test will verifies the request is responded with status 200 and its header is set to application/json, indicating the data is in the desired format.

```javascript
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
```

The test import from the `app.js` module and wrap with the supertest function into a **superagent** object.

The supertest takes care the application being tested is started at the port that it use internally - so there is no need to test the `index.js` where its purpose is to launch the application at specificed port with `http` object.

```javascript
test("there are four notes", async () => {
  const response = await api.get("/api/notes");

  expect(response.body.length).toBe(4);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  expect(response.body[0].content).toBe("HTML is easy");
});
```

These two tests verifyy the format and content of the respone data with the `expect` method.

`async/await` syntax - better than use callback functions to access the data returned by promises.

## logger

`logger` middleware output the infomation about the http requests is **obstructing** the test execution output.

To prevent the logging when app is in the test mode, extract console log into its own `utils/logger.js` module.

By separate into two functions.

- `info` function not print anything if it is in the test mode.
- `error` function intented for error logging will still print to console in test mode.

```javascript
const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error
};
```

For example, in the `app.js` module

```javascript
const logger = require("./utils/logger");
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch(error => {
    logger.error("error connection to MongoDB:", error.message);
  });
```

## Initializing the database before tests

Test should not depend on the state of the database.

We need to reset the database and generate the needed test data in a controlled manner before we run the tests.

To initialise the database **before every test** - use `beforeEach` function:

```javascript
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");

const initialNotes = [{}];

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();

  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});
```

The database is cleared out at the beginning `.deleteMany({})` method, and saved two notes in the initialNotes to the database.
This will ensure the same state before every test is run.

Then in our test,

```javascript
test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  expect(response.body.length).toBe(initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map(r => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});
```

The `toContain` method is used to checking the note given to it as a parameter is in the list of notes returned by the API.

## Running tests one by one

To run tests with a specific name:

```javascript
jest -t "notes"
```

## async/await

`async/await` was introduced in ES7 for **asynchronous functions that return a promise**.

In previous version, the `find` method returns a promise and we can access the result of the operation by registering a callback function with the `then` method.

```javascript
Note.find({})
  .then(notes => {
    return notes[0].remove();
  })
  .then(response => {
    console.log("the first note is removed");
    // more code here
  });
```

The `async` and `await` keywords make the code more synctactically cleaner.

```javascript
const main = async () => {
  const notes = await Note.find({});
  console.log("operation returned the following notes", notes);

  const response = await notes[0].remove();
  console.log("the first note is removed");
};

main();
```

In order to use the `await` operator with async operations, they have to return a promsie. Using await is possible only inside of an async function.

## async/await in the backend

```javascript
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes.map(note => note.toJSON()));
});
```

## More tests and refactoring the backend

When code get refactored, will be the risk of regression - existing functionality may break.

For HTTP POST request - verify amount of notes returned by the API increases and new added object is in the list. - Also verify object without content did not added to the database.

```javascript
test("note without content is not added", async () => {
  const newNote = {
    important: true
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(400);

  const response = await api.get("/api/notes");

  expect(response.body.length).toBe(initialNotes.length);
});
```

We can extract these steps into helpfer function - `/tests/test_helper.js`

```javascript
const Note = require("../models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false
  },
  {
    content: "Browser can execute only Javascript",
    important: true
  }
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb
};
```

The module defines the `notesInDb` function use for checking the notes stored in the database.

The `initialNotes` array contains the initial database state.

Moreover, we can also use the `async/await` for our route handler such as

```javascript
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date()
  });

  const savedNote = await note.save();
  response.json(savedNote.toJSON());
});
```

## Error handling and async/await

To deal with exception with async/await is to use `try/catch` mechanism

```javascript
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date()
  });
  try {
    const savedNote = await note.save();
    response.json(savedNote.toJSON());
  } catch (exception) {
    next(exception);
  }
});
```

## Refactoring tests

Test coverage.

Problem: some requests like GET and DELETE /api/notes/:id aren't tested when the requrest is sent with an invalid id.
