import { Container, Box, Typography, Grid, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import GuestCard from "../Components/GuestCard";
import { getMyGuests } from "../utils/Services";
import { Guest } from "../utils/types";

export default function MyGuestsPage() {
  const theme = useTheme();
  const [acceptedItem, setAcceptedItem] = useState("");
  const [myGuests, setMyGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGuests = async () => {
    const guests = await getMyGuests();
    setMyGuests(guests);
    setLoading(false);
  };
  useEffect(() => {
    fetchMyGuests();
  }, []);

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
        {loading
          ? null
          : myGuests.map((item: any) => {
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
