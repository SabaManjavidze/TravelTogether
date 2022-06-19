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
  SxProps,
  Theme,
} from "@mui/material";
import { Check as AcceptIcon, Close as DeclineIcon } from "@mui/icons-material";

export default function GuestCard({
  item,
  acceptedItem,
  setAcceptedItem,
}: any) {
  const theme = useTheme();
  const [btnColor, setBtnColor] = useState<any>("primary");
  const btnTextStyle: SxProps<Theme> = {
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  };
  const btnStyle: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      width: "45%",
    },
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      // px: 1,
    },
    px: 5,
    py: 1,
  };
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
          width: "30%",
          [theme.breakpoints.down("md")]: { width: "40%" },
          [theme.breakpoints.down("sm")]: { width: "50%" },
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

          [theme.breakpoints.down("md")]: { width: "60%" },
          [theme.breakpoints.down("sm")]: { width: "50%" },
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
          {/* Name and From-To */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              mb: 1,
              [theme.breakpoints.down("md")]: {
                width: "100%",
                flexDirection: "column",
              },
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
          {/* Description and Update Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              [theme.breakpoints.down("md")]: {
                width: "100%",
                flexDirection: "column-reverse",
              },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              // maxHeight={"30%"}
              width={"50%"}
              sx={{
                overflow: "auto",
                maxHeight: "45px",
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  maxHeight: "130px",
                },
                [theme.breakpoints.down("md")]: {
                  maxHeight: "60px",
                },
                [theme.breakpoints.down("sm")]: {
                  maxHeight: "40px",
                },
              }}
            >
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%",
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                  ml: 0,
                  mt: 1,
                  mb: 3,
                },
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  mb: 1,
                },
                ml: 5,
              }}
            >
              <Button
                sx={btnStyle}
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
                <AcceptIcon sx={btnTextStyle} />
                <Typography
                  variant="h6"
                  textTransform="none"
                  ml={0.5}
                  textAlign="center"
                  sx={btnTextStyle}
                >
                  Accept
                </Typography>
              </Button>
              <Button
                sx={[
                  btnStyle,
                  {
                    [theme.breakpoints.down("sm")]: {
                      mt: 1,
                    },
                  },
                ]}
                color="primary"
                variant="outlined"
              >
                <DeclineIcon
                  sx={btnTextStyle}
                  htmlColor={
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.main
                  }
                />
                <Typography
                  variant="h6"
                  textTransform="none"
                  sx={btnTextStyle}
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
