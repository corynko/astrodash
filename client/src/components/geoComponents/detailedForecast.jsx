import { Modal } from "@mui/material";
import { useState } from "react";
import MeteoContext from "../../contexts/meteoContext";

// mui imports
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const createData = (
  hour,
  temperature,
  clouds,
  transparency,
  seeing,
  precipitation
) => {
  return { hour, temperature, clouds, transparency, seeing, precipitation };
};

const rows = [
  createData("hour", 159, 6.0, 24, 4.0),
  createData("avg. temperature", 237, 9.0, 37, 4.3),
  createData("clouds", 262, 16.0, 24, 6.0),
  createData("transparency", 305, 3.7, 67, 4.3),
  createData("seeing", 356, 16.0, 49, 3.9),
];

function DetailedForecastTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>hour</TableCell>
            <TableCell align="center">avg. temp</TableCell>
            <TableCell align="center">cloud cover %</TableCell>
            <TableCell align="center">atmos. transparency</TableCell>
            <TableCell align="center">astro seeing</TableCell>
            <TableCell align="center">precipitation (mm.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.temp}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const DetailedForecast = ({ isOpen, data, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "#00000080",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Fade in={isOpen}>
        <Box sx={style}>
          <div>
            <p className="profileText">Card ID: {data}</p>
            <DetailedForecastTable />
            {/* {data.map((hour, index) => (
              <div key={index}>
                <p>
                  {hour.date}: {hour.value}°F
                </p>
              </div>
            ))} */}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DetailedForecast;
