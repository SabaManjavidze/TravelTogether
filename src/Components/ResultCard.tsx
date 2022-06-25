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
import { useNavigate } from "react-router";
import "../App.css";

export const ResultCard: React.FC<{ item: UserApartment }> = ({ item }) => {
  const theme = useTheme();
  const imgBoxHeight = 50;
  const navigate = useNavigate();
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
      <CardActions
        sx={{ p: 0, cursor: "pointer" }}
        onClick={() => {
          navigate(`/details/${item.id}`);
        }}
      >
        <CardMedia
          component="img"
          height="230px"
          image={item.image}
          alt="green iguana"
        />
      </CardActions>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "160px",
          pt: 2,
          m: "4px",
        }}
        onClick={() => {
          navigate(`/details/${item.id}`);
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
          className="custom-scrollbar"
          sx={{
            textAlign: "center",
            maxWidth: "80%",
            maxHeight: "70%",
            overflowY: "auto",
            my: 2,
            // [theme.breakpoints.down("md")]: {
            //   overflowY: "auto",
            //   height: 100,
            // },
          }}
        >
          {item.description}
        </Typography>
      </Box>
      {/* <Box sx={{ height: "15%" }}> */}
      <Box>
        <Button
          sx={{
            width: "100%",
            // pb: 2,
            borderRadius: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          color="primary"
          variant="contained"
        >
          <Typography sx={{ mt: 0, textTransform: "none" }}>
            Book Now
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
