
import React, { useState, useEffect } from "react";
import "./App.css";



function App() {
  const today = `${new Date()}`
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("your zipcode");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);



  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations},US&APPID=eee684649ca8f26e54eba6e99b817178&units=imperial`
    )
      .then((response) => {
        if (response.ok) {
          console.log(response.status);
          return response.json();
        } else {
          if (response.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=rML0rGKvx1OxvcE2TUbTZXE5387BnSwilGp2sBvKiMY`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temperature: {weather?.main?.temp}</p>
          <p className="city">Current City: {weather?.name}</p>
          <p className="tempHiLo">Current High/Low: High: {weather?.main?.temp_max}&#176;F Low: {weather?.main?.temp_min}&#176;F</p>
          <p className="currentConditions">Current Conditions: {weather?.weather?.[0]?.description}</p>
          <p className="humidity">Current Humidity: {weather?.main?.humidity}
          </p>
          <p className="feelsLike">Feels like: {weather?.main?.feels_like}&#176;F
          </p>
          <p className="currentDate"> Current Date is {today}
          </p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
