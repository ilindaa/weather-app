// Get the geocode of the location by name or postal code
async function getGeocoding(name) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`, {mode: 'cors'});
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
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,precipitation_probability${units[0]}&${units[1]}&${units[2]}&daily=precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto`, {mode: 'cors'});
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
    const country = geocodeData['results'][0]['country'];
    const name = geocodeData['results'][0]['name'];
    const latitude = geocodeData['results'][0]['latitude'];
    const longitude = geocodeData['results'][0]['longitude'];
    const timezone = geocodeData['results'][0]['timezone'];
    return { country, name, latitude, longitude, timezone };
}

// Factory function to process the weather data and return it as an object
// (current with units) temperature, real feel, wind speed, humidity
// hourly: current time to whatever time (24 hours), hourly temperature, hourly weather name *and weather image, hourly precipitation
// weekly: current day to whatever day (7 days), weekly precipitation (total for the day I guess), weather images, and highest and lowest temperature
// miscellaneous: sunrise, sunset, UV index
function processWeatherData(weatherData) {
    const temp = weatherData['current']['temperature_2m'];
    const tempUnits = weatherData['current_units']['temperature_2m'];
    const realFeel = weatherData['current']['apparent_temperature'];
    const realFeelUnits = weatherData['current_units']['apparent_temperature'];
    const humidity = weatherData['current']['relative_humidity_2m'];
    const humidityUnits = weatherData['current_units']['relative_humidity_2m'];
    const windSpeed = weatherData['current']['wind_speed_10m'];
    const windSpeedUnits = weatherData['current_units']['wind_speed_10m'];
    
    return { temp, tempUnits, realFeel, realFeelUnits, humidity, humidityUnits, windSpeed, windSpeedUnits };
}

export {
    getGeocoding,
    getWeather
};