let key = 'ee5540aedbbf40ca93d170220260202';

const getWeather = async () => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=ambur&key=${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    renderSearchUI(data.location.name, data.location.region, data.location.country,data.current.condition.text,data.current.condition.icon,data.current.temp_c,data.current.feelslike_c,data.current.humidity,data.current.wind_kph);
    console.log(data)
}

const renderSearchUI =(placeName,placeRegion,placeCountry,placeCondition,imageLink,placeCurrentTemp,placeFeelsLikeTemp, placeHumidity,placeWind)=>{
    const name = document.querySelector('.placeName');
    const region = document.querySelector('.placeRegion');
    const country = document.querySelector('.placeCountry');
    const condition = document.querySelector('.placeCondition');
    const conditionImage = document.querySelector('.placeConditionImage');
    const currentTemp = document.querySelector('.currentTemp');
    const feelsLikeTemp = document.querySelector('.feelsLikeTemp');
    const currentHumidity = document.querySelector('.currentHumidity');
    const currentWind = document.querySelector('.currentWind');

    name.textContent = placeName;
    region.textContent = `${placeRegion},`;
    country.textContent = `${placeCountry}.`;
    condition.textContent = placeCondition;
    conditionImage.src = imageLink;
    currentTemp.textContent = `${placeCurrentTemp}\u00B0C`;
    feelsLikeTemp.textContent = `${placeFeelsLikeTemp}\u00B0C`;
    currentHumidity.textContent = `${placeHumidity}%`;
    currentWind.textContent = `${placeWind} km/hr`;

}

getWeather();