  function getLocation() {
     if (navigator.geolocation) 
         navigator.geolocation.getCurrentPosition(showPosition);
     else
         alert("Location Permission, Not Granted !!");
 } 

 function showPosition(position) {
     console.log(`Latitude -> ${position.coords.latitude}\n Longitude ->  ${position.coords.longitude}`);
     fetchData(`from gprs`, position.coords.latitude, position.coords.longitude);
 }