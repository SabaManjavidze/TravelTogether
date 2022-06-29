import React, { FormEvent, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { CardTravel, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FormControlLabel, FormGroup, useTheme } from "@mui/material";
import { useColorMode } from "../App";
import { MaterialUISwitch } from "./MaterialUISwitch";
import ProfileIcon from "./NavBar/components/ProfileIcon";
import { useAuth } from "../Hooks/useAuth";

const pages = [
  { title: "Find apartments", path: "search" },
  { title: "My Bookings", path: "mybookings" },
  { title: "My Guests", path: "myguests" },
];

export default function NavBar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const menuRenderItem = (title: any, path: any) => (
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
      <Link style={{ color: "black", textDecoration: "none" }} to={`/${path}`}>
        <Typography
          variant="h6"
          fontSize={16}
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
  );
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const { isLoggedIn } = useAuth();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLoggedIn ? (
            <>
              <CardTravel sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 5,
                  pr: 4,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".25rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                TravelTogether
              </Typography>
            </>
          ) : null}
          {isLoggedIn ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "white !important" }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* Collapsable Menu of NavLinks */}
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
                {pages.map(({ title, path }) => menuRenderItem(title, path))}
              </Menu>
            </Box>
          ) : null}
          {/* Website logo for phone screen  */}
          <Box
            sx={{
              display: isLoggedIn ? { xs: "flex", md: "none" } : "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CardTravel sx={{ mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                // flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: ".15rem",
                color: "inherit",
                textDecoration: "none",
                [theme.breakpoints.down("xsm")]: {
                  fontSize: "17px",
                  letterSpacing: ".1rem",
                },
              }}
            >
              TravelTogether
            </Typography>
          </Box>
          {/* Nav links for desktop screen */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ title, path }) => (
                <Link
                  key={title}
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
              ))}
            </Box>
          ) : null}
          {/* Theme switcher */}
          <MaterialUISwitch
            sx={
              isLoggedIn
                ? {
                    mr: 5,
                    [theme.breakpoints.down("sm")]: {
                      mr: 2,
                    },
                  }
                : {}
            }
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
          {isLoggedIn ? <ProfileIcon /> : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
