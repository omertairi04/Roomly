import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Company } from "./HomeContent";
import { colors } from "./EventCard";

export default function CompanyCard({ company }: { company: Company }) {
    const initials = company.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

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
            <Box sx={{ height: 6, backgroundColor: colors.terracotta }} />

            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar
                        sx={{
                            backgroundColor: colors.terracotta,
                            width: 48,
                            height: 48,
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        {initials}
                    </Avatar>

                    <Typography variant="h6" sx={{ color: colors.ink, fontWeight: 600 }}>
                        {company.name}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                        ✉️ {company.email}
                    </Typography>

                    {company.phone && (
                        <Typography variant="body2" sx={{ color: "#666" }}>
                            📞 {company.phone}
                        </Typography>
                    )}

                    {company.address && (
                        <Typography variant="body2" sx={{ color: "#666" }}>
                            📍 {company.address}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
