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
import { Guest, User } from "../../utils/types";
import { updateStatus } from "../../utils/Services";
import "../../App.css";
import GuestCardButton from "./components/GuestCardButton";

type GuestCardProps = {
  item: Guest;
  setLoading: Dispatch<boolean>;
};

export default function GuestCard({ item, setLoading }: GuestCardProps) {
  const theme = useTheme();
  const [btnColor, setBtnColor] = useState<any>("primary");
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        // width: "110vh",
        height: 250,
        border: 1,
        borderColor:
          item.status === "Pending"
            ? "primary.main"
            : item.status === "Accepted"
            ? "success.main"
            : "error.main",
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
        alt="Apartment Image"
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
              // width: "inherit",
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
                variant="body1"
                color="text.primary"
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
              {item.status === "Pending" ? (
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
                  }}
                >
                  <GuestCardButton
                    buttonName="Accepted"
                    buttonText="Accept"
                    guestId={item.id}
                    status={item.status}
                    setLoading={setLoading}
                  />
                  <GuestCardButton
                    buttonName="Rejected"
                    buttonText="Reject"
                    guestId={item.id}
                    status={item.status}
                    setLoading={setLoading}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    height: "100%",
                    ml: 5,
                  }}
                >
                  <Typography
                    variant="body1"
                    // sx={{ display: "inlineFlex", alignItems: "center" }}
                    fontSize={17}
                    mt={5}
                  >
                    The request was{" "}
                  </Typography>
                  <Typography
                    fontSize={17}
                    ml={"5px"}
                    color={
                      item.status === "Accepted" ? "success.main" : "error.main"
                    }
                    mt={5}
                  >
                    {item.status}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
