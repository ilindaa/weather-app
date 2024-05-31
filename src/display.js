import { getGeocoding } from './weatherAPI';

function createLoadingComponent() {
    const displayWeatherDiv = document.querySelector('.display-weather');
    const loadingComponent = document.createElement('p');
    loadingComponent.classList.add('loading-component');
    displayWeatherDiv.append(loadingComponent);
}

function createWeatherForm() {
    const container = document.querySelector('.container');
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

    container.prepend(form);
    form.append(search, submitBtn);

    const weatherForm = document.querySelector('.weather-form');

    // Prevents refreshing, when the user enters or clicks the search button then query the search result
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchBar = document.querySelector('.search-bar');
        const loadingComponent = document.querySelector('.loading-component');
        loadingComponent.textContent = "Loading... Please wait!";
        getGeocoding(searchBar.value);
        loadingComponent.textContent = "Loaded! Check the console!";
        console.log("Form submitted!");
    });

}

export {
    createLoadingComponent,
    createWeatherForm
};