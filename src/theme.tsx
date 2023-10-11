import { createTheme, ThemeOptions } from "@mui/material/styles";

export const theme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#5f75bf",
      contrastText: "#e2e2e2",
    },
    secondary: {
      main: "#9c7ba3",
      contrastText: "#f3f3f3",
    },
    background: {
      default: "#000000",
      paper: "#010101",
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
  typography: {
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
    htmlFontSize: 17,
    h1: {
      fontFamily: "Montserrat",
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
      fontFamily: "Montserrat",
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
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        height: 48,
        padding: "0 30px",
      },
    },
  },
  props: {
    MuiAppBar: {
      color: "default",
    },
  },
  shape: {
    borderRadius: 20,
  },
  spacing: 8.25,
};
