import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import {
  DetailsPage,
  LoginPage,
  MyBookingsPage,
  MyGuestsPage,
  ProfilePage,
  Register,
  SearchPage,
  SearchResultsPage,
} from "../../Pages/index";
import NavBar from "../NavBar";

export default function Navigation() {
  const { isLoggedIn, userLoading }: any = useAuth();
  return (
    <Router>
      <NavBar />
      {userLoading ? null : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}
          >
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/mybookings" element={<MyBookingsPage />} />
            <Route path="/myguests" element={<MyGuestsPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}
