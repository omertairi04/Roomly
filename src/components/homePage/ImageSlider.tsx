import { useState } from "react";
import { Box, CardMedia, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type ImageSliderProps = {
    mainImage: string;
    otherImages?: string[];
};

const colors = {
    ink:    "#1C1915",
    accent: "#C9622F",
};

export const ImageSlider: React.FC<ImageSliderProps> = ({ mainImage, otherImages = [] }) => {
    const allImages = [mainImage, ...otherImages];
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((i) => (i === 0 ? allImages.length - 1 : i - 1));
    const next = () => setCurrent((i) => (i === allImages.length - 1 ? 0 : i + 1));

    return (
        <Box sx={{ mt: 1 }}>

            {/* ── Main image ── */}
            <Box sx={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={`${allImages[current]}?auto=format&w=800&q=80`}
                    alt={`Room image ${current + 1}`}
                    sx={{ objectFit: "cover", display: "block", transition: "opacity 0.25s" }}
                />

                {/* Prev button */}
                <IconButton
                    onClick={prev}
                    size="small"
                    sx={{
                        position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                        backgroundColor: "rgba(28,25,21,0.55)", color: "#fff",
                        "&:hover": { backgroundColor: colors.accent },
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                </IconButton>

                {/* Next button */}
                <IconButton
                    onClick={next}
                    size="small"
                    sx={{
                        position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                        backgroundColor: "rgba(28,25,21,0.55)", color: "#fff",
                        "&:hover": { backgroundColor: colors.accent },
                    }}
                >
                    <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                </IconButton>

                {/* Counter badge */}
                <Box sx={{
                    position: "absolute", bottom: 8, right: 10,
                    backgroundColor: "rgba(28,25,21,0.6)", color: "#fff",
                    fontSize: 12, fontWeight: 500, px: 1.25, py: 0.25,
                    borderRadius: "20px", userSelect: "none",
                }}>
                    {current + 1} / {allImages.length}
                </Box>
            </Box>

            {/* ── Thumbnails ── */}
            <Box sx={{ display: "flex", gap: 1, mt: 1.25, overflowX: "auto", pb: 0.5 }}>
                {allImages.map((img, i) => (
                    <Box
                        key={i}
                        onClick={() => setCurrent(i)}
                        sx={{
                            flexShrink: 0, width: 64, height: 48,
                            borderRadius: "8px", overflow: "hidden", cursor: "pointer",
                            border: i === current
                                ? `2px solid ${colors.accent}`
                                : "2px solid transparent",
                            opacity: i === current ? 1 : 0.55,
                            transition: "all 0.18s",
                            "&:hover": { opacity: 1 },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={`${img}?auto=format&w=160&q=60`}
                            alt={`Thumbnail ${i + 1}`}
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Box>
                ))}
            </Box>

        </Box>
    );
};