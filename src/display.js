import { getGeocoding, convertTime, convertWMO } from './weatherAPI';

// Create the header of the app
function createHeader() {
    const h1 = document.createElement('h1');
    h1.textContent = "Weather";
    document.body.prepend(h1);
}

// Create a loading component to tell the user the information is loading on the page
function createLoadingComponent() {
    const loadingContainer = document.querySelector('.loading-container');
    const loadingComponent = document.createElement('p');

    loadingComponent.classList.add('loading-component');
    loadingComponent.textContent = "Loading... Please wait!";
    loadingContainer.append(loadingComponent);
}

// Show the loading text
function showLoadingComponent() {
    const loadingComponent = document.querySelector('.loading-container');
    loadingComponent.style.display = 'block';
}

// Hide the loading text
function hideLoadingComponent() {
    const loadingComponent = document.querySelector('.loading-container');
    loadingComponent.style.display = 'none';
}

// Create a temperature button in which one can toggle from Fahrenheit to Celcius and vice versa
function createTemperatureBtn() {
    const container = document.querySelector('.form-container');
    const tempBtn = document.createElement('button');

    tempBtn.classList.add('temp-btn');
    tempBtn.type = 'button';
    tempBtn.textContent = '°F';
    tempBtn.value = true;
    tempBtn.addEventListener('click', () => {
        if (tempBtn.textContent == '°F') {
            tempBtn.textContent = '°C';
            tempBtn.value = false;
        } else {
            tempBtn.textContent = '°F';
            tempBtn.value = true;
        }
        const unhandledName = document.querySelector('.search-name');
        if (unhandledName) {
            getGeocoding(unhandledName.textContent);
            console.log(unhandledName.textContent);
        }
    });
    container.prepend(tempBtn);
}

// Create the weather form for the user to search a location
function createWeatherForm() {
    const formContainer = document.querySelector('.form-container');
    const form = document.createElement('form');
    const search = document.createElement('input');
    const submitBtn = document.createElement('button');

    search.type = 'search';
    search.id = 'search';
    search.name = 'search';

    submitBtn.textContent = 'Search';
    submitBtn.type = 'submit';
    submitBtn.value = 'Submit';

    form.classList.add('weather-form');
    search.classList.add('search-bar');
    submitBtn.classList.add('submit-btn');

    formContainer.prepend(form);
    form.append(search, submitBtn);

    const weatherForm = document.querySelector('.weather-form');

    // Prevents refreshing, when the user enters or clicks the search button then query the search result
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchBar = document.querySelector('.search-bar');
        showLoadingComponent();
        getGeocoding(searchBar.value);
        console.log("Form submitted!");
    });

}

// Display the Geocode information
function displayGeocode(processedGeocodeData) {
    const displayGeocodeDiv = document.querySelector('.display-geocode');
    displayGeocodeDiv.innerHTML = '';

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');

    p2.classList.add('search-name');

    p1.textContent = processedGeocodeData['country'];
    p2.textContent = processedGeocodeData['name'];
    p3.textContent = processedGeocodeData['timezone'];

    displayGeocodeDiv.append(p1, p2, p3);
}

// TODO: Fix ISO6801 timestamps to Date (offset time) and fix the weather codes to weather interpreted text
// Display the Weather information
function displayWeather(processedWeatherData) {
    const displayWeatherDiv = document.querySelector('.display-weather');
    displayWeatherDiv.innerHTML = '';

    const todayDiv = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p15 = document.createElement('p');
    const p4 = document.createElement('p');

    p1.textContent = "Temperature: " + processedWeatherData['currentTemp'] + processedWeatherData['currentTempUnits'];
    p2.textContent = "Real Feel: " + processedWeatherData['currentRealFeel'] + processedWeatherData['currentRealFeelUnits'];
    p3.textContent = "Humidity: " + processedWeatherData['currentHumidity'] + processedWeatherData['currentHumidityUnits'];
    p4.textContent = "Wind Speed: " + processedWeatherData['currentWindSpeed'] + " " + processedWeatherData['currentWindSpeedUnits'];
    p15.textContent = "Weather: " + convertWMO(processedWeatherData['currentWeatherCode']);

    const allHoursDiv = document.createElement('div');
    const allDaysDiv = document.createElement('div');
    const miscDiv = document.createElement('div');

    todayDiv.classList.add('today-div');
    allHoursDiv.classList.add('all-hours-div');
    allDaysDiv.classList.add('all-days-div');
    miscDiv.classList.add('misc-div');

    displayWeatherDiv.append(todayDiv, allHoursDiv, allDaysDiv, miscDiv);
    todayDiv.append(p15, p1, p2, p3, p4);

    for (let i = 0; i < processedWeatherData['hourlyTime'].length; i++) {
        const hourDiv = document.createElement('div');
        const indexStr = i.toString();
        const p5 = document.createElement('p');
        const p6 = document.createElement('p');
        const p7 = document.createElement('p');
        const p16 = document.createElement('p');

        hourDiv.classList.add('hour-div');

        p5.textContent = "Hour: " + convertTime(processedWeatherData['hourlyTime'][indexStr]);
        p6.textContent = "Temperature: " + processedWeatherData['hourlyTemp'][indexStr] + processedWeatherData['hourlyTempUnits'];
        p7.textContent = "Precipitation: " + processedWeatherData['hourlyPrecipitation'][indexStr] + processedWeatherData['hourlyPrecipitationUnits'];
        p16.textContent = "Weather: " + convertWMO(processedWeatherData['hourlyWeatherCode'][indexStr]);

        allHoursDiv.append(hourDiv);
        hourDiv.append(p5, p16, p6, p7);
    }

    for (let i = 0; i < processedWeatherData['dailyTime'].length; i++) {
        const dayDiv = document.createElement('div');
        const indexStr = i.toString();
        const p8 = document.createElement('p');
        const p9 = document.createElement('p');
        const p10 = document.createElement('p');
        const p11 = document.createElement('p');
        const p17 = document.createElement('p');

        dayDiv.classList.add('day-div');

        p8.textContent = "Day: " + convertTime(processedWeatherData['dailyTime'][indexStr], true);
        p9.textContent = "Max Temperature: " + processedWeatherData['dailyTempMax'][indexStr] + processedWeatherData['dailyTempMaxUnits'];
        p10.textContent = "Min Temperature: " + processedWeatherData['dailyTempMin'][indexStr] + processedWeatherData['dailyTempMinUnits'];
        p11.textContent = "Precipitation: " + processedWeatherData['dailyPrecipitationProbMax'][indexStr] + processedWeatherData['dailyPrecipitationProbMaxUnits'];
        p17.textContent = "Weather: " + convertWMO(processedWeatherData['dailyWeatherCode'][indexStr]);

        allDaysDiv.append(dayDiv);
        dayDiv.append(p8, p17, p9, p10, p11);
    }

    const p12 = document.createElement('p');
    const p13 = document.createElement('p');
    const p14 = document.createElement('p');

    p12.textContent = "Sunrise: " + convertTime(processedWeatherData['dailyTodaySunrise'][0]);
    p13.textContent = "Sunset: " + convertTime(processedWeatherData['dailyTodaySunset'][0]);
    p14.textContent = "Max UV Index: " + processedWeatherData['dailyTodayUVIndexMax'][0];
    miscDiv.append(p12, p13, p14);

    console.log("Displayed!");
    hideLoadingComponent();
}

export {
    createHeader,
    createLoadingComponent,
    createTemperatureBtn,
    createWeatherForm,
    displayGeocode,
    displayWeather
};