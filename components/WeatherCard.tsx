import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import { Weather, WeatherCardProps } from '../model/types';
import styles from '../styles/WeatherCard.module.css';
import Image from 'next/image';
import { dateFormatter } from '../model/support'

export function WeatherCard({ date, image_url, min_temp, max_temp } : WeatherCardProps){

    
    return (
        <div className={styles.weatherCard}>

            {date.substring(8,date.length) === String(new Date().getDate()) ? <h2 className="fs-6 w-100 text-center">Today</h2> : <h2 className="fs-6 w-100 text-center"> {dateFormatter(date)}</h2>}
            <img className="mb-3"src={image_url} alt="" width="50%" height= "25.5%" />
            <div className="d-flex mt-4 text-center">
                <p className="me-2 w-50">{max_temp.toFixed(2)}ºC</p>
                <p id={styles.minTemp}>{min_temp.toFixed(2)}ºC</p>
            </div>
        </div>
    )

}