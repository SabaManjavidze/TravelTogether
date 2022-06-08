import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { fake_arr } from "../Components/FakeDB";
import ResultCard from "../Components/ResultCard";
import SearchBar from "../Components/SearchBar";

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const location = params.get("location");
  const check_in = params.get("check_in");
  const check_out = params.get("check_out");
  const [currSortingIdx, setCurrSortingIdx] = useState(0);
  const sort_arr = ["num. of beds", "available", "distance"];
  return (
    <Container sx={{ margin: 5, width: "100%", maxWidth: "90% !important" }}>
      <Box mt={20} ml={15} width={"90%"}>
        <SearchBar navigate={navigate} />
        <Typography component={"h1"} variant={"h2"} mt={10}>
          Results for {location?.toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            overflowX: "auto",
            whiteSpace: "nowrap",
            mt: 5,
          }}
        >
          {sort_arr.map((item, i) => (
            <Button
              onClick={() => {
                setCurrSortingIdx(i);
              }}
              variant={currSortingIdx === i ? "contained" : "outlined"}
            >
              <Typography
                key={i}
                // component={"h5"}
                variant={"h5"}
                mx={5}
                fontSize={20}
                display={"inline-block"}
              >
                {item}
              </Typography>
            </Button>
          ))}
        </Box>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", mt: 10 }}
        >
          {fake_arr.map((item) => (
            <Grid item xs={3} mx={5} my={3} key={item.id}>
              <ResultCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
