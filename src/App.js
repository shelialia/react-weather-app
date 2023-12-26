import React from 'react';
import './App.css';
import NewTopButtons from './components/NewTopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import ForecastDaily from './components/ForecastDaily';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {

  // everytime we change location (ie. new query), we want to fetch new data
  const [query, setQuery] = useState({q: 'berlin'})
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async() => {
      await getFormattedWeatherData( {...query}).then(
        data => {
          setWeather(data)
        }
      );
    };
  
    fetchWeather();
  }, [query]);

  const formatBackground = () => {
    if (!weather) return 'from-green-700 to-blue-700'
    const threshold = 20;
    if (weather.formattedCurrentWeather.temp_c <= threshold) return ' from-green-700 to-blue-700'
    return 'from-yellow-700 to-red-700'
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700
      h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
        <NewTopButtons setQuery={setQuery}/>
        <Inputs setQuery={setQuery}/>

        {weather && (
          <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather}/>
          <Forecast title="hourly forecast" weather={weather} />
          <ForecastDaily title="daily forecast" weather={weather} />
          </div>
      )}
    </div>
  );
}

export default App;
