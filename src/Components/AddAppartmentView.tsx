import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import "../App.css";
import {
  ExpandMore as ExpandMoreIcon,
  CameraAlt as ImageIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/material/styles";

export default function AddAppartmentView() {
  const theme = useTheme();
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          expandIconWrapper: "expand-icon-wrapper",
        }}
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.light} !important`,
        }}
      >
        <Typography variant="h5" color="primary.light">
          Add an appartment
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: "flex", justifyContent: "center", mt: 5 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
          {[
            "City",
            "Address",
            "Distance to center",
            "Max Number of guests",
          ].map((item, i) => {
            return (
              <TextField
                key={item}
                name={item.toLowerCase()}
                placeholder={item}
                sx={{ mt: i > 0 ? 3 : 0 }}
              />
            );
          })}
          <TextField
            name="Description"
            placeholder="Description"
            multiline
            sx={{
              mt: 3,
              mb: 10,
              resize: "none",
              height: "75px",
              maxHeight: "200px",
              boxSizing: "border-box",
            }}
            rows={4}
          />
        </Box>

        <Box
          sx={{
            borderRadius: "10px",
            height: "inherit",
            position: "relative",
            width: "400px",
            paddingLeft: 10,
            paddingRight: 5,
            mb: 3,
          }}
          className="hover-section"
        >
          <ImageIcon
            className="image-icon"
            sx={{ left: "54% !important" }}
            fontSize="large"
            // onClick={() => {
            //   setOpen(!open);
            // }}
          />
          <img
            src={"https://source.unsplash.com/random?query=geography&count=1"}
            alt=""
            style={{
              height: "100%",
              width: "400px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
            className="profile-image"
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
