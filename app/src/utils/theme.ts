import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6f61",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#ff6f61",
    },
    background: {
      default: "#fad0c4",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    h1: {
      fontFamily: `"Merriweather", serif`,
      color: "#333",
    },
    h3: {
      fontFamily: `"Merriweather", serif`,
      color: "#333",
    },
    h5: {
      fontFamily: `"Ubuntu", sans-serif`,
      color: "#333",
    },
    fontFamily: `"Ubuntu", sans-serif`,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#ff6f61",
          color: "#fff", 
          "&:hover": {
            backgroundColor: "#e65a50",
          },
        },
        outlined: {
          borderColor: "#ff6f61",
          color: "#ff6f61",
          "&:hover": {
            backgroundColor: "rgba(255, 111, 97, 0.1)",
            borderColor: "#e65a50",
          },
        },
      },
    },
  },
});

export default theme;