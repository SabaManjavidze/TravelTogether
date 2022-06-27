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
import React, { useEffect, useState } from "react";
import { fake_arr, my_bookings } from "../Components/FakeDB";
import BookingCard from "../Components/BookingCard";
import { getUserBookings } from "../utils/Services";
import { Booking } from "../utils/types";

export default function MyBookingsPage() {
  const theme = useTheme();
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBookings = async () => {
    const bookings = await getUserBookings();
    setMyBookings(bookings);
    setLoading(false);
  };
  useEffect(() => {
    getBookings();
  }, []);

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
        {loading
          ? null
          : myBookings.map((item) => {
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
