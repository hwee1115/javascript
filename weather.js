const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY="b8ccdda1bf67fbc486218a1dd3b8dcd1";

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
   
}

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function handleGeoSucces(position){
   const latitude= position.coords.latitude;
   const longitude= position.coords.longitude;
   const coordsObj ={
       latitude,
       longitude
   };
   saveCoords(coordsObj);
   
}

function handleGeoError(){
    console.log("cant access geo location");
}

function loadCoords(){
    const loadedcoords = localStorage.getItem(COORDS);
    if(loadedcoords === null){
        askForCoords();
    }else{
        const parsedCoordes = JSON.parse(loadedcoords);
        getWeather(parsedCoordes.latitude, parsedCoordes.longitude);
    }
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}
function init(){
    loadCoords();
}

init();