import React, { ChangeEventHandler, FormEvent, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { SxProps, TextField, Typography, useTheme } from "@mui/material";
import { Theme } from "@mui/system";

const style: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ChangePictureModal({
  setOpen,
  open,
  setProfImage,
}: any) {
  const [localImage, setLocalImage] = useState<any>();
  const theme = useTheme();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column ",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5" color="text.primary">
                  Enter a new picture URL
                </Typography>
                <TextField
                  placeholder="Enter image url"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  pt: 5,
                  // bgcolor: "black",
                }}
              >
                <Typography variant="h5" color="text.primary">
                  Upload local image
                </Typography>
                {/* <Button sx={{ mt: 3 }} variant="outlined"> */}
                <TextField
                  type="file"
                  // value={localImage}
                  onChange={(e: any) => {
                    setLocalImage(e.target.files[0]);
                  }}
                />
                {localImage ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: 3,
                    }}
                  >
                    <img
                      alt="not fount"
                      width={"250px"}
                      src={URL.createObjectURL(localImage)}
                    />
                  </Box>
                ) : null}

                {/* <Typography variant="subtitle1" color="primary">
                    Choose a file
                  </Typography>
                </Button> */}
              </Box>
              <Button
                variant="contained"
                sx={{ mt: 5, width: "100%" }}
                onClick={() => {
                  setOpen(false);
                  setLocalImage(null);
                  setProfImage(URL.createObjectURL(localImage));
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.paper"
                  textTransform={"none"}
                >
                  Save
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                onClick={() => {
                  setOpen(false);
                  setLocalImage(null);
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="primary.light"
                  textTransform={"none"}
                >
                  Cancel
                </Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
