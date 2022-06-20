import {
  Grid,
  TextField,
  Button,
  useTheme,
  InputAdornment,
  makeStyles,
  Autocomplete,
  Typography,
} from "@mui/material";
import React, { FormEvent, useCallback, useState } from "react";
import "../App.css";
import axios, { AxiosError } from "axios";
import { debounce } from "lodash";

export default function SearchBar({ navigate }: any) {
  const params = new URLSearchParams(window.location.search);
  const location_param = params.get("location") || "";
  const check_in = params.get("checkIn") || "";
  const check_out = params.get("checkOut") || "";
  const [checkIn, setCheckIn] = useState(check_in);
  const [checkOut, setCheckOut] = useState(check_out);
  const [location, setLocation] = useState(location_param);
  const [searchData, setSearchData] = useState<any>([]);
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
  const getAutoCompleteData = async (value: string) => {
    const apiKey = process.env.REACT_APP_AUTOCOMPLETE_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${apiKey}`;
    const { data } = await axios.get(url);
    setSearchData(data.features);
  };
  const debouncedGetAutoCompleteData = useCallback(
    debounce(getAutoCompleteData, 350),
    []
  );

  return (
    <Grid
      container
      component={"form"}
      onSubmit={handleSubmit}
      // mt={5}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 5,
          [theme.breakpoints.down("md")]: {
            mr: 0,
          },
        }}
      >
        <Autocomplete
          getOptionLabel={(option) => {
            return (searchData.length > 0 &&
              option &&
              (option as any).properties.result_type === "city") ||
              (option as any).properties.result_type === "suburb" ||
              (option as any).properties.result_type === "postcode"
              ? (option as any).properties.city
              : "";
          }}
          freeSolo
          options={searchData}
          className="search-input"
          aria-expanded={true}
          renderOption={(props, option): any => (
            <li
              {...props}
              key={(option as any).properties.lat}
              style={{
                flex: "1 1 auto",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "20px" }}>
                {(option as any).properties.city}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: theme.palette.text.secondary,
                  marginLeft: 5,
                }}
              >
                {(option as any).properties.address_line2}
                {", " + (option as any).properties.address_line1}
              </div>
            </li>
          )}
          renderInput={(params: any) => (
            <TextField
              {...params}
              value={location}
              placeholder="Search location"
              onChange={async (e) => {
                const value = e.target.value;
                if (value.length === 0) {
                  setSearchData([]);
                  setLocation("");
                  return;
                }
                setLocation(value);
                debouncedGetAutoCompleteData(value);
                // console.log(data.features[0].properties.name);
              }}
              name="location"
              sx={{
                width: 400,
                m: 0,
                [theme.breakpoints.down("lg")]: { width: 220 },
                [theme.breakpoints.down("md")]: { width: 300 },
              }}
            />
          )}
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
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        <TextField
          name="check_in"
          label="Check in"
          type="date"
          value={checkIn}
          onChange={(e: any) => setCheckIn(e.target.value)}
          className={theme.palette.mode === "dark" ? "input-icon" : ""}
          sx={{
            width: 220,
            [theme.breakpoints.down("md")]: {
              mb: 3,
            },
          }}
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
          sx={{
            width: 220,
            ml: 5,

            [theme.breakpoints.down("md")]: { ml: 0 },
          }}
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
          [theme.breakpoints.down("md")]: { ml: 0, width: "50%" },
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
          <Typography textTransform="none" color="white">
            Search
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
