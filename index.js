const inputTag = document.getElementById('value');
const searchBtn = document.getElementById('search');
const inputArea = document.getElementsByClassName('input_Area')[0];
const resultArea = document.getElementsByClassName('result_Area')[0];
const wheatherImg = document.querySelector('img');
const wheather = document.getElementsByClassName('wheather')[0];
const cityName = document.getElementsByClassName('cityName')[0];
const tempNum = document.getElementsByClassName('num')[0];
const tempNum2 = document.getElementsByClassName('num-2')[0];
const humidityNum = document.getElementsByClassName('humidity_Num')[0];
const info = document.getElementsByClassName('info')[0];
const backBtn = document.getElementById('backBtn');

// console.log(inputArea,searchBtn,inputArea,resultArea);

let apiKey = `dc34bebaa11536bf15c239e25e41db03`;

inputTag.addEventListener("keydown", (e) => {
    // console.log(e.key)
    if(e.key == "Enter" || e.key == "enter"){
        // console.log(inputTag.value);
        if(inputTag.value == ""){
            console.log("first enter the city Name")
        }
        else{
            let value = inputTag.value;
            requestApi(value);
        }
    }
});


searchBtn.addEventListener('click', () => {
    let value = inputTag.value;
    requestApi(value);
});

function requestApi(cityName){
    cityName = cityName.trim();
    info.innerText = `Getting weather details...`
    info.classList.add('pending');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
    fetchData(url);
}

function fetchData(api){

    fetch(api).then((response) => response.json()).then((data) => wheatherDetails(data));
}


function wheatherDetails(data){
    // console.log(data);
    if(data.cod == 404){
        // console.log('city not found');
        info.classList.replace('pending','error')
        info.innerText = `${inputTag.value} isn't a valid city name`;
    }

    let city = data.name;
    let {temp,feels_like,humidity} = data.main;
    let {description, id} = data.weather[0];

    if (id == 800) {
        wheatherImg.src = 'icons/clear.svg';
    }
    else if (id >= 200 && id <= 232) {
        wheatherImg.src = 'icons/strom.svg';
    }
    else if (id >= 600 && id <= 622) {
        wheatherImg.src = 'icons/snow.svg';
    }
    else if (id >= 701 && id <= 781) {
        wheatherImg.src = 'icons/haze.svg';
    }
    else if (id >= 800 && id <= 804) {
        wheatherImg.src = 'icons/cloud.svg';
    }
    else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
        wheatherImg.src = 'icons/rain.svg';
    }

    tempNum.innerText = Math.floor(temp);
    wheather.innerText = description;
    cityName.innerText = city;
    tempNum2.innerText = Math.floor(feels_like);
    humidityNum.innerText = Math.floor(humidity)+ `%`;

    info.classList.remove('pending','error');
    inputArea.classList.remove('active');
    backBtn.classList.add('active');
    resultArea.classList.add('active');
}

backBtn.addEventListener('click', () => {
    inputTag.value = ``;
    backBtn.classList.remove('active');
    resultArea.classList.remove('active');
    inputArea.classList.add('active');

})

