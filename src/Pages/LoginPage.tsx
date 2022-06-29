import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEventHandler } from "react";
import "../App.css";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { getUserProfile, UserLogin } from "../utils/Services";
import { useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const login = {
      email: data.get("email")?.toString() || "",
      password: data.get("password")?.toString() || "",
    };
    const response = await UserLogin(login);
    if (response && response === 200) {
      const profile = await getUserProfile();
      setUser(profile);
      setIsLoggedIn(true);
      navigate("/search");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          minHeight: "93.2vh",
        }}
      >
        <Box>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", mt: 15 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="input-field"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="subtitle2"
                  sx={{ textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
                  variant="subtitle2"
                  sx={{ textDecoration: "none" }}
                >
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          position: "absolute",
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
      </Typography>
    </Container>
  );
}
