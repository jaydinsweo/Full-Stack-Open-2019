require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./model/person");

// use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));

morgan.token(
  "body",
  (getID = req => {
    return JSON.stringify(req.body);
  })
);
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body ")
);

// Error handlers -------------

const errorHandler = (error, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).send({ err: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({
      err: err.message
    });
  }

  next(err);
};

app.use(errorHandler);

// Get all data ----------------------

app.get("/api/persons", (req, res) => {
  Person.find({}).then(person => {
    res.json(person.map(p => p.toJSON()));
  });
});

// update info ---- NEXT CHANGE ---------
app.get("/info", (req, res) => {
  const info = `Phonebook has info for ${Person.countDocuments()} people`;

  res.send(`<div> <p>${info} <p> <p>${Date()}<p></div>`);
});

// view each person info ---------------
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

// delete person ------------------
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(err => next(err));
});

// Add new person --------------
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(savedP => res.json(savedP.toJSON()))
    .catch(err => next(err));
});

// update each person info -------------------
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => res.json(updatePerson.toJSON()))
    .catch(err => next(err));
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
