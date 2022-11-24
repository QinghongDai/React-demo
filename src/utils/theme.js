import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const spacing = 8;
const theme = createMuiTheme({
  typography: {
    fontFamily: "News Cycle, sans-serif"
  },
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.9)",
      secondary: "rgba(0, 0, 0, 0.77)",
      grey: "#e3e6e8"
    },
    primary: {
      main: "#00a3ad",
      medium: "#006280",
      dark: "#03536C"
    },
    secondary: {
      main: "#fdcc08",
      dark: "#006280"
    },
    ternary: {
      main: "#fdcc08",
      dark: "#f9ae00"
    },
    error: {
      main: red.A400,
      light: "#FF8768"
    },
    inComplete: "#D2D7DB"
  },
  fonts: {
    color: "rgba(0, 0, 0, 0.87)"
  },
  boldFont: {
    fontWeight: "bold !important"
  },
  section: {
    padding: "30px 20px 30px 20px"
  },
  padding: "15px",
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "1000px"
      }
    }
  },
  paper: {
    marginTop: `${8 * spacing}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: `${spacing}px auto`,
    backgroundColor: "#fdcc08"
  },
  topMargin: {
    marginTop: `${2 * spacing}px`
  }
});

export default theme;
