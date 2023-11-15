import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import WeatherContext from "../../contexts/WeatherContext";

//TODO: Add some form of visual indication that the result is loading upon button click
const SearchForm = ({ setIsDay }) => {
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const [location, setLocation] = useState("");

  const handleLocationSearch = async (event) => {
    event.preventDefault();
    const encodedLocation = encodeURIComponent(location);
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedLocation}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const coords = response.data.features[0].geometry.coordinates;
      console.log(coords);
      getWeatherData(coords[1], coords[0]);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  const getWeatherData = async (lat, lon) => {
    const isDayTime = (localtime) => {
      // extract the hour from the localtime string
      const hour = parseInt(localtime.split(" ")[1].split(":")[0], 10);
      // check if the hour is between 5 AM (06:00) and 6 PM (18:00)
      return hour >= 5 && hour < 18;
    };

    const apiKey = process.env.REACT_APP_WEATHERAPI_KEY;
    const days = 7; // x-day forecast
    const url = `https://api.weatherapi.com/v1/forecast.json`;

    try {
      const response = await axios.get(url, {
        params: {
          key: apiKey,
          q: `${lat},${lon}`,
          days: days,
          aqi: "no",
          alerts: "no",
        },
      });

      //   sets entire object response into weatherData context state
      setWeatherData(response.data);

      //check if localTime is during day or night to pass to forecast's current weather
      const localTime = response.data.location.localtime;

      // set result of daytime check in state
      setIsDay(isDayTime(localTime));

      //   verification console.logs
      //   console.log(currentWeather);
      //   console.log(forecast);
      //   console.log(astronomy);

      //   console.log(response.data);
    } catch (error) {
      //TODO: add error state to UI
      console.error("Error fetching weather data:", error);
    }
  };
  //   console.log(weatherData);

  return (
    <form onSubmit={handleLocationSearch}>
      <TextField
        id="search-bar"
        className="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        label="Search for a Location"
        variant="outlined"
        size="small"
      />
      <IconButton type="submit" aria-label="search" size="large">
        <SearchIcon style={{ fill: "#5f75bf" }} />
      </IconButton>
    </form>
  );
};

export default SearchForm;
