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
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import "../../App.css";
import axios, { AxiosError } from "axios";
import { debounce } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GeopifyResponse } from "../../utils/types";
import suggestionRenderItem from "./components/suggestionRenderItem";

// type GeopifyResponse = {
//   options: GeopifyOptions;
// };

export default function SearchBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams(window.location.href);
  const [searchData, setSearchData] = useState<GeopifyResponse[]>([]);
  const location = params.get("location") || "";
  const check_in = params.get("checkIn") || "";
  const check_out = params.get("checkOut") || "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.cancelable = true;
    const data = new FormData(e.currentTarget);
    const location = data.get("location");
    const check_in = data.get("check_in");
    const check_out = data.get("check_out");
    if (location === "") {
      setSearchData([]);
      // setLocation("");
      alert(`${location} Please enter a valid search query`);
      return;
    }
    // setParams(
    //   `/search-results?location=${location}&checkIn=${check_in}&checkOut=${check_out}`
    // );
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
    debounce(getAutoCompleteData, 400),
    []
  );
  const response_type_table = {
    suburb: "Suburb",
    city: "City",
    postcode: "Postcode",
  };
  return (
    <Grid
      container
      component={"form"}
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
      // mt={5}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        [theme.breakpoints.down("lg")]: {
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
          [theme.breakpoints.down("lg")]: {
            mr: 0,
          },
        }}
      >
        <Autocomplete
          getOptionLabel={(option: any) => {
            const { result_type } = option.properties;
            if (result_type in response_type_table) {
              const value = option.properties[result_type];
              return value;
            }
            return "";
          }}
          isOptionEqualToValue={(option, value) => {
            return (
              option.properties.address_line1 === value.properties.address_line1
            );
          }}
          options={searchData}
          className="search-input"
          clearOnBlur={false}
          clearOnEscape={false}
          defaultValue={{
            properties: {
              city: location,
              address_line1: location,
              result_type: "city",
            },
          }}
          renderOption={(props, option) =>
            suggestionRenderItem({ option: option, props: props })
          }
          renderInput={(params: any) => (
            <TextField
              {...params}
              onChange={async (e) => {
                const value = e.target.value;
                if (value.length > 0) {
                  debouncedGetAutoCompleteData(value);
                } else {
                  setSearchData([]);
                }
              }}
              placeholder="Search location"
              name="location"
              sx={{
                width: 400,
                m: 0,
                [theme.breakpoints.down("md")]: { width: 300 },
                [theme.breakpoints.between("md", "lg")]: { mb: 3 },
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
          // defaultValue={check_in}
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
          // defaultValue={check_out}
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
          [theme.breakpoints.down("lg")]: {
            width: "100%",
            mt: 4,
            ml: 0,
            justifyContent: "center",
          },
          [theme.breakpoints.down("md")]: { ml: 0, width: "50%" },
        }}
      >
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            [theme.breakpoints.down("lg")]: { width: "60%" },
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
