import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import SearchPage from "./Pages/SearchPage";
import { createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./Components/NavBar";
import { purple } from "@mui/material/colors";
function App() {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  // useEffect(() => {}, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[800],
      },
    },
  });
  // useEffect(() => {
  //   console.log(theme);
  // }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
