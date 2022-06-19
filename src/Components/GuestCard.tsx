import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";
import { Check as AcceptIcon, Close as DeclineIcon } from "@mui/icons-material";

export default function GuestCard({
  item,
  acceptedItem,
  setAcceptedItem,
}: any) {
  const theme = useTheme();
  const [btnColor, setBtnColor] = useState<any>("primary");
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 250,
        // [theme.breakpoints.down("lg")]: { width: 400 },
        border: 1,
        borderColor: "primary.main",
      }}
    >
      <CardMedia
        component="img"
        // height="30%"
        sx={{
          // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
          width: "30%",
        }}
        image={item.image}
        alt="green iguana"
      />
      <CardContent
        sx={{
          // height: "25%",
          p: 0,
          pb: "0px !important",
          m: 0,
          display: "flex",
          width: "70%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              mb: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              //  ml={5}
            >
              {item.name}
            </Typography>
            <Typography
              variant="h6"
              color={theme.palette.mode === "dark" ? "white" : "black"}
              fontSize={14}
              whiteSpace="nowrap"
              // mr={7}
            >
              12.02.2022 - 15.02.2022
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              overflow={"auto"}
              // maxHeight={"30%"}
              width={"50%"}
              sx={{
                [theme.breakpoints.down("md")]: {
                  overflow: "auto",
                  maxHeight: "10px",
                },
              }}
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica and
              most islands. The most common species are the European lizards,
              although other species of lizards are also present.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%",
                ml: 5,
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  px: 5,
                  py: 1,
                }}
                onClick={() => {
                  // console.log("accepted");
                  if (acceptedItem === null) {
                    setAcceptedItem(item.id);
                    setBtnColor("success");
                  }
                }}
                disabled={
                  acceptedItem !== null ? acceptedItem !== item.id : false
                }
                color={btnColor}
                variant="contained"
              >
                <AcceptIcon />
                <Typography
                  variant="h6"
                  fontSize={15}
                  textTransform="none"
                  ml={0.5}
                  textAlign="center"
                >
                  Accept
                </Typography>
              </Button>
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  px: 5,
                  py: 1,
                }}
                color="primary"
                variant="outlined"
              >
                <DeclineIcon
                  htmlColor={
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.main
                  }
                />
                <Typography
                  variant="h6"
                  fontSize={15}
                  textTransform="none"
                  ml={0.5}
                  textAlign="center"
                  border={theme.palette.mode === "dark" ? "2px" : "1px"}
                  borderColor={
                    theme.palette.mode === "dark"
                      ? "primary.light"
                      : "primary.main"
                  }
                  color={
                    theme.palette.mode === "dark"
                      ? "primary.light"
                      : "primary.main"
                  }
                >
                  Decline
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
