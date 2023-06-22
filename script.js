const cityInput = document.getElementById("input");

const submitForm = cityInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter'){
        let searchValue = cityInput.value.toLowerCase();
        fetchCurrentWeather(searchValue)
            .then ((data) => {renderCurrentData(data)});
        cityInput.blur();
    }
});

const fetchCurrentWeather = async function (location) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    return await response.json();
}

const renderCurrentData = (data) => {
    cityInput.value = data.name;
    currentTemp.innerHTML = Math.round(data.main.temp) + '&deg;F';

}

const cityText = document.getElementById("input");
cityText.value = 'Tyler';
console.log(cityText);
const currentTemp = document.getElementById("currentTemp");










async function fetchDummy() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=tyler&units=imperial&appid=02cc3663df23cce74bc99a14efa05618');
    const data = await response.json();
    console.log(data);
}

fetchDummy();