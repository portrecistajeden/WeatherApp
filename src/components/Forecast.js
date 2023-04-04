import './Forecast.css';

const Forecast = ({forecastData}) => {


    const arrayData = forecastData.list;
    let forecast = null;
    if(arrayData){
         forecast = arrayData.map((element) => {
            <div>
                {/(12:00:00)$/.test(element.dt_txt) ?
                    <div>
                        <p>Date: {element.dt_txt.slice(0,10)}</p>
                    </div>
                    :
                    <></>
         }
                
            </div>
            
        })
    }

    return (
        <div id='forecastWrapper'>
            {forecast}
        </div>
    )
}

export default Forecast;