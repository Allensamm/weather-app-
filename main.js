const api = {
    key:"b9da5c54d4a0f9950423ed8820a54c1d",
    baseurl:"https://api.openweathermap.org/data/2.5/",
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
const searcbtn = document.querySelector('.btt');

// for the search buttn
searcbtn.addEventListener('click', setQuery=>{
  setQuery.preventDefault();
  getResults(searchbox.value);
  console.log(searchbox.value)
})


// for the enter key
function setQuery(evt){
  if (evt.keyCode == 13){
    getResults(searchbox.value);
    console.log(searchbox.value);
  } 
}



function getResults(query){
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather =>{
    return weather.json();

  }).then(displayResults)
}

function displayResults(weather){
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;


  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now)

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(1)}<span>⁰c</span>`
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}⁰c / ${Math.round(weather.main.temp_max)}⁰c`;
}


function dateBuilder(d){
  let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  let days = ['monday', 'tuesday', 'wednesday', 'thurday', 'friday','saturday'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

