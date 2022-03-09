const searchBtn = document.getElementById('search-btn');
const API_Key = "Your Api Key";
const cityName = document.getElementById('city_name');
const temperature = document.getElementById('temperature');
const weatherType = document.getElementById("weatherType");


searchBtn.addEventListener('click', function(){
    const searchText = document.getElementById('text-field').value;
    getLocationFromText(searchText).then(
        data=>{
            const {name, lat, lon} = data[0];
            getWeatherReport(lat, lon);
            cityName.innerText = name;
        }
    );
})

async function getLocationFromText(text){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=1&appid=${API_Key}`);
    const data = response.json();
    return data;
}

async function getWeatherReport(lat, lon){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}&units=metric `);
    const data = response.json().then(
        data => {
            const {main, weather} = data;
            temperature.innerText = main.temp;
            weatherType.innerText = weather[0].main;
        }
    );
}
