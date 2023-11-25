import AppBarHeightContext from "../contexts/AppBarHeightContext";
import { useContext, useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";

// tab imports
import ForecastTab from "../components/profileTabs/ForecastTab";
import { DashboardTab } from "../components/profileTabs/DashboardTab";
import { NavigationTab } from "../components/profileTabs/NavigationTab";
import { UtilitiesTab } from "../components/profileTabs/UtilitiesTab";

// context imports
import { WeatherProvider } from "../contexts/WeatherContext";
import { MeteoProvider } from "../contexts/meteoContext";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [meteoData, setMeteoData] = useState(null);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // console.log(weatherData);

  return (
    <>
      <div className="profileCoverImg" />
      <WeatherProvider value={{ weatherData, setWeatherData }}>
        <MeteoProvider value={{ meteoData, setMeteoData }}>
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
        </MeteoProvider>
      </WeatherProvider>
    </>
  );
}
