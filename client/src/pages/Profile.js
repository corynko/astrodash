import AppBarHeightContext from "../contexts/AppBarHeightContext";
import { useContext, useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

// tab imports
import ForecastTab from "../components/profileTabs/ForecastTab";
import { DashboardTab } from "../components/profileTabs/DashboardTab";
import { NavigationTab } from "../components/profileTabs/NavigationTab";
import { UtilitiesTab } from "../components/profileTabs/UtilitiesTab";

import { WeatherProvider } from "../contexts/WeatherContext";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const appBarHeight = useContext(AppBarHeightContext);
  const coverPageStyle = {
    minHeight: `calc(100vh - ${appBarHeight}px - 150px)`,
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
    <>
      <div className="profileCoverImg" />
      <WeatherProvider value={{ weatherData, setWeatherData }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="flex around"
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="profile tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Dashboard" />
            <Tab label="Forecast" />
            <Tab label="Navigation" />
            <Tab label="Utilities" />
          </Tabs>
        </Box>
        {selectedTab === 0 && <DashboardTab weatherData={weatherData} />}
        {selectedTab === 1 && <ForecastTab weatherData={weatherData} />}
        {selectedTab === 2 && <NavigationTab weatherData={weatherData} />}
        {selectedTab === 3 && <UtilitiesTab weatherData={weatherData} />}
      </WeatherProvider>
    </>
  );
}
