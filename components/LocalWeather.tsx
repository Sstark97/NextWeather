import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Weather, LocalWeatherProps } from '../model/types';
import styles from '../styles/LocalWeather.module.css';
import Image from 'next/image';

export function LocalWeather({weatherPresent, weatherIcons, city} : LocalWeatherProps) {
    const dateFormatter = (today:string) : string => {
        var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        var dt = new Date(today.replace(pattern,'$3-$2-$1')).toString().substring(0,11);
        return dt;
    }

    const today:string = dateFormatter(weatherPresent.applicable_date);

    return (
        <div className= {styles.weatherContainer} >
            <img className="mb-5"src={weatherIcons[weatherIcons.length-1]} alt="" width="250px" height= "125px" />
            <h1 className="mb-5">{`${weatherPresent.the_temp}ºC`}</h1>
            <h3 className="mb-5">{weatherPresent.weather_state_name}</h3>
            <p className="mb-3">Today  . {today} </p>
            <div className="d-flex me-1 align-items-center justify-content-center">
                <Image className="m-0" src="/location.svg" alt="Vercel Logo" width={19} height={16} />
                <p className="mt-3">{city}</p>
            </div>
        </div>
    )

}