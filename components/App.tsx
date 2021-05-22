import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Weather } from '../model/types'
import { LocalWeather } from './LocalWeather';
import { WeatherCard } from './WeatherCard'
import styles from '../styles/Home.module.css';

export function App () {
    let localWeather: Weather[] = []
    let weatherNow: Weather = {
        weather_state_name:'',
        weather_state_abbr:'',
        applicable_date:'',
        min_temp: 0,
        max_temp: 0,
        the_temp: 0,
        wind_speed: 0,
        wind_direction: 0,
        air_pressure: 0,
        humidity: 0
    }
    let localIcons: string[] = [];
    const [weather, setWeather] = useState(localWeather);
    const [weatherPresent, setWeatherPresent] = useState(weatherNow);
    const [weatherIcons, setWeatherIcons] = useState(localIcons);
    const [city, setCity] = useState('');

    useEffect( () => {
         axios.get(`${api_url}/location/44418`)
              .then(res => {
                  setCity(res.data.title);
                  return res.data
                })
              .then( (data) : Weather[] => data.consolidated_weather)
              .then(w => {
                  w.forEach( m => {
                      let modifyWeather:Weather = {
                          weather_state_name: m.weather_state_name,
                          weather_state_abbr: m.weather_state_abbr,
                          applicable_date: m.applicable_date,
                          min_temp: m.min_temp,
                          max_temp: m.max_temp,
                          the_temp: m.the_temp,
                          wind_speed: m.wind_speed,
                          wind_direction: m.wind_direction,
                          air_pressure: m.air_pressure,
                          humidity: m.humidity
                       }

                       localWeather.push(modifyWeather);
                       localIcons.push(`${api_icon}${m.weather_state_abbr}.svg`);
                    }          
                  );
                  setWeather(localWeather);
                  setWeatherPresent(localWeather[0]);
                  setWeatherIcons(localIcons);
              });
        
    },[])

    const api_url:string = 'https://www.metaweather.com/api/'
    const api_icon:string = 'https://www.metaweather.com/static/img/weather/'


    return (
        <>

            <LocalWeather weatherPresent = {weatherPresent} weatherIcons = {weatherIcons} city = {city} />
            <div className={styles.globalWeather}>
                <div className={styles.weatherWeeks}>
                    {weather.map((w,index) => {
                    return <WeatherCard date = {w.applicable_date} image_url = {weatherIcons[index]} min_temp = {w.min_temp} max_temp = {w.max_temp}/>
                    })}
                </div>
                
            </div>
        </>
    )
}