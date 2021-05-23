import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { Weather, WeatherFeaturesProps } from '../model/types';


export function WeatherFeaturesCard({wind_speed, air_pressure, humidity} :WeatherFeaturesProps) {

    const renderFeatures = () => {
        if(wind_speed){
            return (
                <>  
                    <h3>
                        Wind Status
                    </h3>

                    <p className="fs-2">
                        {wind_speed}mph
                    </p>
                </>
            )
        } 

        if(air_pressure){
            return (
                <>  
                    <h3>
                        Air Pressure
                    </h3>

                    <p className="fs-2">
                        {air_pressure}mb
                    </p>
                </>
            )
        }
    }

}