import { useState } from "react";

import SearchForm from "../components/geoComponents/searchForm";
import MoonDisplay from "../components/geoComponents/moonDisplay";

export default function Profile() {
  const [currentMoonPhase, setCurrentMoonPhase] = useState("");
  const [currentMoonIllumination, setCurrentMoonIllumination] = useState("");
  // console.log(currentMoonPhase, currentMoonIllumination);

  return (
    <div className="flex column center relative coverPage profileCoverImg">
      <h1 className="homeHeader stroke25">your dashBoard</h1>
      <h4 className="homeHeader m25 stroke25">
        search for a location using the form below
      </h4>
      <div className="flex column center">
        <SearchForm
          setCurrentMoonPhase={setCurrentMoonPhase}
          setCurrentMoonIllumination={setCurrentMoonIllumination}
        />
        {currentMoonPhase && (
          <MoonDisplay
            moonPhase={currentMoonPhase}
            moonIllumination={currentMoonIllumination}
          />
        )}
      </div>
    </div>
  );
}
