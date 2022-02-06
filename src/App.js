import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Searchbar from './components/searchbar';
import Display from './components/display';

function App() {
  const [countries, setCountries] = useState([]);
  const [newInput, setNewInput] = useState('');
  const [currentDisplay, setDisplay] = useState('');
  const [weather, setWeather] = useState('');

	useEffect(() => {
    if (currentDisplay !== '' && currentDisplay !== undefined) {
      axios(`https://api.openweathermap.org/data/2.5/weather?q=${currentDisplay.capital}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
        .then(res => setWeather(res.data))
    } else {
      return
    }
	}, [currentDisplay]);

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => setCountries(res.data));
  }, [])

  return (
    <div className="App">
      <Searchbar countries={countries} newInput={newInput} setNewInput={setNewInput} setDisplay={setDisplay} />
      <Display country={currentDisplay} weather={weather} />
    </div>
  );
}

export default App;
