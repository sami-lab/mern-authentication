import { createTheme } from "@mui/material/styles";

const primaryFont = "Oswald";

const light = "#eee";
const dark = "#000";
const success = "#51A937";
const red = "#780200";
const lightRed = "#FF0000";
const darkGrey = "#222";
// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      red: red,
      lightRed: lightRed,
      dark: dark,
      white: light,
      success: success,
      darkGrey: darkGrey,
    },
    primary: {
      main: red,
    },
    secondary: {
      main: light,
    },
    error: {
      main: red,
    },
  },
  typography: {
    fontFamily: primaryFont,
  },
});

export default theme;
