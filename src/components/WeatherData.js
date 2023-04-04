import './WeatherData.css';
import moment from 'moment';

const WeatherData = ({weatherData}) => {
    let dataLoaded = weatherData.main!=null;
    return (
        <div id='weatherWrapper'>
            <div id='cityWrapper'>
                <p id='cityName'>{dataLoaded ? weatherData.name : 'Choose your city'}</p>
                <p id='date'>{moment().format('dddd')}, {moment().format('LL')}</p>
            </div>
            <div id='weatherFlex'>
                <p id='currentWeather'>{dataLoaded ? weatherData.weather[0].main : ''}</p>
                <div id='weatherRight'>
                    <p>Temperature: {dataLoaded ? Math.floor(weatherData.main.temp) : '0'}&deg;C</p>
                    <p>Feels like: {dataLoaded ? Math.floor(weatherData.main.feels_like) : '0'}&deg;C</p>
                    <p>Humidity: {dataLoaded ? weatherData.main.humidity : '0'}%</p>
                </div>
            </div>
        </div>
    )    
}

export default WeatherData;