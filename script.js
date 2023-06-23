const cityInput = document.getElementById("input");
 
const submitForm = cityInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter'){
        let searchValue = cityInput.value.toLowerCase();
        fetchCurrentWeather(searchValue)
            .then ((data) => {
                renderCurrentData(data);
                renderWeatherIcon(data.weather[0].id, data);
            });
        fetchFutureWeather(searchValue)
            .then ((data) => {renderFutureData(data)});
        
        cityInput.blur();
    }
});

const fetchCurrentWeather = async function (location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    return await response.json();
}

const fetchFutureWeather = async function (location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    return await response.json();
}

const renderCurrentData = (data) => {
    cityInput.value = data.name;
    currentTemp.innerHTML = Math.round(data.main.temp) + '&deg;F';
    cloudCondition.innerHTML = data.weather[0].description;
    currentLow.innerHTML = Math.round(data.main.temp_min) + '&deg;F';
    currentHigh.innerHTML = Math.round(data.main.temp_max) + '&deg;F';
    currentWindSpeed.innerHTML = Math.round(10*data.wind.speed)/10 + ' mph';

}

const renderFutureData = (data) => {
    
}

const cityText = document.getElementById("input");
const currentTemp = document.getElementById("currentTemp");
const cloudCondition = document.getElementById("weatherText");
const currentLow = document.getElementById("currentLow");
const currentHigh = document.getElementById("currentHigh");
const currentWindSpeed = document.getElementById("windSpeed");

const mainWeatherIcon = document.getElementById("mainWeatherIcon");

const renderWeatherIcon = (dataId, data) => {
    console.log(dataId);
    if (199 < dataId && dataId < 300){
        mainWeatherIcon.src = 'SVG/lightning.svg';
    }
    else if ((299 < dataId && dataId < 400) || (499 < dataId && dataId < 600)){
        mainWeatherIcon.src = 'SVG/rainy.svg';
    }
    else if (599 < dataId && dataId < 700){
        mainWeatherIcon.src = 'SVG/snow.svg';
    }
    else if (699 < dataId && dataId < 800){
        mainWeatherIcon.src = 'mist.svg';
    }
    else if (dataId === 800 && data.sys.sunrise < data.dt && data.dt < data.sys.sunset){
        mainWeatherIcon.src = 'SVG/sun.svg';
    }
    else if (dataId === 800){
        mainWeatherIcon.src = 'SVG/moon.svg';
    }
    else if (800 < dataId && dataId < 803 && data.sys.sunrise < data.dt && data.dt < data.sys.sunset){
        mainWeatherIcon.src = 'SVG/cloudy-day.svg';
    }
    else if (802 < dataId && dataId < 805 && data.sys.sunrise < data.dt && data.dt < data.sys.sunset){
        mainWeatherIcon.src = 'SVG/cloudy.svg';
    }
    else {
        mainWeatherIcon.src = 'SVG/cloudy-night.svg';
    };
};








async function fetchDummy() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=tyler&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    const data = await response.json();
    console.log(data);
}

fetchDummy();

async function fetchDummyTwo() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=tyler&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    const data = await response.json();
    console.log(data);
}

fetchDummyTwo();

