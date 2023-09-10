import './style.css';

function testing() {
  const test = document.createElement('p');
  test.textContent = 'Testing';
  document.body.appendChild(test);
}

function weather() {
  const apiKey = ''; // This is a free public API key, will learn how to handle keys without pushing to front-end later
  const location = 'japan';

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
    {
      mode: 'cors',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      console.log(response.location.name);
    })
    .catch((err) => {
      console.log(err);
    });
}

testing();
weather();
