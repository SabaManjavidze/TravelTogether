import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { Close, Check } from "@mui/icons-material";
import {
  amenities,
  AmenitiesSet,
  getApartmentDetails,
} from "../../utils/Services";
import BookNowForm from "./components/BookNowForm";
import BookedDatesView from "./components/BookedDatesView";
import amenitiesRenderItem from "./components/amenitiesRenderItem";
export default function DetailsPage() {
  const params = useParams();
  const [apartmentDetails, setApartmentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const fetchApartmentDetails = async () => {
    if (params.id) {
      const apartment_details = await getApartmentDetails(params.id);
      setApartmentDetails(apartment_details.apartment);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApartmentDetails();
  }, []);
  return (
    <Container
      sx={{ height: "100%", maxWidth: "60%", pb: 15 }}
      maxWidth={false}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              my={1.5}
            >
              <LocationIcon fontSize="large" sx={{ color: "text.primary" }} />
              {loading ? (
                <LinearProgress />
              ) : (
                <Typography variant="h5" fontSize={25} mx={1}>
                  {apartmentDetails?.city}, {apartmentDetails?.address}
                </Typography>
              )}
            </Typography>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "500px",
                  height: "450px",
                  bgcolor:
                    theme.palette.mode == "dark"
                      ? "rgb(99 98 98 / 50%)"
                      : "rgb(59 59 59 / 50%)",
                }}
              >
                <CircularProgress sx={{ color: theme.palette.primary.light }} />
              </Box>
            ) : (
              <img
                src={apartmentDetails?.image}
                alt=""
                width="500px"
                height="450px"
                style={{
                  borderRadius: 5,
                  objectFit: "cover",
                  boxShadow: "0px 0px 20px ffffff3b",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
              ml: 10,
            }}
          >
            {loading ? (
              <Box sx={{ width: "30vh" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                <Typography variant="h4">
                  {apartmentDetails?.distanceFromCenter} meters from center
                </Typography>
                <Typography variant="h4" mt={2}>
                  {apartmentDetails?.numOfBeds} beds
                </Typography>
                <Typography variant="h3" mt={2}>
                  Amenities
                </Typography>
                <Box>
                  {Object.keys(AmenitiesSet).map((item, index) =>
                    amenitiesRenderItem({ item, index, apartmentDetails })
                  )}
                </Box>
              </Box>
            )}
            {/* <Typography  variant="h6"></Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            diplay: "flex",
            justifyContent: "start",
            alignItems: "center",
            textAlign: "left",
            width: "100%",
            // ml: 20,
          }}
        >
          <Typography variant="h5" fontSize={"2rem"} my={2}>
            Description :
          </Typography>
          <Box
            sx={{
              diplay: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                // textAlign: "left",
                // lineHeight: "1.5rem",
                // fontSize: 15,
                maxWidth: "70vh",
              }}
            >
              {apartmentDetails?.description}
            </Typography>
          </Box>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ mt: 15, width: "100%" }}>
            <Box mb={10}>
              <BookNowForm ownerId={apartmentDetails.ownerId} />
            </Box>
            <Typography
              sx={{ textTransform: "none" }}
              variant="h3"
              ml={5}
              mb={4}
            >
              Booked Dates
            </Typography>
            <BookedDatesView />
          </Box>
        )}
      </Box>
    </Container>
  );
}
