         var name= ``;
         function fetchLocLat(str) {
             let place= document.getElementById("loc").value;

             if ( place.trim() == ""){
                 alert("Please Enter a Location before searching !!");
                 document.getElementById("loc").value= "";
                 return;
             }
             let apiKey= "dd14a6b1b2d175bedd12c8e155e668cb";
             let req= new XMLHttpRequest();

             req.open("GET",`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`, true);

             req.onreadystatechange= function() {
                 if ( this.status > 200 ){
                     alert("Entered Invalid Location !!");
                     document.getElementById("loc").value= "";
                     return;
                 }
                 if ( this.readyState == 4 && this.status == 200) {
                     let metaData= JSON.parse(this.responseText);

                     console.log(metaData);

                     
                     let T_place= place;
                     T_place= T_place.toLowerCase();
                     T_place= T_place.charAt(0).toUpperCase()+ T_place.substring(1);
                     name+= `${T_place}, ${metaData.sys.country}`;
                     T_place="";

                     lon= metaData.coord.lon;
                     lat= metaData.coord.lat;

                     fetchData(`${str}`, lat, lon);
                 }
                }
             req.send();
         }