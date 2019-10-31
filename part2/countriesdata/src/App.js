import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <span>{country.name}</span>
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show === true ? (
        <div>
          <h3>{country.name}</h3>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <b>languages</b>
          <ul>
            {country.languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt="" style={{ width: 150, height: 75 }} />
        </div>
      ) : null}
    </div>
  );
};

const ListOfCountries = ({ countries }) => {
  if (countries.length <= 10) {
    console.log(countries);
    return countries.map(country => {
      return (
        <div key={country.name}>
          <CountryInfo country={country} />
        </div>
      );
    });
  } else {
    return <p>too many matches, specify another filter</p>;
  }
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${search}`)
      .then(respone => {
        setCountries(respone.data);
      });
  }, [search]);

  const onChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <span>find countries</span>
      <input value={search} onChange={onChange} />
      <ListOfCountries countries={countries} />
    </div>
  );
};

export default App;
