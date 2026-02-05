let key = 'ee5540aedbbf40ca93d170220260202';
let searchBtn = document.getElementById('searchBtn');
let searchContainer = document.querySelector('.searchContainer');


const getWeather = async (query) => {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${query}&key=${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const data = await response.json();
    if(!response.ok){
        throw new Error(`${data.error.message}`)
    }
    return data;
}

const getSearchedWeather = async () => {
    const initalContainer = document.querySelector('.initalContainer');
    const searchContainer = document.querySelector('.searchContainer');
    const loading = document.querySelector('.loading');
    try {
        const input = document.getElementById('searchWeather');
        const query = input.value.trim();
        if (query.length < 2) {
            alert("City name less then 2 characters");
            return
        } 
            initalContainer.style.display = 'none';
            searchContainer.style.display = 'none';
            loading.style.display = "block";
            const data = await getWeather(query);
           
            
            renderSearchUI(data.location.name, data.location.region, data.location.country, data.current.condition.text, data.current.condition.icon, data.current.temp_c, data.current.feelslike_c, data.current.humidity, data.current.wind_kph);
            console.log(data);
            searchContainer.style.display = 'block';
            input.value = '';

    } catch (error) {
        console.log(error);
        initalContainer.style.display = 'block';
        let p = initalContainer.querySelector('p');
        p.textContent = error.message
    } finally{
         loading.style.display = 'none';
    }
}

const renderSearchUI = (placeName, placeRegion, placeCountry, placeCondition, imageLink, placeCurrentTemp, placeFeelsLikeTemp, placeHumidity, placeWind) => {
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

const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Location is not supported in your browser!"));
        }
        const retrivingLocation = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            resolve({
                latitude: latitude,
                longitude: longitude
            })
        }
        const errorCallback = (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    reject(new Error("User denied the request for geolocation."));
                    break;
                case error.POSITION_UNAVAILABLE:
                    reject(new Error("Location information is unavailable."));
                    break;
                case error.TIMEOUT:
                    reject(new Error("The request to get user location timed out."));
                    break;
                case error.UNKNOWN_ERROR:
                    reject(new Error("An unknown error occurred."));
                    break;
            }
        }
        navigator.geolocation.getCurrentPosition(retrivingLocation, errorCallback);
    })

}


const renderCurrentUI =(name,region,country,link,message)=>{
    const cName = document.querySelector('.cName');
    const currentRegion = document.querySelector('.currentRegion');
    const currentCountry = document.querySelector('.currentCountry');
    const currentConditionImg = document.querySelector('.currentConditionImg');
    const currentConditionMsg = document.querySelector('.currentConditionMsg');

    cName.textContent = name;
    currentRegion.textContent = region;
    currentCountry.textContent = country;
    currentConditionImg.src = link;
    currentConditionMsg.textContent = message;
}

const getCurrentWeather = async () => {
    const loading = document.querySelector('.currentLoading');
    try {
        const cordinates = await getLocation();
        let latLong = `${cordinates.latitude},${cordinates.longitude}`; 
        loading.style.display = "block";
        const currentWeather = await getWeather(latLong);
        console.log(currentWeather);
        renderCurrentUI(currentWeather.location.name,currentWeather.location.region,
        currentWeather.location.country,currentWeather.current.condition.icon,currentWeather.current.condition.text)

    } catch (error) {
        console.log(error);
        let currentWeatherCard = document.querySelector('.currentWeatherCard');
        currentWeatherCard.innerHTML = '';
        let errorMsg = document.createElement('p');
        errorMsg.textContent = error.message;
        currentWeatherCard.append(errorMsg);
    } finally{
        loading.style.display = "none";
    }

}

searchBtn.addEventListener('click', () => {
    getSearchedWeather();
})


getCurrentWeather();