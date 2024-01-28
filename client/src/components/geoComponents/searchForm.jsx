import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { addDays, addHours, formatISO } from "date-fns";

// context imports
import WeatherContext from "../../contexts/WeatherContext";
import MeteoContext from "../../contexts/meteoContext";
import DetailedHourlyContext from "../../contexts/detailedHourlyContext";

// mui imports
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";

const SearchForm = ({ setIsDay }) => {
  const { weatherData, setWeatherData } = useContext(WeatherContext);
  const { meteoData, setMeteoData } = useContext(MeteoContext);
  const { detailedHourly, setDetailedHourly } = useContext(
    DetailedHourlyContext
  );
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleLocationSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
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
      // setLoading(false);
    } catch (error) {
      //TODO: add error state to UI
      console.error("Error fetching weather data:", error);
    }
  };

  // console.log(detailedHourly);
  useEffect(() => {
    if (weatherData) {
      try {
        const startDate = weatherData.forecast.forecastday[0].date;
        let endDate = new Date(weatherData.forecast.forecastday[6].date);
        // console.log(endDate);
        endDate = addDays(endDate, 2); // add one day to include the end of the last day
        endDate = addHours(endDate, 7); // add one day to include the end of the last day
        // console.log(endDate);
        const formattedEndDate = formatISO(endDate, { representation: "date" }); // format it as 'YYYY-MM-DD' to match startDate
        // console.log(formattedEndDate);
        const lat = weatherData.location.lat;
        const lon = weatherData.location.lon;
        getMeteoData(lat, lon, startDate, formattedEndDate);
        getDetailedHourly(lat, lon);
      } catch (error) {
        //TODO: add error state to UI
        console.error("Error fetching weather data:", error);
      }
    }
  }, [weatherData]); // only run when weatherData changes

  const getMeteoData = async (lat, lon, startDate, endDate) => {
    const username = process.env.REACT_APP_METEO_USERNAME;
    const password = process.env.REACT_APP_METEO_PASSWORD;
    const timeStep = "PT1H"; // 1 hour time step

    // Format the start and end dates in ISO format (YYYY-MM-DDTHH:mm:ssZ)
    const formattedStartDate = `${startDate}T00:00:00Z`;
    const formattedEndDate = `${endDate}T00:00:00Z`;
    // console.log(formattedStartDate, formattedEndDate);

    // Construct the Meteomatics API URL
    const url = `https://api.meteomatics.com/${formattedStartDate}--${formattedEndDate}:${timeStep}/t_2m:F/${lat},${lon}/json`;

    try {
      // Basic Auth header
      // console.log(lat, lon);
      const auth = btoa(`${username}:${password}`);
      const headers = { Authorization: `Basic ${auth}` };

      // Make the API call
      const response = await axios.get(url, { headers });
      // console.log(response.data);
      // Handle the response data
      setMeteoData(response.data);
    } catch (error) {
      console.error("Error fetching Meteomatics data:", error);
    }
  };

  const getDetailedHourly = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,cloud_cover&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&models=best_match`;
    try {
      const response = await axios.get(url);
      setDetailedHourly(response.data);
    } catch (error) {
      //TODO: add error state to UI
      console.error("Error fetching detailed weather data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // This will log the state after the component has rendered,
    // ensuring that state updates have been processed.
    console.log("Detailed hourly state after update:", detailedHourly);
  }, [detailedHourly]); // Dependency array with detailedHourly ensures that this effect runs after detailedHourly updates
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
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </form>
  );
};

export default SearchForm;
