import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SearchBar from "../Components/SearchBar";

export default function SearchPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Container>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          minHeight: "80.4vh",
          // alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          textAlign={"left"}
          ml={10}
          fontFamily="Montserrat"
          fontStyle={"normal"}
          fontWeight={"700"}
          letterSpacing={"-0.015em"}
          sx={{
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
              ml: 0,
            },
          }}
        >
          Find apartments
        </Typography>
        <Box mt={10}>
          <SearchBar navigate={navigate} />
        </Box>
      </Box>
    </Container>
  );
}
