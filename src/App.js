import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/search';
import WeatherData from './components/WeatherData';
import Forecast from './components/Forecast';

const App = () => {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setforecastData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('./backgrounds/clear.jpg');
  const [code, setCode] = useState('01d');

  const codesMapping = {
    '11d': './backgrounds/thunderstorm.jpg',
    '09d': './backgrounds/drizzle.jpg',
    '10d': './backgrounds/rain.jpg',
    '13d': './backgrounds/snow.jpg',
    '50d': './backgrounds/fog.jpg',
    '01d': './backgrounds/clear.jpg',
    '02d': './backgrounds/few-clouds.jpg',
    '03d': './backgrounds/clouds.jpg',
    '04d': './backgrounds/clouds.jpg'
  }

  const defaultBackgroundImage = './backgrounds/clear.jpg';


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
        setCode(result.weather[0].icon);
      });
  }

  const fetchForecastData = (lat, long) => {
    fetch(`${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setforecastData(result)
      });
  }

  useEffect(() => {
    setBackgroundImage(codesMapping[code]);
    console.log(backgroundImage);
  },[code])

  console.log(weatherData);

  return (
    <div id='appWrapper' style={{
                backgroundImage: 'url(' + require(`${backgroundImage || defaultBackgroundImage}`) + ')'
                }}>
      <div id='searchBarContainer'>
        <Search onSearchChange={handleOnSearchChange} setWeatherData={setWeatherData} lat={lat} long={long}/>        
      </div>
      <div className={`contentWrapper weather ${weatherData.length===0 ? 'hidden' : 'visible'}`}> 
        <WeatherData weatherData={weatherData}/>
      </div>
      <div className={`contentWrapper forecast ${weatherData.length===0 ? 'hidden' : 'visible'}`}>
        <Forecast forecastData={forecastData}/>
      </div>
      <div>

      </div>
    </div>
  );
};

export default App;
