import { getGeocoding, convertTime, convertWMO } from './weatherAPI';
import searchSvg from './Icons/search_24dp_FILL0_wght400_GRAD0_opsz24.svg';

// Create the header of the app
function createHeader() {
    const h1 = document.createElement('h1');
    h1.textContent = "Weather App";
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
    const tempBtn = document.createElement('button');

    tempBtn.classList.add('temp-btn');
    tempBtn.type = 'button';
    // Default: Celcius
    tempBtn.textContent = '°C';
    // Boolean value for if it uses imperial
    tempBtn.value = false;
    // If on Fahrenheit, change to Celcius and vice versa
    tempBtn.addEventListener('click', () => {
        if (tempBtn.value == "true") {
            tempBtn.textContent = '°C';
            tempBtn.value = false;
        } else {
            tempBtn.textContent = '°F';
            tempBtn.value = true;
        }
        const unhandledName = document.querySelector('.search-name');
        if (unhandledName) {
            getGeocoding(unhandledName.textContent);
        }
    });
    document.body.prepend(tempBtn);
}

// Create the weather form for the user to search a location
function createWeatherForm() {
    const formContainer = document.querySelector('.form-container');
    const form = document.createElement('form');
    const searchBarDiv = document.createElement('div');
    const search = document.createElement('input');
    const submitBtn = document.createElement('button');
    const searchSvgDiv = document.createElement('div');
    const searchIcon = document.createElement('img');

    search.type = 'search';
    search.id = 'search';
    search.name = 'search';
    search.placeholder = 'Search a city...';

    submitBtn.type = 'submit';
    submitBtn.value = 'Submit';
    searchIcon.src = searchSvg;

    form.classList.add('weather-form');
    searchBarDiv.classList.add('search-bar-div');
    search.classList.add('search-bar');
    submitBtn.classList.add('submit-btn');
    searchSvgDiv.classList.add('search-svg-div');

    formContainer.prepend(form);
    form.append(searchBarDiv);
    searchBarDiv.append(submitBtn, search);
    submitBtn.append(searchSvgDiv);
    searchSvgDiv.append(searchIcon);

    const weatherForm = document.querySelector('.weather-form');

    // Prevents refreshing, when the user enters or clicks the search button then query the search result
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchBar = document.querySelector('.search-bar');
        if(searchBar.value != '') {
            showLoadingComponent();
            getGeocoding(searchBar.value);
            console.log("Form submitted!");
        } else {
            console.log("Form did not submit, it's empty!");
        }
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

    p1.textContent = "Country: " + processedGeocodeData['country'];
    p2.textContent = "City: " + processedGeocodeData['name'];
    p3.textContent = "Timezone: " + processedGeocodeData['timezone'];

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

    p1.textContent = "Temp: " + processedWeatherData['currentTemp'] + processedWeatherData['currentTempUnits'];
    p2.textContent = "Real Feel: " + processedWeatherData['currentRealFeel'] + processedWeatherData['currentRealFeelUnits'];
    p3.textContent = "Humidity: " + processedWeatherData['currentHumidity'] + processedWeatherData['currentHumidityUnits'];
    p4.textContent = "Wind Speed: " + processedWeatherData['currentWindSpeed'] + " " + processedWeatherData['currentWindSpeedUnits'];
    p15.textContent = convertWMO(processedWeatherData['currentWeatherCode']);

    const allHoursDiv = document.createElement('div');
    const allDaysDiv = document.createElement('div');
    const miscDiv = document.createElement('div');

    const header1 = document.createElement('h2');
    const header2 = document.createElement('h2');
    const header3 = document.createElement('h2');
    const header4 = document.createElement('h2');

    todayDiv.classList.add('today-div');
    allHoursDiv.classList.add('all-hours-div');
    allDaysDiv.classList.add('all-days-div');
    miscDiv.classList.add('misc-div');

    header1.textContent = 'Current';
    header2.textContent = 'Hourly Weather';
    header3.textContent = 'Daily Weather';
    header4.textContent = 'Misc.';

    displayWeatherDiv.append(header1, todayDiv, header2, allHoursDiv, header3, allDaysDiv, header4, miscDiv);
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
        p6.textContent = "Temp: " + processedWeatherData['hourlyTemp'][indexStr] + processedWeatherData['hourlyTempUnits'];
        p7.textContent = "Precipitation: " + processedWeatherData['hourlyPrecipitation'][indexStr] + processedWeatherData['hourlyPrecipitationUnits'];
        p16.textContent = convertWMO(processedWeatherData['hourlyWeatherCode'][indexStr]);

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

        p8.textContent = convertTime(processedWeatherData['dailyTime'][indexStr], true);
        p9.textContent = "Max Temp: " + processedWeatherData['dailyTempMax'][indexStr] + processedWeatherData['dailyTempMaxUnits'];
        p10.textContent = "Min Temp: " + processedWeatherData['dailyTempMin'][indexStr] + processedWeatherData['dailyTempMinUnits'];
        p11.textContent = "Precipitation: " + processedWeatherData['dailyPrecipitationProbMax'][indexStr] + processedWeatherData['dailyPrecipitationProbMaxUnits'];
        p17.textContent = convertWMO(processedWeatherData['dailyWeatherCode'][indexStr]);

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