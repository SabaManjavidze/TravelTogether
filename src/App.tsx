import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Container,
  createTheme,
  CSSInterpolation,
  ThemeProvider,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import Navigation from "./Components/NavBar/Navigation";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

// extra-small
//  xs: 450,
// small
//  sm: 600,
// medium
//  md: 900,
// large
//  lg: 1200,
// extra-large
//  xl: 1536,
type themeType = "light" | "dark";
function App() {
  const [mode, setMode] = useState<themeType>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const fontStyleOverride: CSSInterpolation = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: mode === "dark" ? "#f4eee6" : "black",
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: { main: purple[700], dark: purple[800] },
          // primary: { main: "#18A0FB" },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              h1: fontStyleOverride,
              h2: fontStyleOverride,
              h3: fontStyleOverride,
              h4: fontStyleOverride,
              h5: fontStyleOverride,
              h6: fontStyleOverride,
              body1: fontStyleOverride,
              body2: fontStyleOverride,
            },
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            xsm: 450,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [mode]
  );
  useEffect(() => {
    const last_theme = localStorage.getItem("theme") as themeType;

    if (last_theme && last_theme !== mode) {
      setMode(last_theme);
    }
  }, []);
  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: "background.paper",
              overflowX: "hidden",
              minHeight: "100vh",
            }}
          >
            <Navigation />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
