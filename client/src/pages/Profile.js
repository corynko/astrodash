import { useState } from "react";

import SearchForm from "../components/geoComponents/searchForm";
import MoonDisplay from "../components/geoComponents/moonDisplay";
import ForecastDisplay from "../components/geoComponents/forecastDisplay";
import CurrentWeatherDisplay from "../components/geoComponents/currentWeatherDisplay";

export default function Profile() {
  const [currentMoonPhase, setCurrentMoonPhase] = useState("");
  const [currentMoonIllumination, setCurrentMoonIllumination] = useState("");
  // console.log(currentMoonPhase, currentMoonIllumination);

  return (
    <div className="flex column center relative coverPage profileCoverImg">
      <h1 className="homeHeader stroke25">your dashBoard</h1>
      <h4 className="homeHeader m25 stroke25">
        get started with a weather forecast using the search bar below
      </h4>
      <div className="flex column center">
        <SearchForm
          setCurrentMoonPhase={setCurrentMoonPhase}
          setCurrentMoonIllumination={setCurrentMoonIllumination}
        />
        <div className="flex center">
          {currentMoonPhase && (
            <MoonDisplay
              moonPhase={currentMoonPhase}
              moonIllumination={currentMoonIllumination}
            />
          )}
          <ForecastDisplay />
          <CurrentWeatherDisplay />
        </div>
      </div>
    </div>
  );
}
