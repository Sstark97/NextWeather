export interface Weather{
    weather_state_name: string,
    weather_state_abbr: string,
    applicable_date: string,
    min_temp: number,
    max_temp: number,
    the_temp: number,
    wind_speed: number,
    wind_direction_compass: string,
    wind_direction: number,
    air_pressure: number,
    humidity: number,
    visibility: number
}

export interface LocalWeatherProps{
    weatherPresent: Weather,
    weatherIcons: string[],
    city: string,
    handleSearch(city:string):void,
    error?:boolean
}

export interface WeatherCardProps {
    date:string,
    image_url:string,
    min_temp:number,
    max_temp:number
}

export interface WeatherFeaturesProps {
    wind_speed?:number,
    wind_direction?:number,
    wind_direction_compass?:string,
    air_pressure?:number,
    humidity?:number,
    visibility?: number
}