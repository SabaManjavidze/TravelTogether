import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  useTheme,
} from "@mui/material";
import { UserApartment } from "../utils/types";

export const ResultCard: React.FC<{ item: UserApartment }> = ({ item }) => {
  const theme = useTheme();
  const imgBoxHeight = 50;
  return (
    <Box
      sx={{
        width: 400,
        height: 450,
        [theme.breakpoints.down("lg")]: { width: 300 },
        border: 1,
        borderColor: "primary.main",
      }}
    >
      <Box sx={{ height: `${imgBoxHeight}%` }}>
        <CardMedia
          component="img"
          height="230px"
          image={item.image}
          alt="green iguana"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: `${100 - imgBoxHeight}%`,
          mt: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color="text.primary"
        >
          {item.address}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography color="text.primary">{item.num_of_beds} beds</Typography>
          <Typography color="text.primary">
            {item.distance_from_center}m
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: "center",
            [theme.breakpoints.down("md")]: {
              overflowY: "auto",
              height: 100,
            },
          }}
        >
          {item.description}
        </Typography>
        <Button
          sx={{ width: "100%", pb: 2, borderRadius: 0 }}
          color="primary"
          variant="contained"
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};
