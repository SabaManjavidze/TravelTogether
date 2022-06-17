import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import SearchPage from "./Pages/SearchPage";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./Components/NavBar";
import { blue, cyan, deepPurple, purple } from "@mui/material/colors";
import MyBookingsPage from "./Pages/MyBookingsPage";
import MyGuestsPage from "./Pages/MyGuestsPage";

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
  const fake_user = {
    first_name: "John",
    last_name: "Doe",
  };
  useEffect(() => {
    const last_theme: any = localStorage.getItem("theme");

    if (last_theme && last_theme !== mode) {
      setMode(last_theme);
    }
  }, []);
  // const fake_user = undefined;
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
              <Route
                path="/"
                element={
                  <Navigate to={fake_user ? "/search" : "/login"} replace />
                }
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/mybookings" element={<MyBookingsPage />} />
              <Route path="/myguests" element={<MyGuestsPage />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
