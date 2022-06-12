import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  useTheme,
  Grid,
  Avatar,
} from "@mui/material";
import React from "react";
import { fake_arr, my_bookings } from "../Components/FakeDB";
import BookingCard from "../Components/BookingCard";

export default function MyBookingsPage() {
  const theme = useTheme();
  return (
    <Container>
      <Box mt={10}>
        <Typography variant={"h3"} color="text.primary">
          My Bookings
        </Typography>
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
        {my_bookings.map((item) => {
          return (
            <Grid item key={item.id}>
              <BookingCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
