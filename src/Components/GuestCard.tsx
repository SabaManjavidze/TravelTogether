import React, { Dispatch, useState } from "react";
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
import { Check as AcceptIcon, Close as RejectIcon } from "@mui/icons-material";
import { Guest, User } from "../utils/types";
import { updateStatus } from "../utils/Services";
import "../App.css";

type GuestCardProps = {
  item: Guest;
  acceptedItem: string;
  setAcceptedItem: Dispatch<string>;
};

export default function GuestCard({
  item,
  acceptedItem,
  setAcceptedItem,
}: GuestCardProps) {
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
      width: "20vh",
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
        // width: "110vh",
        height: 250,
        border: 1,
        borderColor: "primary.main",
      }}
    >
      <CardMedia
        component="img"
        // height="30%"
        sx={{
          width: "30vh",
          [theme.breakpoints.down("md")]: { width: "25vh" },
          [theme.breakpoints.down("sm")]: { width: "20vh" },
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
          width: "40vh",

          [theme.breakpoints.up("lg")]: { width: "80vh" },
          [theme.breakpoints.down("lg")]: { width: "65vh" },
          [theme.breakpoints.down("md")]: { width: "40vh" },
          [theme.breakpoints.down("sm")]: { width: "30vh" },
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
              width: "90%",
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
              // width: "100%",
              width: "inherit",
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
                // width: "40%",
                width: "25vh",
                [theme.breakpoints.down("sm")]: {
                  width: "inherit",
                },
                height: "inherit",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                // maxHeight={"30%"}
                className="custom-scrollbar"
                sx={{
                  overflow: "auto",
                  maxHeight: "45px",
                  // width: "100%",
                  textAlign: "center",
                  pt: 3,
                  pr: 2,
                  [theme.breakpoints.up("md")]: {
                    maxHeight: "130px",
                  },
                  [theme.breakpoints.down("md")]: {
                    pt: 0,
                    maxHeight: "40px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    maxHeight: "30px",
                    pt: 0,
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
                  pl: 4,
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 1,
                    pl: 0,
                  },
                  // [theme.breakpoints.down("sm")]: {
                  // mb: 1,
                  // },
                }}
              >
                <Button
                  sx={[
                    btnStyle,
                    { mr: 3, [theme.breakpoints.down("md")]: { mr: 0, mb: 1 } },
                  ]}
                  onClick={() => {
                    // console.log("accepted");
                    updateStatus(item.id, "Accepted");
                    if (acceptedItem === "") {
                      setAcceptedItem(item.id);
                      setBtnColor("success");
                    }
                  }}
                  disabled={
                    acceptedItem !== "" ? acceptedItem !== item.id : false
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
                  onClick={() => {
                    updateStatus(item.id, "Rejected");
                  }}
                >
                  <RejectIcon
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
                    Reject
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
