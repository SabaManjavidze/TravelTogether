import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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
import ChangePictureModal from "./ChangePictureModal";

export default function AddapartmentView() {
  const theme = useTheme();
  const [appOpen, setAppOpen] = useState(false);
  const [profImage, setProfImage] = useState(
    "https://source.unsplash.com/random?query=geography&count=1"
  );

  return (
    <Accordion defaultExpanded>
      <ChangePictureModal
        open={appOpen}
        setOpen={setAppOpen}
        setProfImage={setProfImage}
      />
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
          Add an Apartment
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
            // bgcolor: "black",
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
            onClick={() => {
              setAppOpen(true);
            }}
          />
          <Box
            style={{
              height: "440px",
              width: "400px",
              borderRadius: "10px",
              margin: 0,
              padding: 0,
              backgroundColor: "black",
            }}
          >
            <img
              src={profImage}
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
        </Box>
      </AccordionDetails>
      <AccordionSummary>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3, ml: 3, py: 1.5, px: 3 }}
        >
          <Typography
            variant="h5"
            fontSize="20px"
            color="text.primary"
            textTransform="none"
          >
            Add Apartment
          </Typography>
        </Button>
      </AccordionSummary>
    </Accordion>
  );
}
