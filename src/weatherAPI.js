import { displayGeocode, displayWeather } from "./display";

// Handle the name if there are spaces
function handleName(unhandledName) {
    let name = unhandledName;

    if (name.includes('City: ')) {
        name = name.slice(6);
        console.log("Sliced! " + name);
    }

    if (name.includes(' ')) {
        name = name.replaceAll(' ', '+');
        console.log("Handled spaces! " + name);
    }

    return name;
}

// Get the geocode of the location by name or postal code
async function getGeocoding(unhandledName) {
    const name = await handleName(unhandledName);
    console.log(name);
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`, {mode: 'cors'});
        const geocodeData = await response.json();
        console.log("geocodeData:");
        console.log(geocodeData);
        let processedGeocodeData = processGeocodeData(geocodeData);
        console.log(processedGeocodeData);
        displayGeocode(processedGeocodeData);

        const tempBtn = document.querySelector('.temp-btn');
        const useImperial = tempBtn.value;
        
        getWeather(processedGeocodeData['latitude'], processedGeocodeData['longitude'], useImperial);
    } catch (error) {
        console.log(error);
    }
}

// Check whether to use the imperial or metric system and return the system
function useSystem(useImperial) {
    // Fahrenheit, mph, inch
    const imperial = ["&temperature_unit=fahrenheit", "&wind_speed_unit=mph", "&precipitation_unit=inch"];
    // Celcius (default), m/s, millimeters (default)
    const metric = ["", "&wind_speed_unit=ms", ""];
    
    if (useImperial === "true") {
        return imperial;
    } else {
        return metric;
    }
}

// Get the weather information based on the latitude and longitude
async function getWeather(latitude, longitude, useImperial) {
    let units = useSystem(useImperial);
    console.log("Units: " + units);
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code${units[0]}&${units[1]}&${units[2]}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max,weather_code&timezone=auto`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log("weatherData:");
        console.log(weatherData);
        let processedWeatherData = processWeatherData(weatherData);
        console.log(processedWeatherData);
        displayWeather(processedWeatherData);
    } catch (error) {
        console.log(error);
    }
}

// Factory function to process the geocode data and return it as an object
// country, name, latitude, longitude, timezone
function processGeocodeData(geocodeData) {
    const index = 0;
    const country = geocodeData['results'][index]['country'];
    const name = geocodeData['results'][index]['name'];
    const latitude = geocodeData['results'][index]['latitude'];
    const longitude = geocodeData['results'][index]['longitude'];
    const timezone = geocodeData['results'][index]['timezone'];
    return { country, name, latitude, longitude, timezone };
}

// Factory function to process the weather data and return it as an object
// (current with units) temperature, real feel, wind speed, humidity
// hourly: current time to whatever time (24 hours), hourly temperature, hourly weather name *and weather image, hourly precipitation
// daily (weekly): current day to whatever day (7 days), weekly precipitation (total for the day I guess), UV index (max), *weather images, and highest and lowest temperature, sunrise, sunset
function processWeatherData(weatherData) {
    // Get the current temperature, real feel, humidity, and wind speed and their units
    const currentTemp = weatherData['current']['temperature_2m'];
    const currentTempUnits = weatherData['current_units']['temperature_2m'];
    const currentRealFeel = weatherData['current']['apparent_temperature'];
    const currentRealFeelUnits = weatherData['current_units']['apparent_temperature'];
    const currentHumidity = weatherData['current']['relative_humidity_2m'];
    const currentHumidityUnits = weatherData['current_units']['relative_humidity_2m'];
    const currentWeatherCode = weatherData['current']['weather_code'];
    const currentWindSpeed = weatherData['current']['wind_speed_10m'];
    const currentWindSpeedUnits = weatherData['current_units']['wind_speed_10m'];

    // Gets the current hour of the day (in 24 hours) based on the user's local time and their units
    const currentHour = new Date().getHours();

    // I only want the current 24 hours of the day
    const hourlyTime = weatherData['hourly']['time'].slice(currentHour, 24);
    const hourlyTemp = weatherData['hourly']['temperature_2m'].slice(currentHour, 24);
    const hourlyTempUnits = weatherData['hourly_units']['temperature_2m'];
    const hourlyPrecipitation = weatherData['hourly']['precipitation_probability'].slice(currentHour, 24);
    const hourlyPrecipitationUnits = weatherData['hourly_units']['precipitation_probability'];
    const hourlyWeatherCode = weatherData['hourly']['weather_code'];

    // By default this is 7 days per week
    const dailyTime = weatherData['daily']['time'];
    const dailyTempMax = weatherData['daily']['temperature_2m_max'];
    const dailyTempMaxUnits = weatherData['daily_units']['temperature_2m_max'];
    const dailyTempMin = weatherData['daily']['temperature_2m_min'];
    const dailyTempMinUnits = weatherData['daily_units']['temperature_2m_min'];
    const dailyPrecipitationProbMax = weatherData['daily']['precipitation_probability_max'];
    const dailyPrecipitationProbMaxUnits = weatherData['daily_units']['precipitation_probability_max'];
    const dailyWeatherCode = weatherData['daily']['weather_code'];

    // I only want today's sunrise, sunset, and max UV index
    const dailyTodaySunrise = weatherData['daily']['sunrise'].slice(0, 1);
    const dailyTodaySunset = weatherData['daily']['sunset'].slice(0, 1);
    const dailyTodayUVIndexMax= weatherData['daily']['uv_index_max'].slice(0, 1);
    
    return { currentTemp, currentTempUnits, currentRealFeel, currentRealFeelUnits, 
        currentHumidity, currentHumidityUnits, currentWeatherCode, currentWindSpeed, 
        currentWindSpeedUnits, hourlyTime, hourlyTemp, hourlyTempUnits, hourlyPrecipitation,
        hourlyPrecipitationUnits, hourlyWeatherCode, dailyTime, dailyTempMax, dailyTempMaxUnits,
        dailyTempMin, dailyTempMinUnits, dailyPrecipitationProbMax, dailyPrecipitationProbMaxUnits, 
        dailyWeatherCode, dailyTodaySunrise, dailyTodaySunset, dailyTodayUVIndexMax
     };
}

// Converts the weather code to the description
function convertWMO(code) {
    const description = weatherCodeToDescription[code] || 'Not available';
    return description;
}

const weatherCodeToDescription = {
    0: "Clear sky",
    1: "Mainly clear", 
    2: "Partly cloudy", 
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle", 
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers", 
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Slight or moderate thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}

// Converts the ISO8601 timestamp to the user's local time and returns it
// localDate if set to true then the localTime is in date string form
function convertTime(timestamp, localDate = false) {
    // Get the date using the ISO8601 timestamp
    const date = new Date(timestamp);
    // Get the timezone offset difference (minutes)
    const timezoneOffsetDiff = date.getTimezoneOffset();
    // Adjust the time based on the timezone offset difference (milliseconds)
    date.setTime(date.getTime() + (timezoneOffsetDiff * 60000));
    let localTime = date.toLocaleString();
    if (localDate) {
        localTime = date.toLocaleDateString();
    }
    return localTime;
}

export {
    getGeocoding,
    getWeather,
    convertWMO,
    convertTime
};