import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Weather, LocalWeatherProps } from '../model/types'

export function LocalWeather({weatherPresent, weatherIcons, city} : LocalWeatherProps) {
    const dateFormatter = (today:string) : string => {
        var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        var dt = new Date(today.replace(pattern,'$3-$2-$1')).toString().substring(0,11);
        return dt;
    }

    const today:string = dateFormatter(weatherPresent.applicable_date);

    return (
        <div className= "d-flex flex-column w-100">
            <img src={weatherIcons[weatherIcons.length-1]} alt="" width="250px" height= "125px" />
            <h2>{`${weatherPresent.the_temp}ºC`}</h2>
            <h2>Today  . {today} </h2>
            <h2>{city}</h2>
        </div>
    )

}