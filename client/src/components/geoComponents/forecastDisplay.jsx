import { useContext } from "react";
import WeatherContext from "../../contexts/WeatherContext";
import { motion } from "framer-motion";

// mui imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// weather condition icon imports
import sunny from "../../assets/png/weatherCondition/sunny_trans.png";
import partlyCloudyDay from "../../assets/png/weatherCondition/partly_cloud_day_trans.png";
import cloudy from "../../assets/png/weatherCondition/cloudy_trans.png";
import rainy from "../../assets/png/weatherCondition/rainy_trans.png";
import snowy from "../../assets/png/weatherCondition/snowing_trans.png";

//moon phase png imports
import NewMoon from "../../assets/png/moons/new_moon_trans.png";
import WaxingCrescent from "../../assets/png/moons/waxing_crescent_trans.png";
import FirstQuarter from "../../assets/png/moons/first_quarter_trans.png";
import WaxingGibbous from "../../assets/png/moons/waxing_gibbous_trans.png";
import FullMoon from "../../assets/png/moons/full_moon_trans.png";
import WaningGibbous from "../../assets/png/moons/waning_gibbous_trans.png";
import ThirdQuarter from "../../assets/png/moons/third_quarter_trans.png";
import WaningCrescent from "../../assets/png/moons/waning_crescent_trans.png";

const WeatherCondition = ({ conditionCode }) => {
  const getImageForCondition = (code) => {
    // console.log(isDay);

    // day time conditions
    const dayConditions = {
      1000: sunny, // Sunny
      1003: partlyCloudyDay, // Partly Cloudy
      1009: cloudy, // Overcast
      1030: partlyCloudyDay, // Mist
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
    const conditions = dayConditions;

    // return the icon based on the condition code, or a default icon if not found
    const conditionImage = conditions[code] || sunny;
    // console.log(isDay, code, conditionImage); // Log to see if everything is working correctly
    return conditionImage;
  };

  const conditionImage = getImageForCondition(conditionCode);

  return (
    <img
      className="conditionImg"
      src={conditionImage}
      alt={`Weather condition: ${conditionCode}`}
    />
  );
};

const MoonDisplay = ({ moonPhase, moonIllumination }) => {
  //   console.log(moonPhase, moonIllumination);

  const getImageForPhase = (phase) => {
    switch (phase) {
      case "New Moon":
        return NewMoon;
      case "Waxing Crescent":
        return WaxingCrescent;
      case "First Quarter":
        return FirstQuarter;
      case "Waxing Gibbous":
        return WaxingGibbous;
      case "Full Moon":
        return FullMoon;
      case "Waning Gibbous":
        return WaningGibbous;
      case "Third Quarter":
        return ThirdQuarter;
      case "Waning Crescent":
        return WaningCrescent;
      default:
        return FullMoon;
    }
  };
  const phaseImage = getImageForPhase(moonPhase);

  return (
    <img
      className="moonImg"
      src={phaseImage}
      alt="{`Moon phase: ${moonPhase}`}"
    />
  );
};

const ForecastDisplayCard = ({ day }) => {
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

  return (
    <motion.div variants={divVariants} initial="start" animate="finished">
      <div className="flex between">
        <Card
          className="flex center column textCenter"
          sx={{
            paddingY: "10px",
            paddingX: "10px",
            backgroundColor: "#00000060",
          }}
        >
          <div className="flex between">
            <WeatherCondition conditionCode={day.day.condition.code} />
            <MoonDisplay
              moonPhase={day.astro.moon_phase}
              moonIllumination={day.astro.moon_illumination}
            />
          </div>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              benevolent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </motion.div>
  );
};

function ForecastDisplay() {
  const { weatherData } = useContext(WeatherContext);
  const forecastDays = weatherData?.forecast?.forecastday || [];

  const firstRow = forecastDays.slice(1, 4);
  const secondRow = forecastDays.slice(4, 7);

  return (
    <div>
      <div className="flex wrap between m25 g25 mobileColumn">
        {firstRow.map((day, index) => (
          <ForecastDisplayCard key={index} day={day} />
        ))}
      </div>
      <div className="flex wrap between m25 g25 mobileColumn">
        {secondRow.map((day, index) => (
          <ForecastDisplayCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
}

export default ForecastDisplay;
