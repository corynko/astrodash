import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";

//TODO: Add some form of visual indication that the result is loading upon button click
const SearchForm = ({
  setCurrentMoonPhase,
  setCurrentMoonIllumination,
  setCurrentTemp,
  setCurrentConditionCode,
  setCurrentConditionText,
  setCurrentLocationName,
  setCurrentLocationRegion,
  setCurrentLocationCountry,
  setIsDay,
}) => {
  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [astronomy, setAstronomy] = useState();

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
      // Extract the hour from the localtime string
      const hour = parseInt(localtime.split(" ")[1].split(":")[0], 10);
      // Check if the hour is between 6 AM (06:00) and 6 PM (18:00)
      return hour >= 6 && hour < 18;
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

      //   set weather api response in state for use in front end components
      setCurrentLocationName(response.data.location.name);
      setCurrentLocationRegion(response.data.location.region);
      setCurrentLocationCountry(response.data.location.country);
      setCurrentWeather(response.data.current);
      setForecast(response.data.forecast.forecastday);
      setAstronomy(response.data.forecast.forecastday[0].astro);
      setCurrentMoonPhase(
        response.data.forecast.forecastday[0].astro.moon_phase
      );
      setCurrentMoonIllumination(
        response.data.forecast.forecastday[0].astro.moon_illumination
      );
      setCurrentConditionCode(response.data.current.condition.code);
      setCurrentConditionText(response.data.current.condition.text);
      setCurrentTemp(response.data.current.feelslike_f);

      //check if localTime is during day or night to pass to forecast's current weather
      const localTime = response.data.location.localtime;
      // set result of daytime check in state
      setIsDay(isDayTime(localTime));

      //   verification console.logs
      //   console.log(currentWeather);
      //   console.log(forecast);
      //   console.log(astronomy);
      console.log(response.data);
    } catch (error) {
      //TODO: add error state to UI
      console.error("Error fetching weather data:", error);
    }
  };

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
