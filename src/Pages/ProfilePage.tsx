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
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import "../App.css";
import ChangePictureModal from "../Components/ChangePictureModal";
import { CameraAlt as ImageIcon } from "@mui/icons-material";
import AddapartmentView from "../Components/AddApartmentView";
import ApartmentCard from "../Components/ApartmentCard";
import { default_user_avatar, updateUserProfile } from "../utils/Services";
import { User, UserProfile } from "../utils/types";
import { useAuth } from "../Hooks/useAuth";
export default function ProfilePage() {
  const [profImage, setProfImage] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profOpen, setProfOpen] = useState(false);
  const [encoded, setEncoded] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { userLoading, user } = useAuth();
  // const { decodedToken } = useJwt(token);
  const theme = useTheme();
  const setUserProfile = () => {
    setProfImage(user.image);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user?.email || "");
    setDescription(user?.description || "");
  };
  useEffect(() => {
    if (!userLoading) {
      setUserProfile();
    }
  }, [userLoading]);
  return (
    <Container sx={{ paddingBottom: 15 }}>
      <ChangePictureModal
        open={profOpen}
        setOpen={setProfOpen}
        setProfImage={setProfImage}
        setEncoded={setEncoded}
      />
      <Box
        component={"form"}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const updates: any = {};
          formData.forEach((item, key): any => {
            if (item !== "" && item != null) {
              updates[key] = item;
            }
          });
          if (profImage !== "") {
            updates.image = profImage;
          }
          // console.log(updates);
          updateUserProfile(updates);
        }}
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
            src={profImage || default_user_avatar}
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
                [theme.breakpoints.up("md")]: {
                  width: "40%",
                },
                [theme.breakpoints.down("md")]: {
                  width: "100% !important",
                },
              }}
            >
              <TextField
                className="round-input"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                fullWidth
              />
            </Grid>
            <Grid
              item
              sx={{
                [theme.breakpoints.up("md")]: {
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
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              // defaultValue={loaded ? userProfile?.email || "" : ""}
              sx={{
                mt: 5,
                [theme.breakpoints.down("md")]: {
                  my: 2,
                },
              }}
            />
            <TextField
              name="description"
              placeholder="Something about yourself "
              multiline
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
            />
            <Button
              type="submit"
              variant="contained"
              // onClick={handleSubmit}
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
