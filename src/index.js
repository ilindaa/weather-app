import './style.css';

function testing() {
  const test = document.createElement('p');
  test.textContent = 'Testing';
  document.body.appendChild(test);
}

// Take location and return the weather data for that location
async function getWeatherData(str) {
  const apiKey = '54491ce3d41e459d976173417231009'; // This is a free public API key, will learn how to handle keys without pushing to front-end later
  const location = str;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (err) {
    console.log(err);
  }
  return null;
}

// Process the JSON data from the API and return an object with only the data required for the app
function processWeatherData(weatherData) {
  console.log(weatherData);
  console.log(weatherData.location.name);
}

testing();
processWeatherData(await getWeatherData('japan'));
