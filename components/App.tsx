import React from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { useState } from 'react';

export function App () {
    const [weather, setWeather] = useState({});
    
    const api_url:string = 'https://www.metaweather.com/api/'
    const api_icon:string = 'https://www.metaweather.com/static/img/weather/'


    return <h1>Componente App</h1>
}