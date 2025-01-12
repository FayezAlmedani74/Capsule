import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Cairo, Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
