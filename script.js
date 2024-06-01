let cityname= document.querySelector(".weather_city");
        let dtaeTime= document.querySelector(".weather_date_time");
        let w_forcast=document.querySelector(".weather_forecast");
        let w_icon=document.querySelector(".weather_icon");
        let w_temperature=document.querySelector(".weather_temperature");
        let w_minTem=document.querySelector(".weather_min");
        let w_maxTem=document.querySelector(".weather_max");
        let w_feelLike=document.querySelector(".weather_feels_like")
        let w_wind=document.querySelector(".weather_wind");
        let w_pressure=document.querySelector(".weather_pressure");
        let w_humidity=document.querySelector(".weather_humidity");
        let w_citySearch = document.querySelector(".weather_search");
        const getCountryName=(code)=>{
            return new Intl.DisplayNames([code], {type: "region"}).of(code);
        };
        const getDateTime=(dt)=>{
            
            const curDate=new Date(dt*1000);
            console.log(curDate);
            const options={
                weekday:"long",
                year: "numeric",
                month:"long",
                day:"numeric",
                hour:"numeric",
                minute:"numeric",
            };
            const formatter = new Intl.DateTimeFormat("en-us",options);
            console.log(formatter);
            return formatter.format(curDate);
        };
        let city="Samastipur";
        w_citySearch.addEventListener('submit',(e)=>{
            e.preventDefault();
           let cityname=document.querySelector(".city_name");
           console.log(cityname.value);
           city=cityname.value;
           getweatherData(); 
           cityname.value="";
        });

        const getweatherData= async () =>{
            const weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9f2ab726f95411a4d0fb6b54ea7f6e28`;

            try{
                const res=await fetch(weatherUrl);
                const data=await res.json();
                const { main, name, weather, wind, sys, dt}=data;
                cityname.innerHTML =`${name},${getCountryName(sys.country)}`;
                dtaeTime.innerHTML=getDateTime(dt);
                w_forcast.innerHTML= weather[0].main;
                w_icon.innerHTML =`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
                w_temperature.innerHTML=`${main.temp}&#176`;
                w_minTem.innerHTML=`Min:${main.temp_min.toFixed()}&#176`;
                w_maxTem.innerHTML=`Max:${main.temp_max.toFixed()}&#176`;
                w_feelLike.innerHTML=`Feels Like:${main.feels_like.toFixed()}&#176`;
                w_wind.innerHTML=`Wind:${wind.speed}m/s`;
                w_pressure.innerHTML=`Pressure:${main.pressure}hPa`;
                w_humidity.innerHTML=`Humidity:${main.humidity}%`;
            }catch(error){
                console.log(error);
            }
        };
        window.addEventListener("load",getweatherData);