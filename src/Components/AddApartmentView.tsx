import React, { FormEvent, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import "../App.css";
import {
  ExpandMore as ExpandMoreIcon,
  CameraAlt as ImageIcon,
  ConstructionOutlined,
} from "@mui/icons-material";
import ChangePictureModal from "./ChangePictureModal";
import {
  amenities,
  AmenitiesSet,
  createApartment,
  getUserApartment,
  updateApartment,
} from "../utils/Services";
import { Amenities, Apartment, UserProfile } from "../utils/types";
import { useAuth } from "../Hooks/useAuth";

export default function AddapartmentView() {
  const theme = useTheme();
  const [appOpen, setAppOpen] = useState(false);
  const [encoded, setEncoded] = useState("");
  const [profImage, setProfImage] = useState("");
  const [apartment, setApartment] = useState<any>(null);
  const [accordionLabel, setAccordionLabel] = useState<
    "Add Apartment" | "Update Apartment"
  >("Add Apartment");
  const [apartmentLoading, setApartmentLoading] = useState(true);
  // const { user, setUser, userLoading }= useAuth();

  const apart_input_arr = {
    City: "city",
    Address: "address",
    "Distance From Center": "distanceFromCenter",
    "Num Of Beds": "numOfBeds",
  };
  const setUserApartment = async () => {
    const apart = await getUserApartment();
    if (apart) {
      setAccordionLabel("Update Apartment");
      setApartment(apart);
    }
    setApartmentLoading(false);
  };
  // useEffect(() => {
  //   console.log({ encoded });
  // }, [encoded]);
  useEffect(() => {
    if (!apartmentLoading && apartment) {
      // console.log({ apartment });
      setProfImage(apartment.image);
    }
    setUserApartment();
  }, [apartmentLoading]);

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
          {accordionLabel}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const apartment_input: Apartment = {};
            // apartment_input.city = formData.get("city")?.toString();
            // const apartment_input: any = {};
            formData.forEach((value: any, key: string) => {
              // console.log(`${key}: ${value}`);
              if (key in AmenitiesSet) {
                apartment_input[key as keyof Amenities] = !!value;
              } else {
                apartment_input[key.replaceAll(" ", "") as keyof Apartment] =
                  value;
              }
            });
            if (profImage !== "") {
              apartment_input.image = profImage;
            }
            if (apartment && apartment !== null && apartment != null) {
              updateApartment(apartment_input);
            } else {
              createApartment(apartment_input);
            }
            setApartment(apartment_input);
          }}
        >
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
              setEncoded={setEncoded}
            />
            {apartmentLoading ? null : (
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
                {Object.entries(apart_input_arr).map((item, i) => {
                  return (
                    <TextField
                      key={item[1]}
                      name={item[0]}
                      defaultValue={apartment ? apartment[item[1]] : ""}
                      type={i > 1 ? "number" : "string"}
                      placeholder={item[0]}
                      sx={{ mt: i > 0 ? 3 : 0 }}
                    />
                  );
                })}
                <TextField
                  name="Description"
                  placeholder="Description"
                  defaultValue={apartment ? apartment.description : ""}
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
            )}
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

          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column ",
              ml: 4,
              mb: 4,
            }}
          >
            {apartmentLoading
              ? null
              : Object.keys(AmenitiesSet).map((item) => {
                  return (
                    <Box
                      sx={{ display: "flex", alignItems: "center" }}
                      key={item}
                    >
                      <Checkbox
                        name={item}
                        defaultChecked={
                          apartment ? apartment[item.toLowerCase()] : false
                        }
                      />
                      <Typography>{item}</Typography>
                    </Box>
                  );
                })}
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mb: 3, ml: 3, py: 1.5 }}
            >
              <Typography variant="h5" fontSize="20px" textTransform="none">
                {accordionLabel}
              </Typography>
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
