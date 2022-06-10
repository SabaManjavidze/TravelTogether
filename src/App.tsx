import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import SearchPage from "./Pages/SearchPage";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./Components/NavBar";
import { blue, cyan, deepPurple, purple } from "@mui/material/colors";
import MyBookingsPage from "./Pages/MyBookingsPage";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};
function App() {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [mode, setMode] = useState<"light" | "dark">("light");
  // useEffect(() => {}, []);
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
      }),
    [mode]
  );
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: purple[800],
  //     },
  //     background: {
  //       default: deepPurple[900],
  //     },
  //     mode: "light",
  //   },
  // });
  // useEffect(() => {
  //   console.log(theme);
  // }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <Router>
            <NavBar />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/mybookings" element={<MyBookingsPage />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
