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
  const [expanded, setExpanded] = useState(true);
  const [profImage, setProfImage] = useState(
    "https://source.unsplash.com/random?query=geography&count=1"
  );

  return (
    <Accordion
      defaultExpanded
      sx={{
        width: "100%",
        [theme.breakpoints.down("xl")]: {
          width: "80%",
        },
      }}
    >
      <AccordionSummary
        // onClick={() => setExpanded(!expanded)}
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon htmlColor={theme.palette.primary.light} />}
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.light} !important`,
        }}
      >
        <Typography variant="h5" color="primary.light">
          Add an Apartment
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            mt: 5,
            [theme.breakpoints.down("md")]: {
              flexDirection: "column-reverse",
            },
          }}
        >
          <ChangePictureModal
            open={appOpen}
            setOpen={setAppOpen}
            setProfImage={setProfImage}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              [theme.breakpoints.down("md")]: {
                mt: 3,
                width: "80%",
              },
            }}
          >
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
              boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              width: "400px",
              bgcolor: "black",
              position: "relative",
              ml: 10,
              mr: 5,
              mb: 3,
              height: "440px",
              [theme.breakpoints.down("md")]: {
                mx: 0,
                mb: 0,
                // px: 0,
                width: "400px",
              },
              [theme.breakpoints.down("sm")]: {
                // height: "440px",
                width: "85%",
              },
            }}
            className="hover-section"
          >
            <ImageIcon
              className="image-icon"
              // sx={{ top: 0 }}
              fontSize="large"
              onClick={() => {
                setAppOpen(true);
              }}
            />
            <img
              src={profImage}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              className="profile-image"
            />
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 3, ml: 3, py: 1.5 }}
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
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
