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
    [theme.breakpoints.up("lg")]: {
      fontSize: "17px",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  };
  const btnStyle: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    // [theme.breakpoints.up("md")]: {
    //   width: "45%",
    // },
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
            justifyContent: "start",
            mt: "2rem",
          }}
        >
          {/* Name and From-To */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "80%",
              [theme.breakpoints.down("md")]: {
                width: "100%",
                flexDirection: "column",
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              //  ml={5}
            >
              {`${item.firstName[0].toUpperCase()}${item.firstName.slice(
                1,
                item.firstName.length
              )}`}
            </Typography>
            <Typography
              variant="h6"
              color={theme.palette.mode === "dark" ? "white" : "black"}
              // fontSize={14}
              whiteSpace="nowrap"
              sx={{
                letterSpacing: 2.5,
              }}
              // mr={5}
            >
              {new Date(item.from).toLocaleDateString()} -{" "}
              {new Date(item.to).toLocaleDateString()}
            </Typography>
          </Box>
          {/* Description and Update Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              height: "inherit",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column-reverse",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                width: "40%",
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                },
                height: "inherit",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                // maxHeight={"30%"}
                sx={{
                  overflow: "auto",
                  maxHeight: "45px",
                  width: "100%",
                  textAlign: "center",
                  pt: 3,
                  [theme.breakpoints.up("md")]: {
                    maxHeight: "130px",
                  },
                  [theme.breakpoints.down("md")]: {
                    pt: 0,
                    maxHeight: "60px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    maxHeight: "40px",
                    pt: 1,
                  },
                }}
              >
                {item.description || "No Description."}
              </Typography>
            </Box>
            <Box
              sx={{
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
                height: "inherit",
                width: "60%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: 5,
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    mt: 1,
                  },
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    // mb: 1,
                  },
                }}
              >
                <Button
                  sx={[btnStyle, { mr: 3 }]}
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
        </Box>
      </CardContent>
    </Card>
  );
}
