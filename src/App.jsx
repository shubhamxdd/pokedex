import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [query, setquery] = useState("");
  const [pokemons, setPokemons] = useState({
    name: "",
    type: "",
    weight: "",
    img: "",
  });
  const URL = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
  const fetchPokemons = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    let name = data.name;
    let cName = name.charAt(0).toUpperCase() + name.slice(1);
    let type = data.types[0].type.name;
    let cType = type.charAt(0).toUpperCase() + type.slice(1);
    setPokemons({
      name: cName,
      type: cType,
      weight: data.weight,
      img: data.sprites.front_default,
    });
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };
  return (
    <>
      <div className="header">
        <h1 className="heading">Pokédex</h1>
        <button className="dm" onClick={toggleDarkMode}>DarkMode</button>
      </div>
      <div className="center">
        <div className="input">
          <input
            type="text"
            placeholder="Search a Pokémon"
            onChange={(e) => {
              setquery(e.target.value);
            }}
            value={query}
          />
          <button type="submit" onClick={fetchPokemons}>
            Search
          </button>
        </div>
        {pokemons.name &&
          <div className="result">
            <div className="img">
              <img src={pokemons.img} alt="" />
            </div>
            <div className="name">
              <h2>{pokemons.name}</h2>
            </div>
            <div className="type">
              <h3>Type: {pokemons.type}</h3>
            </div>
            {/* <div className="weight">
              <h3>Weight: {pokemons.weight}</h3>
            </div> */}
          </div>
        }
      </div>
    </>
  );
}

export default App;
