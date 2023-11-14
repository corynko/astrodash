import { motion } from "framer-motion";

// weather condition icon imports
import sunny from "../../assets/png/weatherCondition/sunny_trans.png";
// import clear from "../../assets/png/weatherCondition/clear_trans.png";
import partlyCloudyDay from "../../assets/png/weatherCondition/partly_cloud_day_trans.png";
// import partlyCloudyNight from "../../assets/png/weatherCondition/partly_cloudy_night_trans.png";
import cloudy from "../../assets/png/weatherCondition/cloudy_trans.png";
import rainy from "../../assets/png/weatherCondition/rainy_trans.png";
import snowing from "../../assets/png/weatherCondition/snowing_trans.png";

const WeatherCondition = ({ code }) => {
  const getImageForCondition = (conditionCode) => {
    //the following codes are returned from the API and grouped together to minimize icons displayed
    switch (true) {
      case [1000].includes(conditionCode): // Sunny
        return sunny;
      case [1003, 1009, 1030].includes(conditionCode): // Partly Cloudy, Overcast, Mist
        return partlyCloudyDay;
      case [1006, 1135].includes(conditionCode): // Cloudy, Fog
        return cloudy;
      case [
        1063, 1072, 1087, 1150, 1153, 1171, 1180, 1183, 1186, 1189, 1192, 1195,
        1198, 1201, 1240, 1243, 1246, 1273, 1276, 1279,
      ].includes(conditionCode): // Various types of rain
        return rainy;
      case [
        1066, 1069, 1114, 1117, 1147, 1168, 1204, 1207, 1210, 1213, 1216, 1219,
        1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1282,
      ].includes(conditionCode): // Various types of snow
        return snowing;

      default:
        return sunny; // Default icon
    }
  };

  const conditionImage = getImageForCondition(code);

  return (
    <img
      className="conditionImg"
      src={conditionImage}
      alt={`Weather condition: `}
    />
  );
};

function ForecastDisplay({ conditionCode, conditionText, currentTemp }) {
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
      <WeatherCondition code={conditionCode} />
      <h4 className="profileText">right now, it's {conditionTextLower}</h4>
    </motion.div>
  );
}

export default ForecastDisplay;
