import { useState } from "react";
import { motion } from "framer-motion";

import SearchForm from "../components/geoComponents/searchForm";
import MoonDisplay from "../components/geoComponents/moonDisplay";
import ForecastDisplay from "../components/geoComponents/forecastDisplay";

export default function Profile() {
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [currentLocationRegion, setCurrentLocationRegion] = useState("");
  const [currentLocationCountry, setCurrentLocationCountry] = useState("");
  const [currentMoonPhase, setCurrentMoonPhase] = useState("");
  const [currentMoonIllumination, setCurrentMoonIllumination] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [chanceOfRain, setChanceOfRain] = useState("");
  const [chanceOfSnow, setChanceOfSnow] = useState("");
  const [currentConditionCode, setCurrentConditionCode] = useState("");
  const [currentConditionText, setCurrentConditionText] = useState("");

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
    <div className="flex column center relative coverPage profileCoverImg">
      {!currentLocationName && (
        <h1 className="homeHeader stroke25">your dashBoard</h1>
      )}
      {!currentLocationName && (
        <h4 className="homeHeader m25 stroke25">
          get started with a weather forecast using the search bar below
        </h4>
      )}
      <div className="flex column center">
        <SearchForm
          setCurrentLocationName={setCurrentLocationName}
          setCurrentLocationRegion={setCurrentLocationRegion}
          setCurrentLocationCountry={setCurrentLocationCountry}
          setCurrentMoonPhase={setCurrentMoonPhase}
          setCurrentMoonIllumination={setCurrentMoonIllumination}
          setCurrentTemp={setCurrentTemp}
          setChanceOfRain={setChanceOfRain}
          setChanceOfSnow={setChanceOfSnow}
          setCurrentConditionCode={setCurrentConditionCode}
          setCurrentConditionText={setCurrentConditionText}
        />
        {currentLocationName && (
          <motion.h2
            variants={divVariants}
            initial="start"
            animate="finished"
            style={{ color: "white" }}
          >
            {currentLocationName}, {currentLocationRegion},{" "}
            {currentLocationCountry}
          </motion.h2>
        )}
        <div className="flex center">
          {currentMoonPhase && (
            <MoonDisplay
              moonPhase={currentMoonPhase}
              moonIllumination={currentMoonIllumination}
            />
          )}
          {currentConditionCode && (
            <ForecastDisplay
              conditionCode={currentConditionCode}
              conditionText={currentConditionText}
              currentTemp={currentTemp}
              chanceOfRain={chanceOfRain}
              chanceOfSnow={chanceOfSnow}
            />
          )}
        </div>
      </div>
    </div>
  );
}
