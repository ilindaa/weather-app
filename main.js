(()=>{"use strict";var e={426:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(81),o=n.n(r),a=n(645),i=n.n(a)()(o());i.push([e.id,".container, .display-weather {\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n}\n\n.all-hours-div, .all-days-div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 1rem;\n}\n\n.all-hours-div {\n    overflow: auto;\n}\n\n.loading-component {\n    display: none;\n}",""]);const c=i},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var u=this[c][0];null!=u&&(i[u]=!0)}for(var l=0;l<e.length;l++){var s=[].concat(e[l]);r&&i[s[0]]||(void 0!==a&&(void 0===s[5]||(s[1]="@layer".concat(s[5].length>0?" ".concat(s[5]):""," {").concat(s[1],"}")),s[5]=a),n&&(s[2]?(s[1]="@media ".concat(s[2]," {").concat(s[1],"}"),s[2]=n):s[2]=n),o&&(s[4]?(s[1]="@supports (".concat(s[4],") {").concat(s[1],"}"),s[4]=o):s[4]="".concat(o)),t.push(s))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},i=[],c=0;c<e.length;c++){var u=e[c],l=r.base?u[0]+r.base:u[0],s=a[l]||0,d="".concat(l," ").concat(s);a[l]=s+1;var m=n(d),p={css:u[1],media:u[2],sourceMap:u[3],supports:u[4],layer:u[5]};if(-1!==m)t[m].references++,t[m].updater(p);else{var y=o(p,r);r.byIndex=c,t.splice(c,0,{identifier:d,updater:y,references:1})}i.push(d)}return i}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);t[c].references--}for(var u=r(e,o),l=0;l<a.length;l++){var s=n(a[l]);0===t[s].references&&(t[s].updater(),t.splice(s,1))}a=u}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{var e=n(379),t=n.n(e),r=n(795),o=n.n(r),a=n(569),i=n.n(a),c=n(565),u=n.n(c),l=n(216),s=n.n(l),d=n(589),m=n.n(d),p=n(426),y={};async function f(e){const t=await function(e){let t=e;return e.includes(" ")&&(t=e.replaceAll(" ","+")),t}(e);console.log(t);try{const e=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${t}&count=10&language=en&format=json`,{mode:"cors"}),n=await e.json();console.log("geocodeData:"),console.log(n);let r=function(e){return{country:e.results[0].country,name:e.results[0].name,latitude:e.results[0].latitude,longitude:e.results[0].longitude,timezone:e.results[0].timezone}}(n);console.log(r),function(e){const t=document.querySelector(".display-geocode");t.innerHTML="";const n=document.createElement("p"),r=document.createElement("p"),o=document.createElement("p");r.classList.add("search-name"),n.textContent=e.country,r.textContent=e.name,o.textContent=e.timezone,t.append(n,r,o)}(r);const o=document.querySelector(".temp-btn").value;!async function(e,t,n){let r=function(e){return"true"===e?["&temperature_unit=fahrenheit","&wind_speed_unit=mph","&precipitation_unit=inch"]:["","&wind_speed_unit=ms",""]}(n);console.log("Units: "+r);try{const n=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,precipitation_probability${r[0]}&${r[1]}&${r[2]}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto`,{mode:"cors"}),o=await n.json();console.log("weatherData:"),console.log(o);let a=function(e){const t=e.current.temperature_2m,n=e.current_units.temperature_2m,r=e.current.apparent_temperature,o=e.current_units.apparent_temperature,a=e.current.relative_humidity_2m,i=e.current_units.relative_humidity_2m,c=e.current.wind_speed_10m,u=e.current_units.wind_speed_10m,l=(new Date).getHours();console.log(l);return{currentTemp:t,currentTempUnits:n,currentRealFeel:r,currentRealFeelUnits:o,currentHumidity:a,currentHumidityUnits:i,currentWindSpeed:c,currentWindSpeedUnits:u,hourlyTime:e.hourly.time.slice(l,24),hourlyTemp:e.hourly.temperature_2m.slice(l,24),hourlyTempUnits:e.hourly_units.temperature_2m,hourlyPrecipitation:e.hourly.precipitation_probability.slice(l,24),hourlyPrecipitationUnits:e.hourly_units.precipitation_probability,dailyTime:e.daily.time,dailyTempMax:e.daily.temperature_2m_max,dailyTempMaxUnits:e.daily_units.temperature_2m_max,dailyTempMin:e.daily.temperature_2m_min,dailyTempMinUnits:e.daily_units.temperature_2m_min,dailyPrecipitationProbMax:e.daily.precipitation_probability_max,dailyPrecipitationProbMaxUnits:e.daily_units.precipitation_probability_max,dailyTodaySunrise:e.daily.sunrise.slice(0,1),dailyTodaySunset:e.daily.sunset.slice(0,1),dailyTodayUVIndexMax:e.daily.uv_index_max.slice(0,1)}}(o);console.log(a),function(e){const t=document.querySelector(".display-weather");t.innerHTML="";const n=document.createElement("div"),r=document.createElement("p"),o=document.createElement("p"),a=document.createElement("p"),i=document.createElement("p");r.textContent="Temperature: "+e.currentTemp+e.currentTempUnits,o.textContent="Real Feel: "+e.currentRealFeel+e.currentRealFeelUnits,a.textContent="Humidity: "+e.currentHumidity+e.currentHumidityUnits,i.textContent="Wind Speed: "+e.currentWindSpeed+" "+e.currentWindSpeedUnits;const c=document.createElement("div"),u=document.createElement("div"),l=document.createElement("div");n.classList.add("today-div"),c.classList.add("all-hours-div"),u.classList.add("all-days-div"),l.classList.add("misc-div"),t.append(n,c,u,l),n.append(r,o,a,i);for(let t=0;t<e.hourlyTime.length;t++){const n=document.createElement("div"),r=t.toString(),o=document.createElement("p"),a=document.createElement("p"),i=document.createElement("p");n.classList.add("hour-div"),o.textContent="Hour: "+e.hourlyTime[r],a.textContent="Temperature: "+e.hourlyTemp[r]+e.hourlyTempUnits,i.textContent="Precipitation: "+e.hourlyPrecipitation[r]+e.hourlyPrecipitationUnits,c.append(n),n.append(o,a,i)}for(let t=0;t<e.dailyTime.length;t++){const n=document.createElement("div"),r=t.toString(),o=document.createElement("p"),a=document.createElement("p"),i=document.createElement("p"),c=document.createElement("p");n.classList.add("day-div"),o.textContent="Day: "+e.dailyTime[r],a.textContent="Max Temperature: "+e.dailyTempMax[r]+e.dailyTempMaxUnits,i.textContent="Min Temperature: "+e.dailyTempMin[r]+e.dailyTempMinUnits,c.textContent="Precipitation: "+e.dailyPrecipitationProbMax[r]+e.dailyPrecipitationProbMaxUnits,u.append(n),n.append(o,a,i,c)}const s=document.createElement("p"),d=document.createElement("p"),m=document.createElement("p");s.textContent="Sunrise: "+e.dailyTodaySunrise[0],d.textContent="Sunset: "+e.dailyTodaySunset[0],m.textContent="Max UV Index: "+e.dailyTodayUVIndexMax[0],l.append(s,d,m),console.log("Displayed!"),document.querySelector(".loading-component").style.display="none"}(a)}catch(e){console.log(e)}}(r.latitude,r.longitude,o)}catch(e){console.log(e)}}y.styleTagTransform=m(),y.setAttributes=u(),y.insert=i().bind(null,"head"),y.domAPI=o(),y.insertStyleElement=s(),t()(p.Z,y),p.Z&&p.Z.locals&&p.Z.locals,function(){const e=document.createElement("h1");e.textContent="Weather",document.body.prepend(e)}(),function(){const e=document.querySelector(".form-container"),t=document.createElement("form"),n=document.createElement("input"),r=document.createElement("button");n.type="search",n.id="search",n.name="search",r.textContent="Search",r.type="submit",r.value="Submit",t.classList.add("weather-form"),n.classList.add("search-bar"),r.classList.add("submit-btn"),e.prepend(t),t.append(n,r),document.querySelector(".weather-form").addEventListener("submit",(e=>{e.preventDefault();const t=document.querySelector(".search-bar");document.querySelector(".loading-component").style.display="block",f(t.value),console.log("Form submitted!")}))}(),function(){const e=document.querySelector(".form-container"),t=document.createElement("button");t.classList.add("temp-btn"),t.type="button",t.textContent="°F",t.value=!0,t.addEventListener("click",(()=>{"°F"==t.textContent?(t.textContent="°C",t.value=!1):(t.textContent="°F",t.value=!0);const e=document.querySelector(".search-name");e&&(f(e.textContent),console.log(e.textContent))})),e.prepend(t)}(),function(){const e=document.querySelector(".loading-container"),t=document.createElement("p");t.classList.add("loading-component"),t.textContent="Loading... Please wait!",e.append(t)}()})()})();