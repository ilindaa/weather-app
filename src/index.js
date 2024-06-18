import './style.css';
import { createHeader, createLoadingComponent, createTemperatureBtn, createWeatherForm } from './display';
import { getGeocoding } from './weatherAPI';

createHeader();
createWeatherForm();
createTemperatureBtn();
createLoadingComponent();
getGeocoding("Tokyo");