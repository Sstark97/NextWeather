import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { Weather, WeatherFeaturesProps } from '../model/types';
import styles from '../styles/WeatherFeaturesCard.module.css'


export function WeatherFeaturesCard({wind_speed, air_pressure, humidity, visibility} :WeatherFeaturesProps) {

    const renderFeatures = () => {
        if(wind_speed){
            return (
                <>  
                    <h3 id={styles.principalText}>
                        Wind Status
                    </h3>

                    <p className="fs-2">
                        {wind_speed.toFixed(0)}mph
                    </p>
                </>
            )
        } 

        if(air_pressure){
            return (
                <>  
                    <h3 id={styles.principalText}>
                        Air Pressure
                    </h3>

                    <p className="fs-2">
                        {air_pressure.toFixed(0)}mb
                    </p>
                </>
            )
        }

        if(visibility){
            return (
                <>  
                    <h3 id={styles.principalText}>
                        Visibility
                    </h3>

                    <p className="fs-2">
                        {visibility.toFixed(1)} miles
                    </p>
                </>
            )
        }

        
        return (
            <>  
                <h3 id={styles.principalText}>
                    Humidity
                </h3>

                <p className="fs-2">
                    {humidity}%
                </p>
                <div className="progress">
                    <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated" role="progressbar" style= {{width:humidity+'%'}} aria-valuenow={humidity} aria-valuemin={0} aria-valuemax={1000}>{humidity}%</div>
                </div>
            </>
        )
        
    }

    const renderFeature = renderFeatures()

    return (
        <div className={styles.featuresIndividual}>
            {renderFeature}
        </div>
    )

}