import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
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

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: { main: purple[700], dark: purple[800] },
          // primary: { main: "#18A0FB" },
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
    const last_theme: any = localStorage.getItem("theme");

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
