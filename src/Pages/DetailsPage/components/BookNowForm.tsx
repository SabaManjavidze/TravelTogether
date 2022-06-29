import {
  Box,
  Button,
  CircularProgress,
  Container,
  LinearProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
type BookNowFormProps = {
  ownerId: string;
};
export default function BookNowForm({ ownerId }: BookNowFormProps) {
  const theme = useTheme();
  const [isBooked, setIsBooked] = useState(false);
  const { user } = useAuth();
  return (
    <Box
      component="form"
      onSubmit={(e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const dates: any = {};
        formData.forEach((value, key) => {
          dates[key] = value;
        });
        // console.log(dates);
      }}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5">From</Typography>
        <TextField
          name="From"
          disabled={isBooked}
          label="From"
          type="date"
          //   value={checkIn}
          //   onChange={(e: any) => setCheckIn(e.target.value)}
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
        <Typography variant="h5">To</Typography>
        <TextField
          name="To"
          label="To"
          type="date"
          disabled={isBooked}
          //   value={checkIn}
          //   onChange={(e: any) => setCheckIn(e.target.value)}
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
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          width: "30%",
        }}
      >
        <Button
          variant="contained"
          type="submit"
          sx={{ p: "10px 25px" }}
          disabled={isBooked}
        >
          <Typography variant="h5" textTransform="none">
            Book Now
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
