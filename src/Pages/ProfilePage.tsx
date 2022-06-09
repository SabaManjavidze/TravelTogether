import {
  Container,
  Box,
  TextField,
  Grid,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import "../App.css";
import ChangePictureModal from "../Components/ChangePictureModal";
import { CameraAlt as ImageIcon } from "@mui/icons-material";
import AddAppartmentView from "../Components/AddAppartmentView";
export default function ProfilePage() {
  const fake_user = {
    first_name: "John",
    last_name: "Doe",
    email: "JohnDoe@gmail.com",
    // bio: `lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    //    nisi ut aliquip ex ea commodo consequat`,
    bio: "",
    image: "https://source.unsplash.com/random",
  };
  const [profImage, setProfImage] = useState(fake_user.image);
  const [open, setOpen] = useState(false);
  return (
    <Container
      component={"form"}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(new FormData(e.currentTarget).get("image"));
      }}
      sx={{ minHeight: window.innerHeight, paddingBottom: 15 }}
    >
      <ChangePictureModal open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
        <Box
          sx={{
            borderRadius: "10px",
            background: "black",
            height: "440px",
            position: "relative",
            width: "400px",
          }}
          className="hover-section"
        >
          <ImageIcon
            className="image-icon"
            fontSize="large"
            onClick={() => {
              setOpen(!open);
            }}
          />
          <img
            src={profImage || ""}
            alt=""
            className="profile-image"
            style={{
              height: "440px",
              width: "400px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 10,
            width: "100%",
          }}
        >
          <Grid container width={"100%"}>
            <Grid item xs>
              <TextField
                className="round-input"
                name="first_name"
                placeholder="First Name"
                defaultValue={fake_user?.first_name || ""}
              />
            </Grid>
            <Grid item>
              <TextField
                className="round-input"
                name="last_name"
                placeholder="Last Name"
                defaultValue={fake_user?.last_name || ""}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <TextField
              className="round-input"
              name="email"
              placeholder="Email address"
              type="email"
              sx={{ mt: 3 }}
              defaultValue={fake_user?.email || ""}
            />
            <TextField
              name="bio"
              placeholder="Something about yourself "
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
              className="round-input"
              // ignore ts error

              defaultValue={fake_user?.bio || ""}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "25%", py: 1, whiteSpace: "nowrap" }}
            >
              <Typography
                color={"white"}
                variant="h5"
                fontSize={17}
                textTransform={"none"}
              >
                Save Changes
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 10 }}>
        <AddAppartmentView />
      </Box>
    </Container>
  );
}
