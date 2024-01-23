import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#006980",
    },
    InputBG: {
      main: "#F8F8F8",
    },
  },
  typography: {
    fontFamily: "Outfit, Arial, sans-serif",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  components: {
    // Override styles for MUI Button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
export default theme;
