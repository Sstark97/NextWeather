import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Weather } from '../model/types'
import { LocalWeather } from './LocalWeather';
import { WeatherCard } from './WeatherCard'
import styles from '../styles/Home.module.css';
import global_styles from '../styles/General.module.css'
import features_styles from '../styles/WeatherFeaturesCard.module.css'
import { v4 as uuidv4 } from 'uuid';
import { WeatherFeaturesCard } from './WeatherFeaturesCard'

export function App () {
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
        humidity: 0,
        visibility: 0
    }

    const [weather, setWeather] = useState<Weather[]>([]);
    const [weatherPresent, setWeatherPresent] = useState<Weather>(weatherNow);
    const [weatherIcons, setWeatherIcons] = useState<string[]>([]);
    const [city, setCity] = useState('');
    const [error, setError] = useState(false);
    const [citySearch, setCitySearch] = useState('/location/44418');

    useEffect( () => {
        init();   
    },[]);

    const api_url:string = 'https://www.metaweather.com/api/'
    const api_icon:string = 'https://www.metaweather.com/static/img/weather/'
    const api_search:string = `${api_url}location/search/?query=`

    const handleManageError = () => {
        setTimeout(() => {
            setError(false);
        },2000)
    }

    const handleSearch = async (city:string) => {
       try{
        let toSearch = await axios.get(`${api_search}${city}`);
        let updatedWeather = await axios.get(`${api_url}/location/${toSearch.data[0].woeid}`)
        let newWeather:Weather[] = updatedWeather.data.consolidated_weather;
        setCity(toSearch.data[0].title);
        setCitySearch(`/location/${toSearch.data[0].woeid}`);
        setWeather(newWeather);
        let newIcons: string[] = [];
        newWeather.forEach(w => {
            newIcons.push(`${api_icon}${w.weather_state_abbr}.svg`);
        })
        setWeatherIcons(newIcons);
        setWeatherPresent(newWeather[0]);
       } catch(err) {
           setError(true);
           handleManageError();
       }
    }

    async function init(){
        let res = await axios.get(`${api_url}${citySearch}`);
        setCity(res.data.title);
        let data:Weather[] = res.data.consolidated_weather;
        let newLocation:Weather[] = [];
        let newIcons: string[] = [];
        data.forEach(m => {
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
                    humidity: m.humidity,
                    visibility: m.visibility
                }

                newLocation.push(modifyWeather);
                newIcons.push(`${api_icon}${m.weather_state_abbr}.svg`);
            }          
        );
        let newWeather:Weather = newLocation[0];

        setWeather(newLocation);
        setWeatherPresent(newLocation[0]);
        setWeatherIcons(newIcons);
    }


    return (
        <>
            <LocalWeather 
                    weatherPresent = {weatherPresent} 
                    weatherIcons = {weatherIcons} 
                    city = {city} handleSearch = {handleSearch} 
                    error = {error}
            />

            <div className={global_styles.globalWeather}>
                <div className={global_styles.weatherWeeks}>
                    {weather.map((w,index) => {
                        return <WeatherCard 
                                    key={uuidv4()} 
                                    date = {w.applicable_date} 
                                    image_url = {weatherIcons[index]} 
                                    min_temp = {w.min_temp} 
                                    max_temp = {w.max_temp}
                                />
                    })}
                </div>

                    <h2 className={global_styles.hightligths}>Today's Highlights</h2>
                    <div className = {global_styles.featuresContainer}>
                        <div className={features_styles.features}>
                            <div className="d-flex w-100 text-center">
                                <WeatherFeaturesCard wind_speed = {weatherPresent.wind_speed}/>
                                <WeatherFeaturesCard humidity = {weatherPresent.humidity}/>
                            </div>

                            <div className="d-flex w-100 text-center">
                                <WeatherFeaturesCard visibility = {weatherPresent.visibility}/>
                                <WeatherFeaturesCard air_pressure = {weatherPresent.air_pressure}/>
                            </div>
                        </div>

                    </div>

            </div>
        </>
    )
}