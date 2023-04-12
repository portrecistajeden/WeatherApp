import './Forecast.css';

const Forecast = ({forecastData}) => {

    const weekDays = {0:'Sunday', 1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday'};

    let forecast = [];

    if(forecastData.length !== 0){
        let forecastDataArray = forecastData.list.filter(element => /(12:00:00)$/.test(element.dt_txt));
        let forecastArray = forecastDataArray.map(element => (
            {
                day: weekDays[new Date(element.dt*1000).getDay()],
                tmperature: Math.floor(element.main.temp),
                feelsLike: Math.floor(element.main.feels_like),
                weatherIcon: element.weather[0].icon
            }
        ));
        forecast = forecastArray.map((element, index) => 
            <div key={index} className='forecastDay'>
                <span>{element.day}</span>
                <span className='middleColumn'><img className='weatherIcon' src={`https://openweathermap.org/img/wn/${element.weatherIcon}@2x.png`}/></span>
                <span className='rightColumn'>{element.tmperature}&deg;C / {element.feelsLike}&deg;C</span>
            </div>
        );
        
    }

    return (
        <div id='forecastSection'>
            <h2>Weather forecast</h2>
            <div id='forecastWrapper'>
                {forecast}
            </div>
        </div>
    )
}

export default Forecast;