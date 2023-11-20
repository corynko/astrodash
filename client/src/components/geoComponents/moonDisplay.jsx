import { useContext } from "react";
import WeatherContext from "../../contexts/WeatherContext";
import { motion } from "framer-motion";

//moon phase png imports
import NewMoon from "../../assets/png/moons/new_moon_trans.png";
import WaxingCrescent from "../../assets/png/moons/waxing_crescent_trans.png";
import FirstQuarter from "../../assets/png/moons/first_quarter_trans.png";
import WaxingGibbous from "../../assets/png/moons/waxing_gibbous_trans.png";
import FullMoon from "../../assets/png/moons/full_moon_trans.png";
import WaningGibbous from "../../assets/png/moons/waning_gibbous_trans.png";
import ThirdQuarter from "../../assets/png/moons/third_quarter_trans.png";
import WaningCrescent from "../../assets/png/moons/waning_crescent_trans.png";

const MoonDisplay = () => {
  const { weatherData } = useContext(WeatherContext);
  const moonPhase = weatherData?.forecast.forecastday[0].astro.moon_phase;
  const moonIllumination =
    weatherData?.forecast.forecastday[0].astro.moon_illumination;

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
      className="flex column m25 center"
    >
      <h4 className="profileText textCenter">
        the moon is currently a {moonPhase.toLowerCase()}
      </h4>
      <img
        className="moonImg"
        src={phaseImage}
        alt="{`Moon phase: ${moonPhase}`}"
      />
      <h4 className="profileText textCenter">
        it is {moonIllumination}% illuminated
      </h4>
    </motion.div>
  );
};

export default MoonDisplay;
