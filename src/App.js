import React, { useState } from 'react';
import './App.css';
import Search from './components/search';
import WeatherData from './components/WeatherData';
import Forecast from './components/Forecast';

const App = () => {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setforecastData] = useState([]);


  const handleOnSearchChange = (searchData) => {
    setLat(searchData.latitude);
    setLong(searchData.longitude);
    fetchWeatherData(searchData.latitude, searchData.longitude);
    fetchForecastData(searchData.latitude, searchData.longitude);    
  }

  const fetchWeatherData = (lat, long) => {
    fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result);
      });
  }

  const fetchForecastData = (lat, long) => {
    fetch(`${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setforecastData(result)
        console.log(result)
      });
  }

  return (
    <div className='appWrapper'>
      <WeatherData weatherData={weatherData}/>
      <div className='searchBarContainer'>
        <Search onSearchChange={handleOnSearchChange} setWeatherData={setWeatherData} lat={lat} long={long}/>        
      </div>
      <Forecast forecastData={forecastData}/>
    </div>
  );
};

export default App;
