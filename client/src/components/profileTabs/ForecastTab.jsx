import AppBarHeightContext from "../../contexts/AppBarHeightContext";
import MeteoContext from "../../contexts/meteoContext";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import SearchForm from "../../components/geoComponents/searchForm";
import MoonDisplay from "../../components/geoComponents/moonDisplay";
import ConditionDisplay from "../../components/geoComponents/currentConditionDisplay";
import ForecastDisplay from "../../components/geoComponents/forecastDisplay";

const ForecastTab = ({ weatherData }) => {
  const [isDay, setIsDay] = useState("");
  const currentLocationName = weatherData?.location.name;
  const currentLocationRegion = weatherData?.location.region;
  const currentLocationCountry = weatherData?.location.country;
  const day = weatherData?.forecast.forecastday[0].date;

  const appBarHeight = useContext(AppBarHeightContext);
  const coverPageStyle = {
    minHeight: `calc(100vh - ${appBarHeight}px - 150px)`,
  };

  const { meteoData } = useContext(MeteoContext);
  const [setModalData] = useState(null);
  const [setModalOpen] = useState(false);
  const handleViewDetails = (date) => {
    // filter the meteoData for the selected date
    const hourlyData = meteoData.data[0].coordinates[0].dates.filter((d) =>
      d.date.startsWith(date)
    );
    // open the modal and pass the hourlyData to it
    setModalData(hourlyData);
    setModalOpen(true);
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
  console.log(weatherData);
  return (
    <div className="flex column center profileCoverPage" style={coverPageStyle}>
      {!currentLocationName && (
        <h1 className="homeHeader textCenter stroke25">weather center</h1>
      )}
      {!currentLocationName && (
        <h4 className="homeHeader m25 textCenter stroke25">
          get started with the search bar below
        </h4>
      )}

      <div className="flex column center mTop25">
        <SearchForm setIsDay={setIsDay} />
        {currentLocationName && (
          <motion.h2
            variants={divVariants}
            initial="start"
            animate="finished"
            style={{ color: "#dde2f8" }}
            className="textCenter"
          >
            {currentLocationName}, {currentLocationRegion},{" "}
            {currentLocationCountry}
          </motion.h2>
        )}
        <div className="flex center">
          {weatherData && <MoonDisplay />}
          {weatherData && <ConditionDisplay isDay={isDay} />}
        </div>
        {weatherData && (
          <Button
            sx={{ fontSize: "16px" }}
            onClick={() => handleViewDetails(day.date)}
          >
            view today's forecast
          </Button>
        )}
        {weatherData && <ForecastDisplay />}
        {!currentLocationName && (
          <h6
            style={{ maxWidth: "60vw" }}
            className="homeHeader m25 textCenter stroke25"
          >
            you can search for a city, address, location, zip code, and more. if
            searching a city, include the state, region, and/or country as well.
          </h6>
        )}
      </div>
    </div>
  );
};

export default ForecastTab;
