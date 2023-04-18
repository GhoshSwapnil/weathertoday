        let apiKey= "dd14a6b1b2d175bedd12c8e155e668cb";
        const fetchData=(str, latitude, longitude) =>{
             let req= new XMLHttpRequest();
             let apiKey= "dd14a6b1b2d175bedd12c8e155e668cb";
             req.open("GET",`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`, true);
             
             req.onreadystatechange= function() {
                 if ( this.status > 200 ){
                     alert("Invalid Location, Enter a Valid Location");
                     document.getElementById("loc").value= "";
                     return;
                 }
                 if ( this.readyState == 4 && this.status == 200) {
                     document.getElementById("boxx").style.display="block";

                     let metaData= JSON.parse(this.responseText);

                     console.log(`from -> ${str}`);
                     console.log(metaData);

                     temp= `<p id="temppp" style=" opacity:0.8; font-size:4vmax;">
                                 ${Math.round(metaData.current.temp)}<sup style=" opacity:0.6; font-size:2vmax;">°C</sup>
                             </p>`;
                     
                     document.getElementById("currLoc").innerHTML=" ";

                     if ( name == "")
                         document.getElementById("currLoc").innerHTML=`<img src="Image/loc.png" height="30vh" width="30vw">${metaData.timezone}`;
                     else
                         document.getElementById("currLoc").innerHTML=`<img src="Image/loc.png" height="30vh" width="30vw">${name}`;
                     name="";

                     document.getElementById("tempDisp").innerHTML= temp;
                     
                     document.getElementById("mood").innerHTML=`<i>${metaData.daily[0].weather[0].description}</i>`;

                             let img="";
                             let D_N= ( metaData.current.uvi > 0 )? "Day" : "Night"; 
                             let ID= metaData.current.weather[0].id;
                             if  (ID >= 200 && ID < 300){
                                      img= "Image/animated/Thunderstorm.svg";
                             }
                            else if (ID >= 300 && ID < 500 ){
                                     img= "Image/animated/Drizzle.svg";
                            }
                            else if (ID >= 500 && ID < 600 ){
                                 if ( D_N == "Day")
                                     img= "Image/animated/Rain_D.svg";
                                 else
                                     img= "Image/animated/Rain_N.svg";
                            }
                            else if ( ID >= 600 && ID < 700  ){
                                 if ( D_N == "Day")
                                     img= "Image/animated/Snow_D.svg";
                                 else
                                     img= "Image/animated/Snow_N.svg";
                            }
                            else if (ID >= 700 && ID < 800 ){
                                 if ( D_N == "Day")
                                     img= "Image/animated/haze_D.svg";
                                 else
                                     img= "Image/animated/haze_N.svg";
                            }
                            else if ( ID == 800 ){
                                 if ( D_N == "Day")
                                     img= "Image/animated/clear_D.svg";
                                 else
                                     img= "Image/animated/clear_N.svg";
                            }
                            else if ( ID >= 801 && ID < 805 ){
                                 if ( D_N == "Day")
                                     img= "Image/animated/cloud_D.svg";
                                 else
                                     img= "Image/animated/cloud_N.svg";
                            }
                            else{
                                //Noting
                            }
                     document.getElementById("weather").src=`${img}`;
                    // document.getElementById("weather").src="Image/animated/Rain_N.svg";

                     document.getElementById("srchIMG").style.animationPlayState='running';

                     document.getElementById("Cmin").innerHTML=` ${Math.round(metaData.daily[0].temp.min)}<sup style="opacity:0.6; font-size:.8vmax;">°C</sup>`;
                     document.getElementById("Cmax").innerHTML=` ${Math.round(metaData.daily[0].temp.max)}<sup style="opacity:0.6; font-size:.8vmax;">°C</sup>`;

                     let {humidity, uvi}= metaData.current;
                     document.getElementById("Chum").innerText=` ${humidity}%`;
                     document.getElementById("Cpres").innerText=` ${uvi}`;

                     reff= document.getElementById("upComing");
                     let forcast= ``;

                     let day=["SUN", "MON", "TUE","WED","THU","FRI","SAT"];
                     const months= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

                     const d= new Date();
                     i= d.getDay();
                     
                     let dt= d.getDate();
                     let m= d.getMonth()+ 1;
                     let date;
                     if ( dt == 1 || dt == 31){
                             date= dt+"st, "+ months[m-1];
                     }
                     else if ( dt == 2){
                             date= dt+"nd, "+ months[m-1];
                     }
                     else{
                             date= dt+"th, "+ months[m-1];
                     }

                     let ribonInside= document.getElementById("ribon");
                     ribonInside.setAttribute('date', `${date}`);

                     for ( let idx= 0; idx< 8; idx++){
                         if(idx == 0){
                              i= (i+ 1)%7;
                             continue;
                         }
                         else {
                             let img="";
                             let ID= metaData.daily[idx].weather[0].id;
                             if  (ID >= 200 && ID < 300){
                                      img= "Image/animated/Thunderstorm.svg";
                             }
                            else if (ID >= 300 && ID < 500 ){
                                     img= "Image/animated/Drizzle.svg";
                            }
                            else if (ID >= 500 && ID < 600 ){
                                     img= "Image/animated/Rain_D.svg";
                            }
                            else if ( ID >= 600 && ID < 700  ){
                                     img= "Image/animated/Snow_D.svg";
                            }
                            else if (ID >= 700 && ID < 800 ){
                                     img= "Image/animated/Atmosphere_D.svg";
                            }
                            else if ( ID == 800 ){
                                     img= "Image/animated/clear_D.svg";
                            }
                            else if ( ID >= 801 && ID < 805 ){
                                     img= "Image/animated/cloud_D.svg";
                            }
                            else{
                                //Noting
                            }
                            forcast+=`<div class="card">
                                         <p class="day">${day[i]}</p>
                                         <div class="geek">
                                              <img src="${img}">
                                         </div>
                                         <p class="moodC"><i>${metaData.daily[idx].weather[0].main}</i></p>
                                         <div class="dataN" style="margin-top:.5vh;">
                                             <div style="opacity:0.8; font-size:large;">${Math.round(metaData.daily[idx].temp.max)}<sup style="opacity:0.6; font-size:.8vmax;">°C</sup></div>
                                             <div style="opacity:0.8; font-size:large;">${Math.round(metaData.daily[idx].temp.min)}<sup style="opacity:0.6; font-size:.8vmax;">°C</sup></div>
                                         </div>
                                     </div>`
                                     i=( i+ 1)%7;
                         }
                     }
                    reff.innerHTML= forcast;
                   }
                }
                req.send();
            }
         document.getElementById("loc").addEventListener("keyup", (event) => {
             if (event.keyCode === 13){
                fetchLocLat(`from enter`);
             }
        });