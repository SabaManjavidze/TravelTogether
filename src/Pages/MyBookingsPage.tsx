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
import { fake_arr } from "../Components/FakeDB";
import { RequestPageOutlined as StateIcon } from "@mui/icons-material";

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
        {fake_arr.map((item) => {
          return (
            <Card
              sx={{
                width: 550,
                height: 450,
                [theme.breakpoints.down("lg")]: { width: 400 },
                border: 1,
                borderColor: "primary.main",
              }}
            >
              <CardMedia
                component="img"
                height="60%"
                // sx={{
                //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
                // }}
                image={item.image}
                alt="green iguana"
              />
              <CardContent
                sx={{
                  height: "25%",
                  p: 0,
                  pl: 2,
                  mt: 2,
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {item.name}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
                  <Typography
                    variant="h6"
                    fontSize={15}
                    color="text.main"
                    pr={5}
                    fontFamily="Montserrat"
                    fontWeight={"900"}
                  >
                    500m to center
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize={15}
                    color="text.main"
                    fontFamily="Montserrat"
                    fontWeight={"900"}
                  >
                    2 beds
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  overflow={"auto"}
                  maxHeight={"30%"}
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      overflow: "auto",
                      maxHeight: "10px",
                    },
                  }}
                >
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                  and most islands. The most common species are the European
                  lizards, although other species of lizards are also present.
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mx: 5,
                }}
              >
                <Typography
                  variant="h6"
                  color={theme.palette.mode === "dark" ? "white" : "black"}
                  fontSize={14}
                  whiteSpace="nowrap"
                >
                  12.02.2022 - 15.02.2022
                </Typography>
                <Button
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                  color="primary"
                  variant="text"
                >
                  <StateIcon />
                  <Typography
                    variant="h6"
                    fontSize={15}
                    textTransform="none"
                    ml={0.5}
                  >
                    Pending
                  </Typography>
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
