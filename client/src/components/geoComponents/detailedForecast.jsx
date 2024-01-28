import { useContext, useEffect } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import { startOfDay, isSameDay } from "date-fns";

// context imports
import MeteoContext from "../../contexts/meteoContext";
import WeatherContext from "../../contexts/WeatherContext";
import DetailedHourlyContext from "../../contexts/detailedHourlyContext";

// mui imports
import { Modal } from "@mui/material";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DetailedForecastTable({ hourlyData }) {
  const tableContainerStyle = {
    maxHeight: "60vh",
    overflow: "auto",
  };

  const { weatherData } = useContext(WeatherContext);

  const timezone = weatherData?.location.tz_id;

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow
            style={{ position: "sticky", top: 0, backgroundColor: "#3E3E3E" }}
          >
            <TableCell>hour</TableCell>
            <TableCell align="center">avg. temp (F)</TableCell>
            <TableCell align="center">feels like</TableCell>
            <TableCell align="center">cloud cover %</TableCell>
            <TableCell align="center">atmos. transparency</TableCell>
            <TableCell align="center">astro seeing</TableCell>
            <TableCell align="center">precipitation (mm.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hourlyData.map((hour, index) => {
            const zonedDate = utcToZonedTime(hour.date, timezone);
            // `for data verification purposes only`
            // const formattedDate = format(zonedDate, "PPPP", {
            //   timeZone: timezone,
            // });
            const formattedHour = format(zonedDate, "h aaa zzz", {
              timeZone: timezone,
            });

            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {formattedHour}
                  {/* for verification uncomment following line */}
                  {/*, on {formattedDate}*/}
                </TableCell>
                <TableCell align="right">{hour.value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const DetailedForecast = ({ isOpen, cardId, onClose }) => {
  const { meteoData } = useContext(MeteoContext);
  const { weatherData } = useContext(WeatherContext);
  const { detailedHourly } = useContext(DetailedHourlyContext);
  console.log(detailedHourly);
  useEffect(() => {
    if (detailedHourly && detailedHourly.data && detailedHourly.data.hourly) {
      // Now that detailedHourly is defined, you can safely access detailedHourly.data.hourly
      // Perform any operations that depend on detailedHourly.data.hourly here
      console.log(
        "Detailed hourly data is now available: ",
        detailedHourly.data.hourly
      );
    }
  }, [detailedHourly]); // This effect will rerun when detailedHourly changes
  if (!detailedHourly || !detailedHourly.data) {
    return <div>Loading detailed hourly data...</div>;
  }

  if (!isOpen || !meteoData || !weatherData || !detailedHourly || !cardId) {
    return null;
  }

  // use the tz_id from weatherData to get the local timezone
  const timezone = weatherData.location.tz_id;

  // convert all dates to the local timezone
  const localHourlyData = meteoData.data[0].coordinates[0].dates.map((hour) => {
    const localDate = utcToZonedTime(hour.date, timezone);
    return {
      ...hour,
      localDate,
    };
  });

  // const detailedFeelsLike = detailedHourly.data.hourly.apparent_temperature;
  // const detailedCloudCover = detailedHourly.data.hourly.cloud_cover;
  // const detailedPrecipitation = detailedHourly.data.hourly.precipitation;

  // return the correct forecast data from the meteo object
  const cardIndex = parseInt(cardId.replace("forecastCard-", ""), 10);

  // find the index of the first hour that matches the local midnight
  const localMidnight = startOfDay(new Date());
  const startIndex = localHourlyData.findIndex((hour) =>
    isSameDay(hour.localDate, localMidnight)
  );

  // adjust cardIndex to find the correct slice based on the local timezone
  const adjustedStartIndex = startIndex + cardIndex * 24;
  const adjustedEndIndex = adjustedStartIndex + 24;
  const slicedHourlyData = localHourlyData.slice(
    adjustedStartIndex,
    adjustedEndIndex
  );

  const localDate =
    slicedHourlyData.length > 0 ? slicedHourlyData[0].localDate : null;

  // Format the local date for display
  const displayDate = localDate
    ? format(localDate, "PPPP", { timeZone: timezone })
    : "";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#00000080",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  //TODO: fix fade not applying to closing the modal
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Fade in={isOpen} {...(isOpen ? { timeout: 500 } : {})}>
        <Box sx={style}>
          <div>
            <p className="textCenter detailedForecastDate">{displayDate}</p>
            <DetailedForecastTable hourlyData={slicedHourlyData} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DetailedForecast;
