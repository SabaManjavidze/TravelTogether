import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SearchBar from "../Components/SearchBar";

export default function SearchPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          minHeight: "79.9vh",
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
          color="text.primary"
        >
          Find Appartments
        </Typography>
        <Box mt={10}>
          <SearchBar navigate={navigate} />
        </Box>
      </Box>
    </Container>
  );
}
