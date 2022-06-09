import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, useTheme } from "@mui/material";

export default function ResultCard({ item }: any) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: 300,
        height: 500,
        [theme.breakpoints.down("lg")]: { width: 250 },
        border: 1,
        borderColor: "primary.main",
      }}
    >
      <CardMedia
        component="img"
        height="230px"
        image={item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            [theme.breakpoints.down("md")]: {
              overflowY: "scroll",
              height: 100,
            },
          }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica and most
          islands. The most common species are the European lizards, although
          other species of lizards are also present.
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ width: "100%" }} color="primary" variant="text">
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}
