import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Stack,
    Box, Drawer
} from "@mui/material";
import React from "react";

const colors = {
    ink: "#1C1915",
    terracotta: "#C9622F",
    teal: "#2A6B6B",
    cream: "#FAF8F4"
};

const getAvailability = (status: string) => {
    if (status === "available") {
        return {label: "Available", color: "#2e7d32"};
    }

    if (status === "limited") {
        return {label: "Few left", color: "#ed6c02"};
    }

    return {label: "Full", color: "#c62828"};
};

export default function SpotCard({spot}: any) {
    const availability = getAvailability(spot.status);

    const [openDrawer, setOpenDrawer] = React.useState(false);


    return (
        <Card
            sx={{
                borderRadius: "14px",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)"
                }
            }}
        >
            <CardMedia component="img" height="160" image={spot.image}/>

            <CardContent>
                <Typography
                    variant="h6"
                    sx={{color: colors.ink, fontWeight: 600}}
                >
                    {spot.name}
                </Typography>

                <Typography variant="body2" sx={{mb: 1.5, color: "#666"}}>
                    {spot.location}
                </Typography>

                <Stack direction="row" spacing={1} sx={{mb: 2}}>
                    <Chip
                        label={`${spot.capacity} seats`}
                        size="small"
                        sx={{
                            backgroundColor: colors.teal,
                            color: "white"
                        }}
                    />

                    <Chip
                        label={spot.type}
                        size="small"
                        sx={{
                            backgroundColor: "#f0ebe5",
                            color: colors.ink
                        }}
                    />
                </Stack>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <Typography sx={{fontWeight: 600}}>
                            {spot.price}€/hour
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 13,
                                color: availability.color
                            }}
                        >
                            ● {availability.label}
                        </Typography>
                    </Box>

                    {availability.label === "Full" ? (
                        <Button disabled>
                            Full
                        </Button>
                    ) : (
                        <><Button
                            variant="contained"
                            onClick={() => setOpenDrawer(true)}
                            sx={{
                                backgroundColor: colors.terracotta,
                                textTransform: "none",
                                fontWeight: 600,
                                "&:hover": {backgroundColor: "#b55325"}
                            }}
                        >
                            Book
                        </Button>
                            <Drawer
                                anchor="right"
                                open={openDrawer}
                                onClose={() => setOpenDrawer(false)}
                            >
                                <Box sx={{width: 320, p: 3}}>
                                    <Typography variant="h6">Book this spot</Typography>

                                    <Typography sx={{mt: 1}}>
                                        Select your time slot
                                    </Typography>

                                    <Button
                                        sx={{mt: 3}}
                                        variant="contained"
                                        onClick={() => setOpenDrawer(false)}
                                    >
                                        Confirm booking
                                    </Button>
                                </Box>
                            </Drawer></>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}