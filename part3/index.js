const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// use middleware
//
app.use(bodyParser.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "asdq",
    number: "-2323-232-3",
    id: 4
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
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
  const filter = persons.filter(person => person != req.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing"
    });
  }
  if (filter) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: noteID(5000)
  };
  console.log(person);

  persons = persons.concat(person);
  res.json(persons);
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
