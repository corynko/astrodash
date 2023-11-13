import sunny from "../../assets/png/weatherCondition/sunny_trans.png";
import clear from "../../assets/png/weatherCondition/clear_trans.png";
import partlyCloudyDay from "../../assets/png/weatherCondition/partly_cloudy_day_trans.png";
import partlyCloudyNight from "../../assets/png/weatherCondition/partly_cloudy_night_trans.png";
import cloudy from "../../assets/png/weatherCondition/cloudy_trans.png";
import rainy from "../../assets/png/weatherCondition/rainy_trans.png";
import snowing from "../../assets/png/weatherCondition/snowing_trans.png";
import windy from "../../assets/png/weatherCondition/windy_trans.png";

const WeatherCondition = ({ condition: code, condition: text }) => {
  //   console.log(moonPhase, moonIllumination);
  const getImageForCondition = (condition) => {
    switch (condition) {
      case "Sunny":
        return sunny;
      case "Partly Cloudy":
        return partlyCloudyDay;
      case "Cloudy":
        return cloudy;
      case "Heavy Rain":
        return rainy;
      case "Clear":
        return clear;
      case "Windy":
        return windy;
      case "Blizzard":
        return snowing;
      default:
        return sunny;
    }
  };
};

function ForecastDisplay() {
  return <></>;
}

export default ForecastDisplay;
