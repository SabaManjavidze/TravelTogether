import { Check, Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

export default function amenitiesRenderItem({
  item,
  index,
  apartmentDetails,
}: any) {
  return (
    <Typography
      key={item}
      variant="caption"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: "text.primary",
        mt: 2,
      }}
    >
      <Typography sx={{ lineHeight: 0, width: "50%", textAlign: "right" }}>
        {apartmentDetails[item.toLowerCase()] ? (
          <Check color="success" />
        ) : (
          <Close color="error" />
        )}
      </Typography>
      <Typography variant="h5" sx={{ px: 3, width: "50%", textAlign: "left" }}>
        {item}
      </Typography>
    </Typography>
  );
}
