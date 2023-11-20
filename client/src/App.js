//react imports
import React, { useState, useEffect } from "react";
import { AppBarHeight } from "./contexts/useAppBarHeight";

//nav router
import { HashRouter as Router, Route, Routes } from "react-router-dom";

//import page styles
import "./App.css";
import "./index.css";

//import page links
import Nav from "./components/navComponents/Nav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

//mui imports
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  //TODO: Implement optional shooting mode - single color carmine on OLED (ideally) black
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  //ALERT: You may want to minimize the theme while working on this codebase
  const theme = React.useMemo(
    () =>
      createTheme(
        adaptV4Theme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            //dark mode
            primary: {
              main: "#5f75bf",
              contrastText: "#e2e2e2",
            },
            secondary: {
              main: "#9c7ba3",
              contrastText: "#f3f3f3",
            },
            background: {
              default: "#121212",
              paper: "#343434",
            },
            text: {
              primary: "#f3f3f3",
              hint: "#232323",
            },
            error: {
              main: "#93f0de",
            },
            warning: {
              main: "#ffeb99",
            },
            info: {
              main: "#dde2f8",
            },
            success: {
              main: "#a9fdac",
            },
          },
          // palette: {
          //   mode: "shooting",
          //   primary: {
          //     main: "#640202",
          //     contrastText: "rgba(226,226,226,0.31)",
          //   },
          //   secondary: {
          //     main: "#640202",
          //     contrastText: "rgba(243,243,243,0.3)",
          //   },
          //   background: {
          //     default: "#000000",
          //     paper: "#010101",
          //   },
          //   text: {
          //     primary: "#640202",
          //     hint: "#640202",
          //     secondary: "#640202",
          //     disabled: "#640202",
          //   },
          //   error: {
          //     main: "#640202",
          //     contrastText: "rgba(255,255,255,0.49)",
          //   },
          //   warning: {
          //     main: "#640202",
          //     contrastText: "rgba(255,255,255,0.53)",
          //   },
          //   info: {
          //     main: "#640202",
          //     contrastText: "rgba(255,255,255,0.27)",
          //   },
          //   success: {
          //     main: "#640202",
          //     contrastText: "rgba(255,255,255,0.34)",
          //   },
          // },
          typography: {
            fontSize: 16,
            fontWeightLight: 200,
            fontWeightRegular: 300,
            fontWeightMedium: 400,
            fontWeightBold: 600,
            htmlFontSize: 17,
            h1: {
              fontFamily: "GothamBook",
              fontSize: "6rem",
              fontWeight: 200,
              lineHeight: 1.3,
              letterSpacing: "0.1em",
            },
            h2: {
              fontFamily: "Raleway",
              fontSize: "4.3rem",
              fontWeight: 100,
              lineHeight: 1.15,
              letterSpacing: "0.03em",
            },
            h3: {
              fontFamily: "Lato",
            },
            h4: {
              fontFamily: "Work Sans",
              fontWeight: 300,
            },
            subtitle1: {
              fontFamily: "GothamLight",
            },
            subtitle2: {
              fontFamily: "Lato",
              fontSize: "1.1rem",
            },
            body1: {
              fontFamily: "Work Sans",
              fontSize: "1.4rem",
              fontWeight: 200,
            },
            body2: {
              fontFamily: "Lato",
              fontWeight: 500,
              fontSize: "1.3rem",
            },
            button: {
              fontFamily: "Lato",
              fontWeight: 500,
              fontSize: "1.4rem",
              letterSpacing: "0.13em",
            },
            caption: {
              fontFamily: "Work Sans",
              fontSize: "1rem",
            },
            overline: {
              fontFamily: "Lato",
              fontSize: "1.1rem",
              fontWeight: 100,
            },
            h5: {
              fontFamily: "Lato",
              fontSize: "1.8rem",
            },
            h6: {
              fontSize: "1.5rem",
              fontFamily: "Work Sans",
            },
          },
          overrides: {},
          props: {
            MuiAppBar: {
              color: "default",
            },
          },
          shape: {
            borderRadius: 20,
          },
          spacing: 8.25,
        })
      ),

    [prefersDarkMode]
  );

  return (
    <AppBarHeight>
      <Router>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Nav />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </AppBarHeight>
  );
}

export default App;
