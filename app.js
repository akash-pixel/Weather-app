window.addEventListener('load', ()=> {
  let long, lat;
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimezone = document.querySelector('.location-timezone')
  let icon = document.getElementById('icon');
  let degreeSection = document.querySelector('.degree-section')
  let degreeSpan = document.querySelector('.degree-section span')
  
  if( navigator.geolocation){
    navigator.geolocation.getCurrentPosition( position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //  Api 
      const url = `https://api.weatherapi.com/v1/current.json?key=989627a619b0419994e54516221805&q=${lat},${long}&aqi=no`;

      fetch(url)
        .then(res => { return res.json(); })
        .then( data =>{
          const {current} = data;
          temperatureDegree.textContent = current.temp_f;
          temperatureDescription.textContent = current.condition.text
          locationTimezone.textContent = data.location.tz_id;
          icon.src=current.condition.icon

          degreeSection.addEventListener('click',()=>{
            if(degreeSpan.textContent === 'F'){
              temperatureDegree.textContent = current.temp_c;
              degreeSpan.textContent = "C"
            } else {
              temperatureDegree.textContent = current.temp_f;
              degreeSpan.textContent = "F"
            }
          })
        })

    })
  }
})