import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  CardMedia,
  Button,
} from "@mui/material";

import { useState } from "react";
import { Venue } from "./HomeContent";
import { colors } from "./EventCard";

const venueImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
];

export default function VenueCard({ venue }: { venue: Venue }) {
  const [open, setOpen] = useState(false);

  const image = venueImages[venue.venue_id % venueImages.length];

  return (
    <>
      <Card
        sx={{
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          transition: "0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={venue.name}
        />

        <Box sx={{ height: 6, backgroundColor: colors.teal }} />

        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {venue.name}
          </Typography>

          {venue.company && (
            <Typography variant="body2" sx={{ mb: 0.5, color: "#666" }}>
              🏢 {venue.company.name}
            </Typography>
          )}

          <Typography variant="body2" sx={{ mb: 1.5, color: "#888" }}>
            📍 {venue.address}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              label={`${venue.capacity} capacity`}
              size="small"
              sx={{
                backgroundColor: colors.teal,
                color: "white",
              }}
            />
          </Stack>

          {venue.description && (
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {venue.description}
            </Typography>
          )}

          <Typography
            sx={{
              mt: 2,
              borderRadius: "10px",
              color: colors.cream,
              fontWeight: 500,
              backgroundColor: "#0e7c7b",
            }}
          >
            <Typography sx={{marginLeft: "30px"}}>
              {" "}
              Contact us at {venue.company?.email} to reserve
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
