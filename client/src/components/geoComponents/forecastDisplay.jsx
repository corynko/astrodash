import { useContext, useState } from "react";
import WeatherContext from "../../contexts/WeatherContext";
import MeteoContext from "../../contexts/meteoContext";
import { motion } from "framer-motion";
import DetailedForecast from "./detailedForecast";

// mui imports
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
  const getImageForPhase = (phase, illumination) => {
    const illum = parseInt(illumination, 10);

    // waxing crescent
    if (phase === "Waxing Crescent" && illum >= 10 && illum <= 40) {
      return WaxingCrescent;
    }

    // waxing crescent, waxing gibbous, or first quarter between 40 and 60%
    if (
      (phase === "Waxing Crescent" ||
        phase === "Waxing Gibbous" ||
        phase === "First Quarter") &&
      illum > 40 &&
      illum <= 60
    ) {
      return FirstQuarter;
    }

    // waxing gibbous between 60 and 90%
    if (phase === "Waxing Gibbous" && illum > 60 && illum < 90) {
      return WaxingGibbous;
    }

    // full moon for >= 90%
    if (illum >= 90) {
      return FullMoon;
    }

    // waning gibbous between 60 and 90%
    if (phase === "Waning Gibbous" && illum >= 60 && illum < 90) {
      return WaningGibbous;
    }

    // waning gibbous, third quarter, or waning crescent between 40 and 60%
    if (
      (phase === "Waning Gibbous" ||
        phase === "Third Quarter" ||
        phase === "Waning Crescent") &&
      illum > 40 &&
      illum <= 60
    ) {
      return ThirdQuarter;
    }

    // waning crescent between 10 and 40%
    if (phase === "Waning Crescent" && illum >= 10 && illum <= 40) {
      return WaningCrescent;
    }

    // new moon for >= 0% and < 10%
    if (illum >= 0 && illum < 10) {
      return NewMoon;
    }

    // default to current moon phase if none of the above conditions are met
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

  const phaseImage = getImageForPhase(moonPhase, moonIllumination);

  return (
    <img
      className="moonImg"
      src={phaseImage}
      alt="{`Moon phase: ${moonPhase}`}"
    />
  );
};

const ForecastDisplayCard = ({
  day,
  isTomorrow,
  indexNumber,
  handleOpenModal,
}) => {
  //date/day of week variables
  const forecastDate = new Date(day.date + "T00:00:00");
  const dayOfWeekIndex = forecastDate.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekName = isTomorrow ? "Tomorrow" : daysOfWeek[dayOfWeekIndex];
  const dayOfWeekLower = dayOfWeekName.toLowerCase();
  const dateOptions = { month: "long", day: "numeric" };
  const dateWithoutYear = forecastDate.toLocaleDateString("en-US", dateOptions);
  const dateWithoutYearLower = dateWithoutYear.toLowerCase();

  //general weather variable
  const conditionTextLower = day.day.condition.text.toLowerCase();
  const moonIllumination = day.astro.moon_illumination;
  const highTemp = day.day.maxtemp_f;
  const lowTemp = day.day.mintemp_f;

  const handleViewDetails = () => {
    // filter the meteoData for the selected date
    handleOpenModal(`forecastCard-${indexNumber}`, { indexNumber });
  };

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
    <motion.div
      variants={divVariants}
      initial="start"
      animate="finished"
      id={`forecastCard-${indexNumber}`}
    >
      <div className="flex between">
        <Card
          className="flex center column textCenter"
          sx={{
            paddingY: "10px",
            paddingX: "10px",
            backgroundColor: "#00000060",
            minWidth: "300px",
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
              className="mobileColumn"
              gutterBottom
            >
              <>
                {conditionTextLower}, <br /> {moonIllumination}% illumination
              </>
            </Typography>
            <Typography variant="h5" component="div">
              {dayOfWeekLower}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {dateWithoutYearLower}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 19 }}>
              high temp: {highTemp}°f
              <br />
              low temp: {lowTemp}°f
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleViewDetails}>
              view detailed forecast
            </Button>
          </CardActions>
        </Card>
      </div>
    </motion.div>
  );
};

function ForecastDisplay() {
  const { weatherData } = useContext(WeatherContext);
  const forecastDays = weatherData?.forecast?.forecastday || [];

  const slicedForecastDays = forecastDays.slice(1, 7);

  const firstRow = slicedForecastDays.slice(0, 3);
  const secondRow = slicedForecastDays.slice(3, 6);

  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (cardId, indexNumber) => {
    // Here you can fetch the data based on cardId
    // For now, we'll just pass the cardId to the modal
    const index = indexNumber;
    setModalData(cardId);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex wrap between m25 g25 wideMobileColumn">
        {firstRow.map((day, index) => (
          <ForecastDisplayCard
            key={day.date}
            day={day}
            isTomorrow={index === 0}
            indexNumber={index + 1}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
      <div className="flex wrap between m25 g25 wideMobileColumn">
        {secondRow.map((day, index) => (
          <ForecastDisplayCard
            key={day.date}
            day={day}
            indexNumber={index + 4}
            handleOpenModal={handleOpenModal}
          />
        ))}
        <DetailedForecast
          isOpen={modalOpen}
          data={modalData}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default ForecastDisplay;
