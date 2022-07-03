import { Button, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { Check as AcceptIcon, Close as RejectIcon } from "@mui/icons-material";
import React, { Dispatch, useEffect, useState } from "react";
import { updateStatus } from "../../../utils/Services";
import { Status } from "../../../utils/types";

type GuestCardButtonProps = {
  guestId: string;
  status: Status;
  buttonName: "Rejected" | "Accepted";
  buttonText: string;
  setLoading: Dispatch<boolean>;
};
export default function GuestCardButton({
  status,
  guestId,
  buttonName,
  buttonText,
  setLoading,
}: GuestCardButtonProps) {
  const theme = useTheme();
  const [color, setColor] = useState("");
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
  const colorByStatus = () => {
    if (status === "Rejected") {
      setColor(buttonName === "Rejected" ? "error.main" : "text.secondary");
    }
    if (status === "Accepted") {
      setColor(buttonName === "Accepted" ? "success.main" : "text.secondary");
    }
    setColor(theme.palette.mode === "dark" ? "white" : "primary.main");
  };
  useEffect(() => {
    colorByStatus();
  }, []);

  const btnStyle: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("md")]: {
      width: "20vh",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    px: 5,
    py: 1,
  };
  return (
    <Button
      sx={[
        btnStyle,
        {
          mr: 3,
          [theme.breakpoints.down("md")]: { mr: 0, mb: 1 },
        },
      ]}
      onClick={async () => {
        if (status === "Pending") {
          const response = await updateStatus(guestId, buttonName);
          if (response) {
            alert("Apartment already booked");
            return;
          }
          setLoading(true);
        }
      }}
      color={buttonName === "Accepted" ? "primary" : "error"}
      variant={buttonName === "Accepted" ? "contained" : "outlined"}
      disabled={status !== "Pending"}
    >
      {buttonName === "Accepted" ? (
        <AcceptIcon sx={btnTextStyle} />
      ) : (
        <RejectIcon sx={btnTextStyle} />
      )}
      <Typography
        variant="h6"
        textTransform="none"
        ml={0.5}
        textAlign="center"
        sx={btnTextStyle}
        color={color}
      >
        {status === buttonName ? buttonName : buttonText}
      </Typography>
    </Button>
  );
}
