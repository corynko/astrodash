import { useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";

// context imports
import { WeatherProvider } from "../contexts/WeatherContext";
import { MeteoProvider } from "../contexts/meteoContext";
import { DetailedHourlyProvider } from "../contexts/detailedHourlyContext";

// tab imports
import ForecastTab from "../components/profileTabs/ForecastTab";
import { DashboardTab } from "../components/profileTabs/DashboardTab";
import { NavigationTab } from "../components/profileTabs/NavigationTab";
import { UtilitiesTab } from "../components/profileTabs/UtilitiesTab";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [meteoData, setMeteoData] = useState(null);
  const [detailedHourly, setDetailedHourly] = useState(null);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // console.log(weatherData);

  return (
    <>
      <div className="profileCoverImg" />
      <WeatherProvider value={{ weatherData, setWeatherData }}>
        <MeteoProvider value={{ meteoData, setMeteoData }}>
          <DetailedHourlyProvider value={{ detailedHourly, setDetailedHourly }}>
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
          </DetailedHourlyProvider>
        </MeteoProvider>
      </WeatherProvider>
    </>
  );
}
