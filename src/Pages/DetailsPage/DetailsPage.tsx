import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { fake_aparts } from "../../Components/MOCK_DATA";
import { LocationOn as LocationIcon } from "@mui/icons-material";
import { Close, Check } from "@mui/icons-material";
export default function DetailsPage() {
  const params = useParams();
  //   const [apar, setApar] = useState<UserApartment>();
  const apar = useMemo(() => {
    return fake_aparts.find((item) => item.id == params.id);
  }, []);
  //   useEffect(() => {
  //     setApar();
  //   }, []);
  const amenities = ["wifi", "pool", "gym", "parking"];
  return (
    <Container sx={{ height: "100%" }}>
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

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.primary"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              my={1.5}
            >
              <LocationIcon fontSize="large" />
              <Typography variant="h5" fontSize={25} color="text.primary">
                {apar?.city}, {apar?.address}
              </Typography>
            </Typography>
            <img
              src={apar?.image}
              alt=""
              width="500px"
              height="450px"
              style={{
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: "0px 0px 20px ffffff3b",
              }}
            />
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
            <Box>
              <Typography color="text.primary" variant="h6">
                {apar?.distance_from_center} meters from center
              </Typography>
              <Typography color="text.primary" variant="h6">
                {apar?.num_of_beds} beds
              </Typography>
              <Typography color="text.primary" variant="h5" my={2}>
                Amenities
              </Typography>
              <Box>
                {amenities.map((item, index) => {
                  return (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        color: "text.primary",
                      }}
                    >
                      <Typography sx={{ lineHeight: 0, ml: 5, width: "50%" }}>
                        {index % 2 == 0 ? (
                          <Close color="error" />
                        ) : (
                          <Check color="success" />
                        )}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ pr: 5, width: "50%", textAlign: "left" }}
                      >
                        {item}
                      </Typography>
                    </Typography>
                  );
                })}
              </Box>
            </Box>
            {/* <Typography color="text.primary" variant="h6"></Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            diplay: "flex",
            justifyContent: "start",
            alignItems: "center",
            textAlign: "left",
            width: "100%",
            ml: 20,
          }}
        >
          <Typography
            variant="h5"
            fontSize={"2rem"}
            color="text.primary"
            my={2}
          >
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
                lineHeight: "1.5rem",
                maxWidth: 700,
                fontSize: 15,
              }}
              color="text.primary"
            >
              {apar?.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
