import React from 'react'; 
import { useRef } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Weather, LocalWeatherProps } from '../model/types';
import styles from '../styles/LocalWeather.module.css';
import Image from 'next/image';
import { dateFormatter } from '../model/support'

export function LocalWeather({weatherPresent, weatherIcons, city, handleSearch, error} : LocalWeatherProps) {
    

    const today:string = dateFormatter(weatherPresent.applicable_date);
    const cityRef = useRef<HTMLInputElement>(null);

    const handleSearchSon = () => {
        if(cityRef === undefined || cityRef.current === undefined || cityRef.current === null){
            return;
        }
        const city = cityRef.current?.value;
  
        if (city === "") {
            return;
        }
  
        if(typeof city !== 'undefined'){
            handleSearch(city.toLowerCase());
            cityRef.current.value = '';
        }
    }

    return (
        <div className= {styles.weatherContainer} >
            <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center">
                    <input ref={cityRef} className="w-50 me-2 text-center" type="text" placeholder="Search a City"/>
                    <button onClick={handleSearchSon} className="btn btn-primary btn-sm">Search</button>
                </div>
                {error ? 
                    <div className="alert alert-secondary mt-4 w-75 p-0" role="alert">
                        The weather it's not available
                    </div>
                    :
                    <span></span>
                }
            </div>
            <img className="mb-5"src={weatherIcons[weatherIcons.length-1]} alt="" width="250px" height= "125px" />
            <h1 className="mb-5">{`${weatherPresent.the_temp.toFixed(2)}ºC`}</h1>
            <h3 className="mb-5">{weatherPresent.weather_state_name}</h3>
            <p className="mb-3">Today  . {today} </p>
            <div className="d-flex me-1 align-items-center justify-content-center">
                <Image className="m-0" src="/location.svg" alt="Vercel Logo" width={19} height={16} />
                <p className="mt-3">{city}</p>
            </div>
        </div>
    )

}