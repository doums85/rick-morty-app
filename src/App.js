import './App.css';
import { useEffect, useState } from 'react';

// https://rickandmortyapi.com/api/character
function App() {
  const [data, setData] = useState([]);
  const [textEntered, setTextEntered] = useState('');
  const [error, setError] = useState(false);


  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${textEntered}`)
      .then((response) => {
        if (!response.ok) {
          //  throw new Error(`🚨 : ${response.status}`);
          if (response.status.toString().startsWith(4)) {
            console.log('ERROR : Document no found');
            setError(4);
          } else {
            console.log('Server Down try later');
            setError(5);
          }

          return;
        }

        setError(false);
        console.log(response);
        return response.json();
      })
      .then((responseData) => setData(responseData.results));
  }, [textEntered]);

  const textEnteredHandler = (e) => setTextEntered(e.target.value);

  return (
    <div>
      {/* Form */}
      <form className="search">
        <input
          type="text"
          onChange={textEnteredHandler}
          value={textEntered}
          className="search__input"
          placeholder="Search a character ..."
        />
      </form>
      {/* Cards */}
      <div className="App">
        {error === 4 ? (
          <h1>Character not Found 🫠</h1>
        ) : error === 5 ? (
          <h1>Server error</h1>
        ) : (
          data.map((character, index) => (
            <div key={index} className="card">
              <img
                src={character.image}
                alt={`character Rick and Morty called ${character.name}`}
                className="card__image"
              />
              <h3 className="card__name">
                {character.name}
              </h3>
              <p>{character.gender}</p>
              <small>{character.status}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
