const express = require("express");
const app = express();

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

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
