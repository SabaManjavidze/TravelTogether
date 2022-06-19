import {
  Container,
  Link,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import ChangePictureModal from "../Components/ChangePictureModal";

export default function Register() {
  const [profImage, setProfImage] = useState(
    "https://www.innovaxn.eu/wp-content/uploads/blank-profile-picture-973460_1280.png"
  );
  const [profOpen, setProfOpen] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      first_name: data.get("firstname"),
      last_name: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "85.9vh",
          pb: 15,
        }}
      >
        <ChangePictureModal
          open={profOpen}
          setOpen={setProfOpen}
          setProfImage={setProfImage}
        />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="text.primary">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            width: "60%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              margin="normal"
              required
              name="firstName"
              label="FirstName"
              type="text"
              autoFocus
              fullWidth
              sx={{ mr: 3 }}
              // autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="LastName"
              sx={{ ml: 3 }}
              type="text"
              // autoComplete="current-password"
            />
          </Box>
          <TextField
            margin="normal"
            required
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              my: 3,
            }}
            onClick={() => setProfOpen(true)}
          >
            <Typography variant="h6" color="text.primary" mb={3}>
              Profile Picture
            </Typography>
            <img
              src={profImage}
              alt=""
              width="350"
              height="350"
              style={{ borderRadius: 4, objectFit: "cover" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              <Typography
                variant="subtitle1"
                color="text.primary"
                textTransform={"none"}
              >
                Set Profile Picture
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "20%", textTransform: "none" }}
            >
              Register
            </Button>
            <Grid container sx={{ width: "auto" }}>
              <Grid item>
                <Link
                  href="/login"
                  variant="subtitle2"
                  sx={{ textDecoration: "none" }}
                >
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            bottom: 15,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {"Copyright © "}
          <Link color="inherit" href="http://localhost:3000">
            TravelTogether
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography> */}
      </Box>
    </Container>
  );
}
