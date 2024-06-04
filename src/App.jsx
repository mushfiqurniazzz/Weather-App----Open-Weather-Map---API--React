import styles from "./components/styles/App.module.css"; //importing css for design,
import { useState } from "react"; //importing useState for state variables,
import axios from "axios"; // importing axios for http reqs,
import { Toaster, toast } from "sonner"; //importing sonner for toast notifications

//main functional componenet
function App() {
  //declaring state variables using useState
  const [city, setCity] = useState(""); //cityinput
  const [weather, setWeather] = useState(null); //weather null bool type

  //async await handle search function that checks if the input is valid then uses axios and sonner to complete the task
  const handleSearch = async () => {
    //input field check
    if (!city || city === "") {
      toast.info("Empty search field.");
      return; //return from function
    }
    try {
      //axios get method with the APPID in .env
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_REACT_APP_APPID
        }`
      );
      const data = await res.data;
      setWeather(data); //state variable
      toast.success(`Fetched weather data for ${city}.`);
    } catch (error) {
      //basic error handling
      console.error("Error fetching weather data: ", error);
      toast.error(`Error fetching weather data for ${city}`);
    }
  };

  //ui from here
  return (
    <>
      <Toaster duration={2000} position="top-center" richColors closeButton />
      <div className={styles.App}>
        <h1 className={styles.h1}>
          Weather App - Open Weather Map - API, React
        </h1>
        <hr className={styles.hr} />
        <input
          className={styles.input}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
        {/* conditional rendering, if weather is not null set the weather.name recieved from the api, formula for converting F to C, set the description as the description of the first row recieved from the api */}
        {weather && (
          <div>
            <h2 className={styles.h2}>Weather in {weather.name}</h2>
            <p className={styles.p}>
              Temperature: {Math.round(weather.main.temp - 273.15)}°C
            </p>
            <p className={styles.p}>
              Weather: {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

//exporting the created component function
export default App;
