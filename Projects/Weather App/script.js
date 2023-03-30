const userTab=document.querySelector(".userTab");
const searchTab=document.querySelector(".searchTab");
const searchInput=document.querySelector(".searchInput");
const searchButton=document.querySelector(".searchButton");
const permissionButton=document.querySelector(".permissionButton");
const searchCity=document.querySelector(".searchCity");
const permission=document.querySelector(".permission");
const weatherInfo=document.querySelector(".weatherInfo");
const loading =document.querySelector(".loading");
const city=document.querySelector(".city");
const flag=document.querySelector(".flag");
const condition = document.querySelector(".condition");
const conditionImg = document.querySelector(".conditionImg");
const temp = document.querySelector(".temp");
const dataWind = document.querySelector(".dataWind");
const dataHumid = document.querySelector(".dataHumid");
const dataCloud = document.querySelector(".dataCloud");
const notFound = document.querySelector(".notFound");

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let currentTab=userTab;
userTab.classList.add("currentTab");
getUserWeather();

userTab.addEventListener("click", getUserWeather);
searchTab.addEventListener("click", getSearchWeather);
searchButton.addEventListener("click", ()=>{
    if(searchInput.value){
        searchWeather();
    }
});
permissionButton.addEventListener("click", grantPermission);

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("currentTab");
        clickedTab.classList.add("currentTab");
        currentTab=clickedTab;

        if(!searchCity.classList.contains("active")){
            searchCity.classList.add("active");
            permission.classList.remove("active");
            weatherInfo.classList.remove("active");
        }
        else{
            searchCity.classList.remove("active");
            permission.classList.remove("active");
            weatherInfo.classList.remove("active");
            notFound.classList.remove("active");
        }
    }
}

function getUserWeather(){
    switchTab(userTab);

    const localCoordinates = sessionStorage.getItem("user-coordinates");
    
    if(!localCoordinates){
        permission.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon}=coordinates;
    permission.classList.remove("active");
    loading.classList.add("active");
    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const  data = await response.json();

        loading.classList.remove("active");
        weatherInfo.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loading.classList.remove("active");
        alert("Data Could Not be Accessed");
    }
}

function renderWeatherInfo(data){
    if(data?.name!=undefined){
        city.innerHTML=data?.name;
        flag.src= `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
        condition.innerHTML= data?.weather?.[0]?.description;
        conditionImg.src= `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
        temp.innerHTML=data?.main?.temp + " °C"
        dataWind.innerHTML=data?.wind?.speed + " m/s";
        dataHumid.innerHTML=data?.main?.humidity + " %";
        dataCloud.innerHTML=data?.clouds?.all + " %";
    }
    else{
        weatherInfo.classList.remove("active");
        notFound.classList.add("active");
    }
    

}

function getSearchWeather(){
    switchTab(searchTab);
}

async function searchWeather(){
    let place=searchInput.value;
    loading.classList.add("active");
    notFound.classList.remove("active");

    try{
        const response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loading.classList.remove("active");
        weatherInfo.classList.add("active");
        searchInput.value="";
        renderWeatherInfo(data);
    }
    catch(err){
        loading.classList.remove("active");
        alert("Data Could Not be Found");
    }

}

function grantPermission(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("Geolocation Feature is not Available")
    }
}
function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
