import {
  Container,
  Box,
  Typography,
  Button,
  useTheme,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BookingCard from "../Components/BookingCard";
import { getMyBookings } from "../utils/Services";
import { Booking } from "../utils/types";

export default function MyBookingsPage() {
  const theme = useTheme();
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBookings = async () => {
    const bookings = await getMyBookings();
    setMyBookings(bookings);
    setLoading(false);
  };
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <Container>
      <Box mt={10}>
        <Typography variant={"h3"}>My Bookings</Typography>
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
                <Grid item key={item.apartment.id}>
                  <BookingCard item={item} />
                </Grid>
              );
            })}
      </Grid>
    </Container>
  );
}
