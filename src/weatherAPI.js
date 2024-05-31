// Handle the name if there are spaces
function handleName(unhandledName) {
    let name = unhandledName;
    if (unhandledName.includes('')) {
        name = unhandledName.replaceAll(' ', '+');
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
        getWeather(processedGeocodeData['latitude'], processedGeocodeData['longitude'], false);
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
    
    if (useImperial === true) {
        return imperial;
    } else {
        return metric;
    }
}

// Get the weather information based on the latitude and longitude
async function getWeather(latitude, longitude, useImperial) {
    let units = useSystem(useImperial);
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,precipitation_probability${units[0]}&${units[1]}&${units[2]}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log("weatherData:");
        console.log(weatherData);
        let processedWeatherData = processWeatherData(weatherData);
        console.log(processedWeatherData);
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
    const currentWindSpeed = weatherData['current']['wind_speed_10m'];
    const currentWindSpeedUnits = weatherData['current_units']['wind_speed_10m'];

    // Todo: Need to get the current hour of the day (in 24 hours) based on the user's local time and their units
    const currentHour = new Date().getHours();
    console.log(currentHour);
    // I only want the current 24 hours of the day
    const hourlyTime = weatherData['hourly']['time'].slice(currentHour, 24);
    const hourlyTemp = weatherData['hourly']['temperature_2m'].slice(currentHour, 24);
    const hourlyTempUnits = weatherData['hourly_units']['temperature_2m'];
    const hourlyPrecipitation = weatherData['hourly']['precipitation_probability'].slice(currentHour, 24);
    const hourlyPrecipitationUnits = weatherData['hourly_units']['precipitation_probability'];

    // By default this is 7 days per week
    const dailyTime = weatherData['daily']['time'];
    const dailyTempMax = weatherData['daily']['temperature_2m_max'];
    const dailyTempMaxUnits = weatherData['daily_units']['temperature_2m_max'];
    const dailyTempMin = weatherData['daily']['temperature_2m_min'];
    const dailyTempMinUnits = weatherData['daily_units']['temperature_2m_min'];
    const dailyPrecipitationProbMax = weatherData['daily']['precipitation_probability_max'];
    const dailyPrecipitationProbMaxUnits = weatherData['daily_units']['precipitation_probability_max'];

    // I only want today's sunrise, sunset, and max UV index
    const dailyTodaySunrise = weatherData['daily']['sunrise'].slice(0, 1);
    const dailyTodaySunset = weatherData['daily']['sunset'].slice(0, 1);
    const dailyTodayUVIndexMax= weatherData['daily']['uv_index_max'].slice(0, 1);
    
    return { currentTemp, currentTempUnits, currentRealFeel, currentRealFeelUnits, 
        currentHumidity, currentHumidityUnits, currentWindSpeed, currentWindSpeedUnits,
        hourlyTime, hourlyTemp, hourlyTempUnits, hourlyPrecipitation, hourlyPrecipitationUnits,
        dailyTime, dailyTempMax, dailyTempMaxUnits, dailyTempMin, dailyTempMinUnits, 
        dailyPrecipitationProbMax, dailyPrecipitationProbMaxUnits, dailyTodaySunrise,
        dailyTodaySunset, dailyTodayUVIndexMax
     };
}

export {
    getGeocoding,
    getWeather
};