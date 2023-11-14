import { motion } from "framer-motion";

// weather condition icon imports
import sunny from "../../assets/png/weatherCondition/sunny_trans.png";
import clear from "../../assets/png/weatherCondition/clear_trans.png";
import partlyCloudyDay from "../../assets/png/weatherCondition/partly_cloud_day_trans.png";
import partlyCloudyNight from "../../assets/png/weatherCondition/partly_cloudy_night_trans.png";
import cloudy from "../../assets/png/weatherCondition/cloudy_trans.png";
import rainy from "../../assets/png/weatherCondition/rainy_trans.png";
import snowing from "../../assets/png/weatherCondition/snowing_trans.png";

const WeatherCondition = ({ code, isDay }) => {
  const getImageForCondition = (conditionCode, dayTime) => {
    // Day time conditions
    const dayConditions = {
      1000: sunny, // Sunny
      1003: partlyCloudyDay, // Partly Cloudy
      1009: partlyCloudyDay, // Partly Cloudy
      1030: partlyCloudyDay, // Partly Cloudy
      1006: cloudy, // Cloudy
    };

    // Night time conditions
    const nightConditions = {
      1000: clear, // Clear
      1003: partlyCloudyNight, // Partly Cloudy
      1009: partlyCloudyNight, // Partly Cloudy
      1030: partlyCloudyNight, // Partly Cloudy
      1006: cloudy, // Cloudy
    };

    // Rainy conditions can be same for day and night
    const rainyConditions = [
      1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276,
      1279,
    ];

    // Snowy conditions can be same for day and night
    const snowyConditions = [
      1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258,
    ];

    // Check for rainy conditions
    if (rainyConditions.includes(conditionCode)) {
      return rainy;
    }

    // Check for snowy conditions
    if (snowyConditions.includes(conditionCode)) {
      return snowing;
    }

    // Use the appropriate condition object based on day or night
    const conditions = dayTime ? dayConditions : nightConditions;

    // Return the icon based on the condition code, or a default icon if not found
    return conditions[conditionCode] || (dayTime ? sunny : clear);
  };

  const conditionImage = getImageForCondition(code, isDay);
  //   console.log(isDay, code, conditionImage); // Log to see if everything is working correctly

  return (
    <img
      className="conditionImg"
      src={conditionImage}
      alt={`Weather condition: `}
    />
  );
};

function ForecastDisplay({ conditionCode, conditionText, currentTemp, isDay }) {
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
      <h4 className="profileText">it feels like {currentTemp}° fahrenheit</h4>
      <WeatherCondition code={conditionCode} isDay={isDay} />
      <h4 className="profileText">right now, it's {conditionTextLower}</h4>
    </motion.div>
  );
}

export default ForecastDisplay;
