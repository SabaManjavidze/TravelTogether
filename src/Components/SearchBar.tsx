import {
  Grid,
  TextField,
  Button,
  useTheme,
  InputAdornment,
  makeStyles,
} from "@mui/material";
import React, { FormEvent, useCallback, useState } from "react";
import "../App.css";
import axios, { AxiosError } from "axios";
// import { debounce } from "lodash";

export default function SearchBar({ navigate }: any) {
  const params = new URLSearchParams(window.location.search);
  const location_param = params.get("location") || "";
  const check_in = params.get("checkIn") || "";
  const check_out = params.get("checkOut") || "";
  const [checkIn, setCheckIn] = useState(check_in);
  const [checkOut, setCheckOut] = useState(check_out);
  const [location, setLocation] = useState(location_param);
  const theme = useTheme();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const location = data.get("location");
    const check_in = data.get("check_in");
    const check_out = data.get("check_out");
    if (!location || location === "") {
      alert("Please enter a valid search query");
      return;
    }
    navigate(
      `/search-results?location=${location}&checkIn=${check_in}&checkOut=${check_out}`
    );
  };
  return (
    <Grid
      container
      component={"form"}
      onSubmit={handleSubmit}
      // mt={5}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item sx={{ display: "flex", alignItems: "center", mr: 5 }}>
        <TextField
          className="search-input"
          margin="normal"
          type="text"
          placeholder="Search location"
          value={location}
          onChange={(e) => {
            const { value } = e.target;
            setLocation(value);
          }}
          name="location"
          id="location"
          sx={{
            width: 400,
            m: 0,
            [theme.breakpoints.down("lg")]: { width: 220 },
            [theme.breakpoints.down("md")]: { width: 300 },
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          [theme.breakpoints.down("lg")]: { mt: 4 },
          mt: 0,
          [theme.breakpoints.between("md", "lg")]: { mt: 0 },
        }}
      >
        <TextField
          name="check_in"
          label="Check in"
          type="date"
          value={checkIn}
          onChange={(e: any) => setCheckIn(e.target.value)}
          className={theme.palette.mode === "dark" ? "input-icon" : ""}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="check_out"
          label="Check out"
          type="date"
          className={theme.palette.mode === "dark" ? "input-icon" : ""}
          // inputProps={{
          //   endAdornment: <DateIcon />,
          // }}
          value={checkOut}
          // defaultValue={}
          onChange={(e) => setCheckOut(e.target.value)}
          sx={{ width: 220, ml: 5 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          ml: 5,
          mt: 0,
          [theme.breakpoints.down("lg")]: { width: "100%", mt: 4 },
          // [theme.breakpoints.between("md", "lg")]: { mt: 0 },
          // height: "100%",
        }}
      >
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            [theme.breakpoints.down("lg")]: { width: "100%" },
          }}
          size={"large"}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
