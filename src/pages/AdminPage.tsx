import React, { useState } from "react";
import { Box, Container, Tabs, Tab, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

import CompaniesAdmin from "./CompaniesAdmin";
import VenuesAdmin from "./VenuesAdmin";
import EventsAdmin from "./EventsAdmin";
import UsersAdmin from "./UsersAdmin";
import ReservationsAdmin from "./ReservationsAdmin";

const colors = {
  ink: "#1C1915",
  accent: "#C9622F",
  teal: "#2A6B6B",
  cream: "#FAF8F4",
};

const tabs = [
  {
    label: "Companies",
    icon: <BusinessIcon fontSize="small" />,
    component: <CompaniesAdmin />,
  },
  {
    label: "Venues",
    icon: <LocationOnIcon fontSize="small" />,
    component: <VenuesAdmin />,
  },
  {
    label: "Events",
    icon: <EventIcon fontSize="small" />,
    component: <EventsAdmin />,
  },
  {
    label: "Users",
    icon: <PeopleIcon fontSize="small" />,
    component: <UsersAdmin />,
  },
  {
    label: "Reservations",
    icon: <BookOnlineIcon fontSize="small" />,
    component: <ReservationsAdmin />,
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      sx={{ backgroundColor: colors.cream, minHeight: "100vh", pt: 4, pb: 8 }}
    >
      <Container maxWidth="xl">
        {/* Page header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: colors.ink, mb: 0.5 }}
          >
            Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ color: "#888" }}>
            Manage all data for the Knio platform
          </Typography>
        </Box>

        {/* Tab bar */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            mb: 3,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: 14,
              minHeight: 48,
              gap: 0.75,
            },
            "& .Mui-selected": { color: `${colors.accent} !important` },
            "& .MuiTabs-indicator": { backgroundColor: colors.accent },
          }}
        >
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>

        {/* Active panel */}
        <Box sx={{ mt: 2 }}>{tabs[activeTab].component}</Box>
      </Container>
    </Box>
  );
}
