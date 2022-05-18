let long, lat, url;
let temperatureDescription = document.querySelector('.temperature-description')
let temperatureDegree = document.querySelector('.temperature-degree')
let locationTimezone = document.querySelector('.location-timezone')
let icon = document.getElementById('icon');
let degreeSection = document.querySelector('.degree-section')
let degreeSpan = document.querySelector('.degree-section span')

function fillData (data){
  temperatureDegree.textContent = data.current.temp_f;
  temperatureDescription.textContent = data.current.condition.text
  locationTimezone.textContent = data.location.name;
  icon.src=data.current.condition.icon;

  // degreeSection.removeEventListener('click', clickHandler)
  // Adding event listener on temperature
  degreeSection.addEventListener('click', ()=>{
    if(degreeSpan.textContent === '°F'){
      temperatureDegree.textContent = data.current.temp_c;
      degreeSpan.textContent = "°C"
    } else {
      temperatureDegree.textContent = data.current.temp_f;
      degreeSpan.textContent = "°F"
    }
  })
}

// On load listener
window.addEventListener('load', ()=> {
  
  if( navigator.geolocation){
    navigator.geolocation.getCurrentPosition( position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      url = `https://api.weatherapi.com/v1/current.json?key=989627a619b0419994e54516221805&q=${lat},${long}&aqi=no`;
      
      fetch(url)
        .then(res => { return res.json(); })
        .then( data =>{ fillData(data); })
    })
  } else {
    console.log("else");
  }
})

document.querySelector('.search-button').addEventListener('click',()=>{
  let text = document.querySelector('.search-text').value;

  url = `https://api.weatherapi.com/v1/current.json?key=989627a619b0419994e54516221805&q=${text}&aqi=no`;
  fetch(url)
    .then(res => { return res.json(); })
    .then( data =>{ fillData(data); })
    .catch(err => {
      let error = document.querySelector('.error');
      error.innerText = "Please enter a valid city name."
      console.log(err);
      setTimeout(()=>{ error.innerText = " "; }, 3000)
    } )

})


