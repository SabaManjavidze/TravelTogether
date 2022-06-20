import {
  Container,
  Box,
  TextField,
  Grid,
  Button,
  Avatar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import "../App.css";
import ChangePictureModal from "../Components/ChangePictureModal";
import { CameraAlt as ImageIcon } from "@mui/icons-material";
import AddapartmentView from "../Components/AddApartmentView";
import ApartmentCard from "../Components/ApartmentCard";
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
  const [profOpen, setProfOpen] = useState(false);
  const theme = useTheme();
  return (
    <Container
      component={"form"}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(new FormData(e.currentTarget).get("image"));
      }}
      sx={{ paddingBottom: 15, minHeight: "80.4vh" }}
    >
      <ChangePictureModal
        open={profOpen}
        setOpen={setProfOpen}
        setProfImage={setProfImage}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 15,
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "10px",
            width: "30%",
            bgcolor: "black",
            height: "440px",

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
            src={profImage || ""}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "50%",
            [theme.breakpoints.down("md")]: {
              ml: 0,
              mt: 3,
              width: "85%",
            },
            ml: 10,
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              },
            }}
          >
            <Grid
              item
              sx={{
                [theme.breakpoints.up("lg")]: {
                  width: "40%",
                },
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <TextField
                className="round-input"
                name="first_name"
                placeholder="First Name"
                defaultValue={fake_user?.first_name || ""}
                fullWidth
              />
            </Grid>
            <Grid
              item
              sx={{
                [theme.breakpoints.up("lg")]: {
                  width: "40%",
                },
                [theme.breakpoints.down("md")]: {
                  mt: 2,
                  width: "100%",
                },
              }}
            >
              <TextField
                className="round-input"
                name="last_name"
                placeholder="Last Name"
                defaultValue={fake_user?.last_name || ""}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <TextField
              className="round-input"
              name="email"
              placeholder="Email address"
              type="email"
              defaultValue={fake_user?.email || ""}
              sx={{ mt: 5 }}
            />
            <TextField
              name="bio"
              placeholder="Something about yourself "
              multiline
              sx={{
                mb: 10,
                resize: "none",
                height: "75px",
                maxHeight: "200px",
                boxSizing: "border-box",
              }}
              rows={5}
              className="round-input"
              // ignore ts error

              defaultValue={fake_user?.bio || ""}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "25%",
                py: 1,

                [theme.breakpoints.down("md")]: {
                  width: "100%",
                },
              }}
            >
              <Typography
                color={"white"}
                variant="subtitle1"
                fontSize={15}
                textTransform={"none"}
                whiteSpace="nowrap"
              >
                Save Changes
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
          [theme.breakpoints.down("md")]: {
            mt: 15,
          },
        }}
      >
        <AddapartmentView />
      </Box>
    </Container>
  );
}
