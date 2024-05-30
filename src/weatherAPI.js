// Get the geocode of the location by name or postal code
async function getGeocoding(name) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`, {mode: 'cors'});
        const geocodeData = await response.json();
        console.log(geocodeData);
        getWeather(geocodeData['results'][0].latitude, geocodeData['results'][0].longitude);
    } catch (error) {
        console.log(error);
    }
}

// Get the weather information based on the latitude and longitude
async function getWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`, {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
    } catch (error) {
        console.log(error);
    }
}

export {
    getGeocoding,
    getWeather
};