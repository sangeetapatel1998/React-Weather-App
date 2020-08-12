import React, { useState } from 'react';

//API
const api={
  key:"74a896ba81496c2eae65194d6feddd4f",
  url:"http://api.openweathermap.org/data/2.5/"
}

function App() {

  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState({});

  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${api.url}weather?q=${query}&appid=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  } 

  const dateBuilder=(d)=>{
    let months=["january","feb","march","april","may","june","july","aug","sept","oct","nov","dec"];
    let days=["sunday","monday","tuesday","wednesday","thusday","friday","saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return`${day} ${date} ${month} ${year}`

  }
  return (
    <div classname={(typeof weather.main !="undefined") ? ((weather.main.temp > 16)?'pic3':'pic1'):'pic1'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search" onChange={e=>setQuery(e.target.value)} value={query} 
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main!="undefined")?(
          <div>
          <div classNmae="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
           <div className="date">{dateBuilder(new Date())}</div>
           </div>
           <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}</div>
           <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
         ):('')}
      </main>
    </div>
  )
}

export default App;
