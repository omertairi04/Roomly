import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
  Drawer,
} from "@mui/material";
import React from "react";
import { Event } from "./HomeContent";
import { BookPanel } from "./BookPanel";

export const colors = {
  ink: "#1C1915",
  terracotta: "#C9622F",
  teal: "#2A6B6B",
  cream: "#FAF8F4",
};

const statusStyle = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return { label: "Active", color: "#2e7d32" };
    case "DRAFT":
      return { label: "Draft", color: "#888" };
    case "COMPLETED":
      return { label: "Completed", color: "#1565c0" };
    case "CANCELLED":
      return { label: "Cancelled", color: "#c62828" };
    default:
      return { label: status, color: "#888" };
  }
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function EventCard({ event }: { event: Event }) {
  const status = statusStyle(event.status);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const isCancelled = event.status === "CANCELLED";

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Coloured top bar based on status */}
      <Box
        sx={{
          height: 6,
          backgroundColor:
            event.status === "ACTIVE"
              ? colors.teal
              : event.status === "CANCELLED"
                ? "#c62828"
                : "#888",
        }}
      />

      <CardContent>
        <Typography
          variant="h6"
          sx={{ color: colors.ink, fontWeight: 600, mb: 0.5 }}
        >
          {event.title}
        </Typography>

        {event.venue && (
          <Typography variant="body2" sx={{ mb: 0.5, color: "#666" }}>
            📍 {event.venue.name}
            {event.venue.company && ` · ${event.venue.company.name}`}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mb: 1.5, color: "#888" }}>
          🗓 {formatDate(event.event_date)}
          {event.event_end_date && ` – ${formatDate(event.event_end_date)}`}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
        >
          <Chip
            label={`${event.max_capacity} seats`}
            size="small"
            sx={{ backgroundColor: colors.teal, color: "white" }}
          />
          <Chip
            label={status.label}
            size="small"
            sx={{
              backgroundColor: "#f0ebe5",
              color: status.color,
              fontWeight: 600,
            }}
          />
        </Stack>

        {event.description && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: "#666",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {event.description}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
            {Number(event.price) === 0 ? "Free" : `${event.price}€`}
          </Typography>

          {isCancelled ? (
            <Button disabled>Cancelled</Button>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => setOpenDrawer(true)}
                sx={{
                  backgroundColor: colors.terracotta,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#b55325" },
                }}
              >
                Reserve
              </Button>

              <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              >
                {/* TODO: plug in your BookPanel / ReservationPanel here */}
                <BookPanel
                  title={event.title}
                  location={event?.venue?.address || ""}
                  capacity={event.max_capacity}
                  type="Event"
                  price={event.price}
                  image="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                  otherImages={[
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
                  ]}
                  description={event.description}
                  status={event.status}
                  closeDrawer={() => setOpenDrawer(false)}
                />
              </Drawer>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
