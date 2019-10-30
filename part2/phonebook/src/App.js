import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  const Submit = event => {
    event.preventDefault();
    const addperson = {
      name: newName
    };
    setPersons(persons.concat(addperson));
    setNewName("");
  };

  const Change = event => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={Submit}>
        <div>
          name: <input value={newName} onChange={Change} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2> Numbers</h2>
      {persons.map(persona => (
        <p key={persona.name}>{persona.name}</p>
      ))}
    </div>
  );
};

export default App;
