import React, { useState } from "react";
import {
  AppBar, Box, IconButton, Toolbar, InputBase, Button, Typography, MenuItem, Menu,
} from "@mui/material";
import {
  Search, Menu as MenuIcon, DarkModeOutlined, LightOutlined, SettingsOutlined, ArrowDropDown,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import { setMode } from "../state";
import ProfileImage from "../assets/profile.jpeg";

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleOnClick = (event) => setAnchorEl(event.targetCurrent);
  const handleOnClose = () => setAnchorEl(null);

  return (
    <AppBar sx={{
      position: "static",
      background: "none",
      boxShadow: "none",
    }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween gap="0.5rem">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween sx={{
            background: theme.palette.background.alt,
            padding: "0.1rem 1.5rem",
            gap: "3rem",
            borderRadius: "9px",
          }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween sx={{ gap: "1.5rem" }}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightOutlined sx={{ fontSize: "25px" }} />
            ) : <DarkModeOutlined sx={{ fontSize: "25px" }} />}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleOnClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={ProfileImage}
                width="32px"
                height="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDown
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleOnClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleOnClose}>
                Logout
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
