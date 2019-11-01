import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonForm = ({ newInfo, setNewInfo, setPersons, persons }) => {
  const Submit = event => {
    event.preventDefault();

    const addperson = {
      name: newInfo.name,
      number: newInfo.number
    };
    setPersons(persons.concat(addperson));
    setNewInfo({ name: "", number: "" });
  };

  const NameChange = event => {
    setNewInfo({ ...newInfo, name: event.target.value });
  };
  const NumberChange = event => {
    setNewInfo({ ...newInfo, number: event.target.value });
  };

  return (
    <form onSubmit={Submit}>
      <div>
        name: <input value={newInfo.name} onChange={NameChange} />
        number: <input value={newInfo.number} onChange={NumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonInfo = ({ persons }) => {
  return persons.map(persona => (
    <p key={persona.name}>
      {persona.name}
      {persona.number}
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newInfo, setNewInfo] = useState({ name: "", number: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(respone => {
      setPersons(respone.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Add a new</h3>
      <PersonForm
        newInfo={newInfo}
        setNewInfo={setNewInfo}
        persons={persons}
        setPersons={setPersons}
      />

      <h2> Numbers</h2>
      <PersonInfo persons={persons} />
    </div>
  );
};

export default App;
