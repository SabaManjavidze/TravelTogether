import {
  Container,
  Link,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  useTheme,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import ChangePictureModal from "../Components/ChangePictureModal";
import { default_user_avatar, RegisterUser } from "../utils/Services";
import { CameraAlt as ImageIcon } from "@mui/icons-material";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router";

export default function Register() {
  const [profImage, setProfImage] = useState(default_user_avatar);
  const [encoded, setEncoded] = useState();
  const [profOpen, setProfOpen] = useState(false);
  const { userLoading }: any = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user: any = {};
    data.forEach((item, key): any => {
      if (item !== "" && item != null) {
        user[key] = item;
      }
    });
    if (profImage !== "" && encoded !== "") {
      user.image = encoded;
    }
    const response = await RegisterUser(user);
    if (response && response.status === 200) {
      navigate("/login");
    }
  };
  const theme = useTheme();
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
          setEncoded={setEncoded}
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
            [theme.breakpoints.down("sm")]: {
              width: "85%",
            },
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
              name="firstname"
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
              justifyContent: "center",
              alignItems: "center",
              my: 4,
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "10px",
                width: "50%",
                bgcolor: "black",
                height: "340px",

                [theme.breakpoints.down("md")]: {
                  width: "400px",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "85%",
                },
              }}
              className="hover-section"
            >
              <ImageIcon
                className="image-icon"
                fontSize="large"
                onClick={() => {
                  setProfOpen(!profOpen);
                }}
              />
              <img
                src={userLoading || profImage || default_user_avatar}
                alt=""
                className="profile-image"
                style={{
                  // maxWidth: "100%",
                  // maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Box>
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
            <Link
              href="/login"
              variant="subtitle2"
              sx={{ textDecoration: "none" }}
            >
              Already have an account? Log In
            </Link>
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
