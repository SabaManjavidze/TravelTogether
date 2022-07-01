import React from "react";
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
import { Pending, Close, CheckCircle } from "@mui/icons-material";
import { Booking } from "../utils/types";

type BookingCardProps = {
  item: Booking;
};
export default function BookingCard({ item }: BookingCardProps) {
  const statusColorMap: any = {
    Pending: { text: "warning", color: "#ed6c02" },
    Accepted: { text: "success", color: "#2e7d32" },
    Rejected: { text: "error", color: "#d50000" },
  };
  const theme = useTheme();
  const statusMap = { "-1": "Rejected", 0: "Pending", 1: "Accepted" };
  const RenderIcon = (status: string, color: any) => {
    switch (status) {
      case "Pending":
        return <Pending color={color} />;

      case "Accepted":
        return <CheckCircle color={color} />;

      case "Rejected":
        return <Close color={color} />;
      default:
        break;
    }
  };

  return (
    <Card
      sx={{
        height: 450,
        width: "500px",
        // [theme.breakpoints.up("sm")]: { width: "50%" },
        [theme.breakpoints.down("sm")]: { width: "400px" },
        [theme.breakpoints.down("lg")]: { width: "350px" },
        border: 1,
        borderColor: "primary.main",
      }}
    >
      <CardMedia
        component="img"
        height="60%"
        draggable={false}
        // sx={{
        //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
        // }}
        image={item.apartment.image}
        alt="green iguana"
      />
      <CardContent
        sx={{
          height: "25%",
          p: 0,
          pl: 2,
          mt: 2,
          width: "90%",
        }}
      >
        <Typography gutterBottom variant="h6" component="div" mb={0}>
          {item.apartment.city}, {item.apartment.address}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mx: 0.5,
            flexDirection: "row",
            mb: 1.5,
          }}
        >
          <Typography
            variant="h6"
            fontSize={15}
            color="text.main"
            pr={5}
            fontFamily="Montserrat"
            fontWeight={"900"}
          >
            {item.apartment.distanceFromCenter} m
          </Typography>
          <Typography
            variant="h6"
            fontSize={15}
            color="text.main"
            fontFamily="Montserrat"
            fontWeight={"900"}
          >
            {item.apartment.numOfBeds} beds
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          overflow={"auto"}
          // maxHeight={"30%"}
          sx={{
            overflow: "auto",
            maxHeight: "45px",
          }}
        >
          {item.apartment.description}
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
          {/* {item.check_in.replace("-", "/")} - {item.check_out.replace("-", "/")} */}
          {new Date(item.from).toLocaleDateString()} -{" "}
          {new Date(item.to).toLocaleDateString()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            whiteSpace: "nowrap",
            p: 0,
            m: 0,
          }}
        >
          {/* <StateIcon color={statusColorMap[item.status].icon} /> */}
          {RenderIcon(
            statusMap[item.status],
            statusColorMap[statusMap[item.status]].text
          )}
          <Typography
            variant="subtitle1"
            fontSize={15}
            textTransform="none"
            ml={0.5}
            color={`${statusColorMap[statusMap[item.status]].color}`}
          >
            {statusMap[item.status]}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
