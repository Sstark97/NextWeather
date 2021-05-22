import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import { Weather, WeatherCardProps } from '../model/types';
import styles from '../styles/WeatherCard.module.css';
import Image from 'next/image';
import { dateFormatter } from '../model/support'

export function WeatherCard({ date, image_url, min_temp, max_temp } : WeatherCardProps){

    
    return (
        <div className={styles.weatherCard}>

            {date.substring(8,date.length) === String(new Date().getDate()) ? <h2>Today</h2> : <h2> {dateFormatter(date)}</h2>}
            <img className="mb-5"src={image_url} alt="" width="250px" height= "125px" />
            <div className="d-flex fs-4">
                <p className="me-2">{max_temp.toFixed(2)}ºC</p>
                <p id={styles.minTemp}>{min_temp.toFixed(2)}ºC</p>
            </div>
        </div>
    )

}