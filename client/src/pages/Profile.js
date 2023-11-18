import { useState } from "react";
import { motion } from "framer-motion";

import { WeatherProvider } from "../contexts/WeatherContext";
import SearchForm from "../components/geoComponents/searchForm";
import MoonDisplay from "../components/geoComponents/moonDisplay";
import ConditionDisplay from "../components/geoComponents/currentConditionDisplay";
import ForecastDisplay from "../components/geoComponents/forecastDisplay";

export default function Profile() {
  const [isDay, setIsDay] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const currentLocationName = weatherData?.location.name;
  const currentLocationRegion = weatherData?.location.region;
  const currentLocationCountry = weatherData?.location.country;

  const paddingTopStyle = weatherData ? { paddingTop: "20vh" } : {};

  let divVariants = {
    start: { opacity: 0 },
    finished: {
      opacity: 1,

      transition: {
        duration: 1.3,
        ease: "easeOut",
        staggerChildren: 0.5,
      },
    },
  };
  console.log(weatherData);

  return (
    <>
      <div className="profileCoverImg" />
      <WeatherProvider value={{ weatherData, setWeatherData }}>
        <div
          className="flex column center profileCoverPage"
          style={paddingTopStyle}
        >
          {!currentLocationName && (
            <h1 className="homeHeader textCenter stroke25">your dashBoard</h1>
          )}
          {!currentLocationName && (
            <h4 className="homeHeader m25 textCenter stroke25">
              get started with a weather forecast using the search bar below
            </h4>
          )}
          <div className="flex column center">
            <SearchForm setIsDay={setIsDay} />
            {currentLocationName && (
              <motion.h2
                variants={divVariants}
                initial="start"
                animate="finished"
                style={{ color: "#dde2f8" }}
                className="textCenter"
              >
                {currentLocationName}, {currentLocationRegion},{" "}
                {currentLocationCountry}
              </motion.h2>
            )}
            <div className="flex center">
              {weatherData && <MoonDisplay />}
              {weatherData && <ConditionDisplay isDay={isDay} />}
            </div>
            {weatherData && <ForecastDisplay />}
          </div>
        </div>
      </WeatherProvider>
    </>
  );
}
