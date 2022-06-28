import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";

export default function ProfileIcon() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const settings = [
    { title: "Profile", path: "profile" },
    { title: "My Bookings", path: "mybookings" },
    { title: "My Guests", path: "myguests" },
    // { title: "LogOut", path: "/login" },
  ];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { userLoading, user, isLoggedIn }: any = useAuth();
  return (
    <Box
      sx={{
        flexGrow: 0,
      }}
    >
      {user != null ? (
        isLoggedIn ? (
          userLoading ? null : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                color="text.prymary"
                mr={3}
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                }}
              >
                {`${user.firstName[0].toUpperCase()}${user.firstName.slice(
                  1,
                  user.firstName.length
                )}`}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src={user.image}
                    // sx={{
                    //   color: theme.palette.mode === "dark" ? "white" : "white",
                    // }}
                    sx={{ color: "white" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          )
        ) : null
      ) : null}
      {/* Collapsable Profile Menu */}
      <Menu
        sx={{
          mt: "45px",
          ml: 1,
          // [theme.breakpoints.up("sm")]: { ml: 2 },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.title}
            onClick={handleCloseUserMenu}
            sx={{
              width: "100%",
            }}
          >
            <Link
              to={`/${setting.path}`}
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
                height: "100%",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{
                    textAlign: "center",
                    fontSize: 16,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "15px !important",
                    },
                  }}
                >
                  {setting.title}
                </Typography>
              </Box>
            </Link>
          </MenuItem>
        ))}
        <MenuItem
          sx={{ width: "100%" }}
          onClick={() => {
            // clear cookies
            // document.cookie = "";
          }}
          key="logout"
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{
                textAlign: "center",
                fontSize: 16,
                [theme.breakpoints.down("sm")]: {
                  fontSize: "15px !important",
                },
              }}
            >
              LogOut
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
