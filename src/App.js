import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// https://rickandmortyapi.com/api/character
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/?name=')
      .then((response) => {
        if (!response.ok) {
          //  throw new Error(`🚨 : ${response.status}`);
          if (response.status.toString().startsWith(4)) {
            console.log('ERROR : Document no found');
          } else {
            console.log('Server Down try later');
          }

          return;
        }
        console.log(response);
        return response.json();
      })
      .then((responseData) => setData(responseData.results));
  }, []);

  console.log(data[0]);
  // BEM
  return (
    <div className="App">
      {data.map(({ name, image, status, gender }) => (
        <div className="card">
          <img
            src={image}
            alt={`character Rick and Morty called ${name}`}
            className="card__image"
          />

          <h3 className="card__name">{name}</h3>
          <p>{gender}</p>
          <small>{status}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
