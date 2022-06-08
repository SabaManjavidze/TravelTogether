import { Grid, TextField, Button } from "@mui/material";
import React, { FormEvent } from "react";

export default function SearchBar({ navigate }: any) {
  const params = new URLSearchParams(window.location.search);
  const location = params.get("location");
  const check_in = params.get("check_in");
  const check_out = params.get("check_out");
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
      `/search?location=${location}&checkIn=${check_in}&checkOut=${check_out}`
    );
    navigate(
      `/search-results?location=${location}&checkIn=${check_in}&checkOut=${check_out}`
    );
  };
  return (
    <Grid
      container
      component={"form"}
      onSubmit={handleSubmit}
      mt={8}
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
          defaultValue={location || ""}
          name="location"
          id="location"
          sx={{ width: 400, m: 0 }}
        />
      </Grid>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          name="check_in"
          label="Check in"
          type="date"
          defaultValue={check_in || ""}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="check_out"
          label="Check out"
          type="date"
          defaultValue={new Date(check_out || "").toLocaleDateString() || ""}
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
          // height: "100%",
        }}
      >
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size={"large"}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
