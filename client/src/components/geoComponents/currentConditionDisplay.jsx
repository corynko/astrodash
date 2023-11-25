import { useContext, useState } from "react";
import WeatherContext from "../../contexts/WeatherContext";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

// weather condition icon imports
import sunny from "../../assets/png/weatherCondition/sunny_trans.png";
import clear from "../../assets/png/weatherCondition/clear_trans.png";
import partlyCloudyDay from "../../assets/png/weatherCondition/partly_cloud_day_trans.png";
import partlyCloudyNight from "../../assets/png/weatherCondition/partly_cloudy_night_trans.png";
import cloudy from "../../assets/png/weatherCondition/cloudy_trans.png";
import rainy from "../../assets/png/weatherCondition/rainy_trans.png";
import snowy from "../../assets/png/weatherCondition/snowing_trans.png";

const WeatherCondition = ({ isDay }) => {
  const { weatherData } = useContext(WeatherContext);
  const conditionCode = weatherData?.current.condition.code;

  const getImageForCondition = (code, dayTime) => {
    // console.log(isDay);

    // day time conditions
    const dayConditions = {
      1000: sunny, // Sunny
      1003: partlyCloudyDay, // Partly Cloudy
      1009: cloudy, // Overcast
      1030: partlyCloudyDay, // Mist
      1006: cloudy, // Cloudy
    };

    // night time conditions
    const nightConditions = {
      1000: clear, // Clear
      1003: partlyCloudyNight, // Partly Cloudy
      1009: cloudy, // Overcast
      1030: partlyCloudyNight, // Mist
      1006: cloudy, // Cloudy
    };

    // rainy conditions can be same for day and night
    const rainyConditions = [
      1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276,
      1279,
    ];

    // snowy conditions can be same for day and night
    const snowyConditions = [
      1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,
    ];

    // check for rainy conditions
    if (rainyConditions.includes(code)) {
      return rainy;
    }

    // check for snowy conditions
    if (snowyConditions.includes(code)) {
      return snowy;
    }

    // use the appropriate condition object based on day or night
    const conditions = dayTime ? dayConditions : nightConditions;

    // return the icon based on the condition code, or a default icon if not found
    const conditionImage = conditions[code] || (dayTime ? sunny : clear);
    // console.log(isDay, code, conditionImage); // Log to see if everything is working correctly
    return conditionImage;
  };

  const conditionImage = getImageForCondition(conditionCode, isDay);

  return (
    <img
      className="conditionImg"
      src={conditionImage}
      alt={`Weather condition: ${conditionCode}`}
    />
  );
};

function ConditionDisplay({ isDay }) {
  const { weatherData } = useContext(WeatherContext);
  if (!weatherData) return null;
  const conditionText = weatherData?.current.condition.text;
  const currentTemp = weatherData?.current.feelslike_f;

  if (!weatherData) return null;
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

  const conditionTextLower = conditionText.toLowerCase();

  return (
    <motion.div
      initial="start"
      animate="finished"
      variants={divVariants}
      className="flex column m25 center"
    >
      <h4 className="profileText textCenter">
        it feels like {currentTemp}° fahrenheit
      </h4>
      <WeatherCondition isDay={isDay} />
      <h4 className="profileText textCenter">
        right now, it's {conditionTextLower}
      </h4>
    </motion.div>
  );
}

export default ConditionDisplay;
