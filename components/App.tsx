import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Weather from '../model/types'

export function App () {
    let localWeather: Weather[] = []
    let localIcons: string[] = [];
    const [weather, setWeather] = useState(localWeather);
    const [weatherPresent, setWeatherPresent] = useState({});
    const [weatherIcons, setWeatherIcons] = useState(localIcons);

    useEffect( () => {
         axios.get(`${api_url}/location/44418`)
              .then(res => res.data)
              .then( (data) : Weather[] => data.consolidated_weather)
              .then(w => {
                  w.forEach( m => {
                      let modifyWeather:Weather = {
                          weather_state_name: m.weather_state_name,
                          weather_state_abbr: m.weather_state_abbr,
                          applicable_date: m.applicable_date,
                          min_temp: m.min_temp,
                          max_temp: m.max_temp,
                          wind_speed: m.wind_speed,
                          wind_direction: m.wind_direction,
                          air_pressure: m.air_pressure,
                          humidity: m.humidity
                       }

                       localWeather.push(modifyWeather);
                       localIcons.push(`${api_icon}${m.weather_state_abbr}.svg`)
                  });
                  setWeatherPresent(localWeather[0]);
              });
        
    })

    const api_url:string = 'https://www.metaweather.com/api/'
    const api_icon:string = 'https://www.metaweather.com/static/img/weather/'


    return <h1>Componente App</h1>
}