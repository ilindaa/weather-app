import { getGeocoding } from './weatherAPI';

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

    container.append(form);
    form.append(search, submitBtn);

    const weatherForm = document.querySelector('.weather-form');

    // Prevents refreshing, when the user enters or clicks the search button then query the search result
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchBar = document.querySelector('.search-bar');
        getGeocoding(searchBar.value);
        console.log("Form submitted!");
    });

}

export {
    createWeatherForm
};