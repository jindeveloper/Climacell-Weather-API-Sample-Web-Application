//put your API key here and your all set.
const api_key = '',
    url = 'https://api.climacell.co/v3/weather/forecast/daily',
    nav = navigator.geolocation;

let lat = 0.0,
    lon = 0.0,
    unit_system = 'si',
    start_time = 'now',
    fields = ['humidity', 'temp', 'weather_code'],
    requesturl = "";

if (nav) {
    nav.getCurrentPosition((position) => {
        let coordinates = position.coords;
        lat = coordinates.latitude;
        lon = coordinates.longitude;
        requesturl = encodeURI(`${url}?lat=${lat}&lon=${lon}&unit_system=${unit_system}&start_time=${start_time}&fields=${fields.join(',')}&apikey=${api_key}`);
        getWeatherForeCast();
    });
}

async function getWeatherForeCast() {
    
    const response = await fetch(requesturl, { "method": "GET", "headers": {} });
    
    const json = await response.json();
    
    showFirstDetails(json[0]);

    showDetails(json);
}

function showDetails(weatherInfos) {
    
    for (let counter = 1; counter < 8; counter++){
        document.querySelector("#date" + (counter)).innerHTML =
            showDays(new Date(weatherInfos[counter].observation_time.value).getDay());
        
        document.querySelectorAll("#firstGroup tr td")[counter-1].classList.add(weatherInfos[counter].weather_code.value); 
        
    }

    for (let counter2 = 8; counter2 < weatherInfos.length; counter2++) {
        document.querySelector("#date" + (counter2)).innerHTML =
            showDays(new Date(weatherInfos[counter2].observation_time.value).getDay());

        document.querySelectorAll("#secondGroup tr td")[counter2 - 8].classList.add(weatherInfos[counter2].weather_code.value);

    }
}

function showDays(value) {
    
    let day = "";

    switch (value) {
        case 0:
            day = "Su";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Th";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
            break;
    }

    return day;
}


function showFirstDetails(weatherInfo) {
    
    const   doc = document,
            weatherCode = doc.querySelector('#weather_code'),
            tempHigh = doc.querySelector('#tempHigh'),
            tempLow = doc.querySelector('#tempLow'),
            humidityPercentageHigh = doc.querySelector('#humidityPercentageHigh'),
            humidityPercentageLow = doc.querySelector("#humidityPercentageLow"),
            currentDateRequest = doc.querySelector('#currentDateRequest'),
            weather_code_string = doc.querySelector("#weather_code_string");

    let firstInfo = weatherInfo;

    if (firstInfo) {
        weatherCode.classList.add(firstInfo.weather_code.value);
        tempHigh.innerHTML = firstInfo.temp[1].max.value + "°" + firstInfo.temp[1].max.units;
        tempLow.innerHTML = firstInfo.temp[0].min.value + "°" + firstInfo.temp[0].min.units;
        humidityPercentageHigh.innerHTML = firstInfo.humidity[1].max.value + firstInfo.humidity[1].max.units;
        humidityPercentageLow.innerHTML = firstInfo.humidity[0].min.value + firstInfo.humidity[0].min.units;
        currentDateRequest.innerHTML = new Date(firstInfo.observation_time.value).toDateString();
        weather_code_string.innerHTML = firstInfo.weather_code.value;
    }
}
