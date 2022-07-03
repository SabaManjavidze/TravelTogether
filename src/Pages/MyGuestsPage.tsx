import {
  Container,
  Box,
  Typography,
  Grid,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GuestCard from "../Components/GuestCard/GuestCard";
import { getMyGuests } from "../utils/Services";
import { Guest } from "../utils/types";

export default function MyGuestsPage() {
  const theme = useTheme();
  const [acceptedItem, setAcceptedItem] = useState("");
  const [myGuests, setMyGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyGuests = async () => {
    setMyGuests([]);
    const guests = await getMyGuests();
    setMyGuests(guests);
    setLoading(false);
  };
  useEffect(() => {
    if (loading) fetchMyGuests();
  }, [loading]);

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
        {loading ? (
          <CircularProgress sx={{ mt: 5 }} size="3rem" />
        ) : (
          myGuests.map((item: any) => {
            return (
              <Grid item key={item.id}>
                <GuestCard item={item} setLoading={setLoading} />;
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
}
