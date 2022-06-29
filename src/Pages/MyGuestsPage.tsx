import { Container, Box, Typography, Grid, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookingCard from "../Components/BookingCard";
import { fake_arr } from "../Components/FakeDB";
import GuestCard from "../Components/GuestCard";

export default function MyGuestsPage() {
  const theme = useTheme();
  const [acceptedItem, setAcceptedItem] = useState(null);

  useEffect(() => {
    console.log(acceptedItem);
  }, [acceptedItem]);

  return (
    <Container>
      <Box mt={10}>
        <Typography variant={"h3"}>My Guests</Typography>
      </Box>
      <Grid
        container
        rowGap={5}
        columnGap={theme.breakpoints.down("md") ? 5 : 5}
        paddingBottom={10}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ml: 0,
          mr: 0,
          mt: 10,
        }}
      >
        {fake_arr.map((item) => {
          return (
            <Grid item key={item.id}>
              <GuestCard
                item={item}
                setAcceptedItem={setAcceptedItem}
                acceptedItem={acceptedItem}
              />
              ;
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
