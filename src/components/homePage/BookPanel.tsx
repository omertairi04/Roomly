import { Box, Typography, TextField, Button, CardMedia } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ImageSlider } from "./ImageSlider";

type BookPanelProps = {
  closeDrawer: () => void;
  image: any;
  otherImages: any[];
  title: string;
  description: string;
  location: string;
  capacity: number;
  type: string;
  price: number;
  status: string;
};

const colors = {
  ink: "#1C1915",
  charcoal: "#2A2520",
  accent: "#C9622F",
  accentDark: "#9C4520",
  accentLight: "#F0DDD1",
  stone: "#9C8F7E",
  cream: "#FAF8F4",
  warm100: "#F0EBE1",
  warm200: "#DDD4C4",
  teal: "#2A6B6B",
  tealLight: "#E0EFEF",
};

export const BookPanel: React.FC<BookPanelProps> = ({
  title,
  location,
  capacity,
  type,
  price,
  image,
  otherImages,
  description,
  status,
  closeDrawer,
}) => {
  return (
    <Box
      sx={{
        width: 360,
        p: 3,
        backgroundColor: colors.cream,
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* ── Header ── */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: 22,
          color: colors.ink,
          fontWeight: 400,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>

      {/* ── Meta chips ── */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {[
          {
            icon: <PlaceOutlinedIcon sx={{ fontSize: 13 }} />,
            label: location,
          },
          {
            icon: <PlaceOutlinedIcon sx={{ fontSize: 13 }} />,
            label: `Up to ${capacity}`,
          },
          {
            icon: <AttachMoneyIcon sx={{ fontSize: 13 }} />,
            label: `$${price}/hr`,
          },
          { icon: null, label: type },
        ].map(({ icon, label }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: colors.warm100,
              border: `1px solid ${colors.warm200}`,
              borderRadius: "20px",
              px: 1.25,
              py: 0.4,
              fontSize: 12,
              fontWeight: 500,
              color: colors.charcoal,
            }}
          >
            {icon}
            {label}
          </Box>
        ))}
      </Box>

      {/* ── Image slider ── */}
      <ImageSlider mainImage={image} otherImages={otherImages} />

      {/* ── Divider ── */}
      <Box sx={{ height: "1px", backgroundColor: colors.warm200, my: 2.5 }} />

      {/* ── Time slot section ── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <AccessTimeIcon sx={{ fontSize: 16, color: colors.stone }} />
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: colors.stone,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Select your time slot
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <TextField
          label="From"
          type="time"
          variant="standard"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          sx={textFieldStyles}
        />
        <TextField
          label="To"
          type="time"
          variant="standard"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          sx={textFieldStyles}
        />
      </Box>

      {/* ── Price summary ── */}
      <Box
        sx={{
          mt: 2.5,
          p: 1.5,
          backgroundColor: colors.warm100,
          border: `1px solid ${colors.warm200}`,
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 13, color: colors.stone }}>
          Estimated total
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.ink }}>
          ${price}/hr
        </Typography>
      </Box>

      {/* ── Confirm button ── */}
      <Button
        variant="contained"
        fullWidth
        onClick={closeDrawer}
        sx={{
          mt: 2.5,
          backgroundColor: colors.accent,
          color: "#fff",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 15,
          borderRadius: "9px",
          py: 1.4,
          boxShadow: "none",
          "&:hover": { backgroundColor: colors.accentDark, boxShadow: "none" },
        }}
      >
        Confirm booking
      </Button>

      {/* ── Cancel ── */}
      <Button
        fullWidth
        onClick={closeDrawer}
        sx={{
          mt: 1,
          color: colors.stone,
          textTransform: "none",
          fontSize: 14,
          fontWeight: 400,
          "&:hover": { backgroundColor: colors.warm100, color: colors.ink },
        }}
      >
        Cancel
      </Button>
    </Box>
  );
};

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#fff",
    fontSize: 14,
    "& fieldset": { borderColor: "#DDD4C4" },
    "&:hover fieldset": { borderColor: "#9C8F7E" },
    "&.Mui-focused fieldset": { borderColor: "#C9622F" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#C9622F" },
};
