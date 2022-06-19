import React, { FormEvent, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { CardTravel, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FormControlLabel, FormGroup, useTheme } from "@mui/material";
import { useColorMode } from "../App";
import { MaterialUISwitch } from "./MaterialUISwitch";

const pages = [
  { title: "Find apartments", path: "search" },
  { title: "My Bookings", path: "mybookings" },
  { title: "My Guests", path: "myguests" },
];
const settings = [
  { title: "Profile", path: "profile" },
  { title: "My Bookings", path: "mybookings" },
  { title: "My Guests", path: "myguests" },
  { title: "LogOut", path: "/login" },
];

export default function NavBar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CardTravel sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            TravelTogether
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "white !important" }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {/* Collapsable Menu */}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mt: 1,
              }}
            >
              {pages.map(({ title, path }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    handleCloseNavMenu();
                  }}
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/${path}`}
                  >
                    <Typography
                      variant="h6"
                      fontSize={16}
                      color="text.primary"
                      textAlign="center"
                      sx={{
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "1rem",
                        },
                      }}
                    >
                      {title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Website logo for phone screen  */}
          <CardTravel sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              [theme.breakpoints.down("sm")]: {
                fontSize: "17px",
                letterSpacing: ".1rem",
              },
            }}
          >
            TravelTogether
          </Typography>
          {/* Nav links for desktop screen */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ title, path }) => (
              // <Button key={title} sx={{ my: 2, display: "block" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  textTransform: "none",
                  fontFamily: "monospace",
                  fontSize: "20px",
                  fontWeight: 700,
                  marginLeft: 15,
                  marginRight: 15,
                  textAlign: "center",
                }}
                to={`/${path}`}
              >
                {title}
              </Link>
              // </Button>
            ))}
          </Box>
          {/* Theme switcher */}
          <MaterialUISwitch
            sx={{ mr: 5 }}
            checked={theme.palette.mode === "dark"}
            onClick={(e: any) => {
              colorMode.toggleColorMode();
              localStorage.setItem(
                "theme",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
            }}
          />
          {/* Profile Icon */}
          <Box
            sx={{
              flexGrow: 0,
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Saba"
                  src="/static/images/avatar/2.jpg"
                  // sx={{
                  //   color: theme.palette.mode === "dark" ? "white" : "white",
                  // }}
                  sx={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
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
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
