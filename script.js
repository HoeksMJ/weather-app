const fetchCurrentWeather = async function (location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    return await response.json();
}

const fetchFutureWeather = async function (location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    return await response.json();
}

const cityInput = document.getElementById("input");

const submitForm = cityInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter'){
        let sunrise;
        let sunset;
        let searchValue = cityInput.value.toLowerCase();
        fetchCurrentWeather(searchValue)
            .then ((data) => {
                sunrise = data.sys.sunrise;
                sunset = data.sys.sunset;
                renderCurrentData(data);
                renderWeatherIcon(data.weather[0].id, data.dt, sunrise, sunset, mainWeatherIcon);
            });
        fetchFutureWeather(searchValue)
            .then ((data) => {
                renderHourlyTime(data);
                renderHourlyTemp(data);
                for (let i = 0; i < 7; i++){
                    renderWeatherIcon(data.list[i].weather[0].id, data.list[i].dt, sunrise, sunset, document.getElementById(`weatherDiv${i}`).children[1]);
                };
            });
        cityInput.blur();
    }
});

const renderCurrentData = (data) => {
    cityInput.value = data.name;
    currentTemp.innerHTML = Math.round(data.main.temp) + '&deg;F';
    cloudCondition.innerHTML = data.weather[0].description;
    currentLow.innerHTML = Math.round(data.main.temp_min) + '&deg;F';
    currentHigh.innerHTML = Math.round(data.main.temp_max) + '&deg;F';
    currentWindSpeed.innerHTML = Math.round(10*data.wind.speed)/10 + ' mph';
}

const renderHourlyTime = (data) => {
    for (let i = 0; i < 7; i++){
        let epochTime = ((data.list[i].dt + 18000 + data.city.timezone)*1000);
        let listedDate = new Date(epochTime);
        let hour = listedDate.getHours();
        let futureHourlyTime = document.getElementById(`weatherDiv${i}`).children[0];
        if (hour === 12){
            futureHourlyTime.innerHTML = hour + 'pm';
        }
        else if (hour === 0){
            futureHourlyTime.innerHTML = '12am';
        }
        else if (hour < 12){
            futureHourlyTime.innerHTML = hour + 'am';
        }
        else {
            futureHourlyTime.innerHTML = hour%12 + 'pm';
        };
    }

}

const renderHourlyTemp = (data) => {
    for (let i = 0; i < 7; i++){
        let futureHourlyTemp = document.getElementById(`weatherDiv${i}`).children[2];
        futureHourlyTemp.innerHTML = Math.round(data.list[i].main.temp) + '&deg;F';
    }
}

const cityText = document.getElementById("input");
const currentTemp = document.getElementById("currentTemp");
const cloudCondition = document.getElementById("weatherText");
const currentLow = document.getElementById("currentLow");
const currentHigh = document.getElementById("currentHigh");
const currentWindSpeed = document.getElementById("windSpeed");
const mainWeatherIcon = document.getElementById("mainWeatherIcon");

const renderWeatherIcon = (dataId, time, sunrise, sunset, target) => {
    if (199 < dataId && dataId < 300){
        target.src = 'SVG/lightning.svg';
    }
    else if ((299 < dataId && dataId < 400) || (499 < dataId && dataId < 600)){
        target.src = 'SVG/rainy.svg';
    }
    else if (599 < dataId && dataId < 700){
        target.src = 'SVG/snow.svg';
    }
    else if (699 < dataId && dataId < 800){
        target.src = 'SVG/mist.svg';
    }
    else if (dataId === 800 && sunrise < time && time < sunset){
        target.src = 'SVG/sun.svg';
    }
    else if (dataId === 800){
        target.src = 'SVG/moon.svg';
    }
    else if (800 < dataId && dataId < 803 && sunrise < time && time < sunset){
        target.src = 'SVG/cloudy-day.svg';
    }
    else if (802 < dataId && dataId < 805 && sunrise < time && time < sunset){
        target.src = 'SVG/cloudy.svg';
    }
    else {
        target.src = 'SVG/cloudy-night.svg';
    };
};