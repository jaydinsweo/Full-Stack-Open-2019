import React, { useState, useEffect } from "react";
import personServices from "./services";
import { PersonForm } from "./PersonForm";
import { PersonInfo } from "./PersonInfo";

const Filter = () => {
  return (
    <div>
      filter shown with <input />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newInfo, setNewInfo] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState({
    message: null
  });

  useEffect(() => {
    personServices.getAll().then(respone => {
      setPersons(respone.data);
    });
  }, []);

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    const ok = window.confirm(`delete ${person.name}`);
    if (ok) {
      personServices.deleteperson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h3>Add a new</h3>
      <PersonForm
        newInfo={newInfo}
        setNewInfo={setNewInfo}
        persons={persons}
        setPersons={setPersons}
      />

      <h2> Numbers</h2>
      <PersonInfo persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
