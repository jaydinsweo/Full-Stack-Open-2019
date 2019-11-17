require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./model/person");

// use middleware
app.use(bodyParser.json());
app.use(cors());
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

app.get("/api/persons", (req, res) => {
  Person.find({}).then(person => {
    res.json(person.map(p => p.toJSON()));
  });
});

app.get("/info", (req, res) => {
  const numberOfPeople = persons.length;
  const info = `Phonebook has info for ${numberOfPeople} people`;

  res.send(`<div> <p>${info} <p> <p>${Date()}<p></div>`);
});

// view each person info
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

// delete person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  person = person.filter(person => person.id !== id);

  res.status(204).end();
});

// add person
const noteID = maxvalue => Math.floor(Math.random() * Math.floor(maxvalue));

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const filter = persons.filter(person => person.name === body.name);

  if (body.content === undefined) {
    return res.status(400).json({
      error: "content missing"
    });
  }
  if (filter.length != 0) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number
  };

  person.save().then(savedP => res.json(savedP.toJSON()));
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
