import React from "react";

export const PersonInfo = ({ persons, deletePerson }) => {
  console.log(persons);
  return persons.map(persona => (
    <div key={persona.name}>
      {persona.name}
      {persona.number}
      <button
        onClick={() => {
          deletePerson(persona.id);
        }}
      >
        delete
      </button>
    </div>
  ));
};
