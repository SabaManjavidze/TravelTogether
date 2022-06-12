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

export default function BookingCard({ item }: any) {
  const statusColorMap: any = {
    Pending: { icon: "warning", text: "#ed6c02" },
    Accepted: { icon: "success", text: "#2e7d32" },
    Rejected: { icon: "error", text: "#d50000" },
  };
  const theme = useTheme();

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
          width: "90%",
        }}
      >
        <Typography gutterBottom variant="h6" component="div" mb={0}>
          {item.address}, {item.country}
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
            {item.distance_from_center} m
          </Typography>
          <Typography
            variant="h6"
            fontSize={15}
            color="text.main"
            fontFamily="Montserrat"
            fontWeight={"900"}
          >
            {item.num_of_beds} beds
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          overflow={"auto"}
          // maxHeight={"30%"}
          sx={{
            [theme.breakpoints.down("md")]: {
              overflow: "auto",
              maxHeight: "10px",
            },
          }}
        >
          {item.description}
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
          {item.check_in.replace("-", "/")} - {item.check_out.replace("-", "/")}
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
          {RenderIcon(item.status, statusColorMap[item.status].icon)}
          <Typography
            variant="subtitle1"
            fontSize={15}
            textTransform="none"
            ml={0.5}
            color={`${statusColorMap[item.status].text}`}
          >
            {item.status}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
