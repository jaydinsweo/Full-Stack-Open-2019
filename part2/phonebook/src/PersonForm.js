import React from "react";
import personServices from "./services";

export const PersonForm = ({ newInfo, setNewInfo, setPersons, persons }) => {
  const Submit = event => {
    event.preventDefault();
    if (persons.findIndex(person => person.name === newInfo.name) > -1) {
      alert(`${newInfo.name} is already in the phonebook`);
    } else {
      const addperson = {
        name: newInfo.name,
        number: newInfo.number,
        id: persons.length + 1
      };

      personServices.create(addperson).then(() => {
        setPersons(persons.concat(addperson));
        setNewInfo({ name: "", number: "" });
      });
    }
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
