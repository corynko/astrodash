import { useContext } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import { startOfDay, isSameDay } from "date-fns";

// context imports
import MeteoContext from "../../contexts/meteoContext";
import WeatherContext from "../../contexts/WeatherContext";

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
            <TableCell align="center">avg. temp</TableCell>
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
  if (!isOpen || !meteoData || !weatherData || !cardId) {
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

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Fade in={isOpen} {...(isOpen ? { timeout: 500 } : {})}>
        <Box sx={style}>
          <div>
            <p className="textCenter detailedForecastDate">Card ID: {cardId}</p>
            <DetailedForecastTable hourlyData={slicedHourlyData} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DetailedForecast;
