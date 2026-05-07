import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const colors = {
  ink: "#1C1915",
  charcoal: "#2A2520",
  accent: "#C9622F",
  accentDark: "#9C4520",
  accentLight: "#F0DDD1",
  stone: "#9C8F7E",
  teal: "#2A6B6B",
  cream: "#FAF8F4",
  warm100: "#F0EBE1",
  warm200: "#DDD4C4",
};

const pages = ["Events", "Venues", "Companies", "My Reservations"];
const settings = ["My Profile", "My Reservations", "Settings", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activePage, setActivePage] = useState("Events");

  const handleOpenNavMenu = (e: any) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (e: any) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: colors.ink,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64 }}>
          {/* ── Logo (desktop) ── */}
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "10px",
              mr: 4,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                backgroundColor: colors.accent,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EventAvailableIcon sx={{ color: "#fff", fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 22,
                fontWeight: 400,
                color: "#fff",
                letterSpacing: "-0.3px",
                "& span": { color: colors.accent },
              }}
            >
              Kni<span>o</span>
            </Typography>
          </Box>

          {/* ── Hamburger (mobile) ── */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: colors.charcoal,
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: "10px",
                  mt: 1,
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    setActivePage(page);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    color:
                      activePage === page ? "#fff" : "rgba(255,255,255,0.6)",
                    backgroundColor:
                      activePage === page
                        ? `rgba(201, 98, 47, 0.18)`
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.07)",
                      color: "#fff",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 14 }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* ── Logo (mobile) ── */}
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: "8px",
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: colors.accent,
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EventAvailableIcon sx={{ color: "#fff", fontSize: 16 }} />
            </Box>
            <Typography
              sx={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 20,
                color: "#fff",
                "& span": { color: colors.accent },
              }}
            >
              Kni<span>o</span>
            </Typography>
          </Box>

          {/* ── Nav links (desktop) ── */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "2px",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  setActivePage(page);
                  handleCloseNavMenu();
                }}
                sx={{
                  fontSize: 14,
                  fontWeight: activePage === page ? 500 : 400,
                  color: activePage === page ? "#fff" : "rgba(255,255,255,0.6)",
                  backgroundColor:
                    activePage === page
                      ? `rgba(201, 98, 47, 0.20)`
                      : "transparent",
                  borderRadius: "8px",
                  px: 1.75,
                  py: 0.875,
                  textTransform: "none",
                  letterSpacing: 0,
                  transition: "all 0.18s",
                  "&:hover": {
                    backgroundColor:
                      activePage === page
                        ? `rgba(201, 98, 47, 0.25)`
                        : "rgba(255,255,255,0.07)",
                    color: "#fff",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* ── Right side: avatar + menu ── */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: colors.teal,
                    fontSize: 14,
                    fontWeight: 600,
                    border: `2px solid rgba(255,255,255,0.12)`,
                    transition: "border-color 0.18s",
                    "&:hover": { borderColor: "rgba(255,255,255,0.35)" },
                  }}
                >
                  AK
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "48px" }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: colors.charcoal,
                    border: `1px solid rgba(255,255,255,0.08)`,
                    borderRadius: "10px",
                    minWidth: 160,
                    mt: 0.5,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                  },
                },
              }}
            >
              {/* User info header */}
              <Box
                sx={{
                  px: 2,
                  py: 1.25,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                >
                  Alex K.
                </Typography>
                <Typography sx={{ fontSize: 12, color: colors.stone }}>
                  alex@email.com
                </Typography>
              </Box>

              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}
                  sx={{
                    fontSize: 14,
                    color:
                      setting === "Logout"
                        ? "#E87040"
                        : "rgba(255,255,255,0.7)",
                    py: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.07)",
                      color: setting === "Logout" ? "#F09060" : "#fff",
                    },
                  }}
                >
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
