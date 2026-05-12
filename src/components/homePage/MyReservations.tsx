import React, {useEffect, useState} from "react";
import {
    Box, Container, Typography, Chip, Skeleton,
    IconButton, Tooltip, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Divider, Alert, Snackbar
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import EuroIcon from "@mui/icons-material/Euro";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import InboxIcon from "@mui/icons-material/Inbox";
import DeleteIcon from "@mui/icons-material/Delete";

const colors = {
    ink: "#1C1915",
    accent: "#C9622F",
    teal: "#2A6B6B",
    cream: "#FAF8F4",
    warm100: "#F0EBE1",
    warm200: "#DDD4C4",
    stone: "#9C8F7E",
};

interface Venue {
    venue_id: number;
    name: string;
    address: string;
}

interface Event {
    event_id: number;
    title: string;
    description: string;
    event_date: string;
    event_end_date?: string;
    price: number;
    status: string;
    venue?: Venue;
}

interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
}

interface Reservation {
    reservation_id: number;
    event_id: number;
    user_id: number;
    seats: number;
    status: "CONFIRMED" | "PENDING" | "CANCELLED";
    reserved_at: string;
    event?: Event;
    user?: User;
}

const API = "http://localhost:4001/api";

// Replace with your auth context when you add login
const LOGGED_IN_USER_ID = 1;
const LOGGED_IN_USER_NAME = "Alex K.";

const statusConfig = {
    CONFIRMED: {label: "Confirmed", bg: "#e8f5e9", color: "#2e7d32", dot: "#4caf50"},
    PENDING: {label: "Pending", bg: "#fff8e1", color: "#f57f17", dot: "#ffb300"},
    CANCELLED: {label: "Cancelled", bg: "#ffebee", color: "#c62828", dot: "#ef5350"},
};

const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"});

const fmtShort = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "short"});

// ── Skeleton ──────────────────────────────────────────────────
function ReservationSkeleton() {
    return (
        <Box sx={{borderRadius: "16px", border: `1px solid ${colors.warm200}`, p: 3, mb: 2}}>
            <Skeleton variant="text" width="60%" height={28}/>
            <Skeleton variant="text" width="40%" height={20} sx={{mt: 1}}/>
            <Skeleton variant="rectangular" height={48} sx={{mt: 2, borderRadius: 2}}/>
        </Box>
    );
}

// ── Cancel dialog ─────────────────────────────────────────────
function CancelDialog({open, reservation, onClose, onConfirm}: {
    open: boolean; reservation: Reservation | null;
    onClose: () => void; onConfirm: () => void;
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "16px",
                        p: 0.5,
                    },
                },
            }}
        >
            <DialogTitle sx={{fontWeight: 700, color: colors.ink, pb: 0}}>
                Cancel Reservation
            </DialogTitle>

            <DialogContent sx={{pt: 1.5}}>
                <Typography variant="body2" color="text.secondary">
                    Are you sure you want to cancel your reservation for{" "}
                    <b>{reservation?.event?.title}</b>? This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions sx={{px: 3, pb: 2.5, gap: 1}}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        borderColor: colors.warm200,
                        color: colors.ink,
                    }}
                >
                    Go Back
                </Button>

                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#c62828",
                        "&:hover": {
                            backgroundColor: "#a52020",
                        },
                    }}
                >
                    Cancel Reservation
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// ── Info item ─────────────────────────────────────────────────
function InfoItem({icon, label, value}: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <Box sx={{display: "flex", alignItems: "flex-start", gap: 1}}>
            <Box sx={{mt: 0.3}}>{icon}</Box>
            <Box>
                <Typography variant="caption"
                            sx={{color: colors.stone, fontSize: 11, display: "block", mb: 0.1}}>
                    {label}
                </Typography>
                <Typography variant="body2"
                            sx={{fontWeight: 600, color: colors.ink, fontSize: 13}}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

// ── Reservation card ──────────────────────────────────────────
function ReservationCard({reservation, onCancel}: {
    reservation: Reservation; onCancel: (r: Reservation) => void;
}) {
    const sc = statusConfig[reservation.status] ?? statusConfig.CONFIRMED;
    const event = reservation.event;
    const venue = event?.venue;
    const isPast = event ? new Date(event.event_date) < new Date() : false;
    const canCancel = (reservation.status === "CONFIRMED" || reservation.status === "PENDING") && !isPast;

    return (
        <Box sx={{
            borderRadius: "16px",
            border: `1px solid ${colors.warm200}`,
            backgroundColor: "#fff",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            overflow: "hidden", mb: 2,
            transition: "box-shadow 0.2s, transform 0.2s",
            "&:hover": {boxShadow: "0 8px 32px rgba(0,0,0,0.10)", transform: "translateY(-2px)"},
        }}>
            <Box sx={{
                height: 5,
                backgroundColor: reservation.status === "CANCELLED" ? "#ef5350"
                    : isPast ? colors.stone : colors.teal,
            }}/>

            <Box sx={{p: 3}}>
                {/* Header */}
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", mb: 2
                }}>
                    <Box sx={{flex: 1, pr: 2}}>
                        <Typography variant="h6"
                                    sx={{fontWeight: 700, color: colors.ink, lineHeight: 1.3, mb: 0.5}}>
                            {event?.title ?? "—"}
                        </Typography>
                        {venue && (
                            <Box sx={{display: "flex", alignItems: "center", gap: 0.5}}>
                                <LocationOnIcon sx={{fontSize: 14, color: colors.stone}}/>
                                <Typography variant="body2" sx={{color: colors.stone, fontSize: 13}}>
                                    {venue.name}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Chip
                        label={
                            <Box sx={{display: "flex", alignItems: "center", gap: 0.75}}>
                                <Box sx={{
                                    width: 7, height: 7, borderRadius: "50%",
                                    backgroundColor: sc.dot
                                }}/>
                                {sc.label}
                            </Box>
                        }
                        size="small"
                        sx={{
                            backgroundColor: sc.bg, color: sc.color,
                            fontWeight: 600, fontSize: 12, height: 26
                        }}
                    />
                </Box>

                <Divider sx={{borderColor: colors.warm100, mb: 2}}/>

                {/* Info grid */}
                <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2}}>
                    <InfoItem
                        icon={<CalendarMonthIcon sx={{fontSize: 16, color: colors.accent}}/>}
                        label="Date"
                        value={event ? fmt(event.event_date) : "—"}
                    />
                    <InfoItem
                        icon={<EventSeatIcon sx={{fontSize: 16, color: colors.accent}}/>}
                        label="Seats"
                        value={`${reservation.seats} ${reservation.seats === 1 ? "seat" : "seats"}`}
                    />
                    <InfoItem
                        icon={<EuroIcon sx={{fontSize: 16, color: colors.accent}}/>}
                        label="Total Price"
                        value={Number(event?.price) === 0 ? "Free"
                            : `${(Number(event?.price) * reservation.seats).toFixed(2)} €`}
                    />
                    <InfoItem
                        icon={<ConfirmationNumberIcon sx={{fontSize: 16, color: colors.accent}}/>}
                        label="Reservation #"
                        value={`#${String(reservation.reservation_id).padStart(5, "0")}`}
                    />
                </Box>

                {/* Footer */}
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", pt: 1,
                    borderTop: `1px solid ${colors.warm100}`
                }}>
                    <Typography variant="caption" sx={{color: colors.stone}}>
                        Reserved on {fmtShort(reservation.reserved_at)}
                        {isPast && (
                            <Chip label="Past event" size="small"
                                  sx={{
                                      ml: 1, fontSize: 10, height: 18,
                                      backgroundColor: colors.warm100, color: colors.stone
                                  }}/>
                        )}
                    </Typography>
                    {canCancel && (
                        <Tooltip title="Cancel reservation">
                            <IconButton size="small" onClick={() => onCancel(reservation)}
                                        sx={{
                                            color: colors.stone,
                                            "&:hover": {
                                                color: "#c62828",
                                                backgroundColor: "rgba(198,40,40,0.06)"
                                            }
                                        }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

// ── Empty state ───────────────────────────────────────────────
function EmptyState({filter}: { filter: string }) {
    return (
        <Box sx={{textAlign: "center", py: 10}}>
            <InboxIcon sx={{fontSize: 56, color: colors.warm200, mb: 2}}/>
            <Typography variant="h6" sx={{fontWeight: 600, color: colors.stone, mb: 1}}>
                No reservations found
            </Typography>
            <Typography variant="body2" sx={{color: colors.stone}}>
                {filter === "ALL"
                    ? "Once you reserve an event, it will appear here."
                    : `You have no ${filter.toLowerCase()} reservations.`}
            </Typography>
        </Box>
    );
}

// ── Filter tab ────────────────────────────────────────────────
type FilterType = "ALL" | "CONFIRMED" | "PENDING" | "CANCELLED";

function FilterTab({label, count, active, onClick}: {
    label: string; count: number; active: boolean; onClick: () => void;
}) {
    return (
        <Box onClick={onClick} sx={{
            px: 2, py: 1, borderRadius: "8px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 1,
            backgroundColor: active ? colors.ink : "transparent",
            transition: "all 0.15s",
            "&:hover": {backgroundColor: active ? colors.ink : colors.warm100},
        }}>
            <Typography sx={{
                fontSize: 13, fontWeight: 600,
                color: active ? "#fff" : colors.stone
            }}>
                {label}
            </Typography>
            {count > 0 && (
                <Box sx={{
                    backgroundColor: active ? colors.accent : colors.warm200,
                    color: active ? "#fff" : colors.stone,
                    borderRadius: "20px", px: 1, py: 0.1,
                    fontSize: 11, fontWeight: 700, minWidth: 20, textAlign: "center",
                }}>
                    {count}
                </Box>
            )}
        </Box>
    );
}

// ── Main page ─────────────────────────────────────────────────
export default function MyReservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>("ALL");
    const [cancelTarget, setCancelTarget] = useState<Reservation | null>(null);
    const [toast, setToast] = useState<{
        open: boolean; msg: string; severity: "success" | "error"
    }>({open: false, msg: "", severity: "success"});

    const showToast = (msg: string, severity: "success" | "error" = "success") =>
        setToast({open: true, msg, severity});

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/reservations`);
            const data: Reservation[] = await res.json();
            // Filter to only show the logged-in user's reservations
            setReservations(data.filter(r => r.user_id === LOGGED_IN_USER_ID));
        } catch {
            showToast("Failed to load reservations.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleCancel = async () => {
        if (!cancelTarget) return;
        try {
            const res = await fetch(`${API}/reservations/${cancelTarget.reservation_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status: "CANCELLED"}),
            });
            if (!res.ok) throw new Error();
            setCancelTarget(null);
            showToast("Reservation cancelled successfully.");
            fetchReservations();
        } catch {
            showToast("Failed to cancel reservation.", "error");
        }
    };

    const filtered = filter === "ALL"
        ? reservations
        : reservations.filter(r => r.status === filter);

    const counts = {
        ALL: reservations.length,
        CONFIRMED: reservations.filter(r => r.status === "CONFIRMED").length,
        PENDING: reservations.filter(r => r.status === "PENDING").length,
        CANCELLED: reservations.filter(r => r.status === "CANCELLED").length,
    };

    return (
        <Box sx={{backgroundColor: colors.cream, minHeight: "100vh", pt: 5, pb: 10}}>
            <Container maxWidth="md">

                {/* Header */}
                <Box sx={{mb: 4}}>
                    <Typography variant="overline"
                                sx={{color: colors.accent, fontWeight: 700, letterSpacing: 2, fontSize: 11}}>
                        MY ACCOUNT
                    </Typography>
                    <Typography variant="h4"
                                sx={{fontWeight: 800, color: colors.ink, mt: 0.5, mb: 0.5}}>
                        My Reservations
                    </Typography>
                    <Typography variant="body2" sx={{color: colors.stone}}>
                        Welcome back, <b>{LOGGED_IN_USER_NAME}</b> — manage all your event reservations here.
                    </Typography>
                </Box>

                {/* Filter tabs */}
                <Box sx={{
                    display: "flex", gap: 0.5, mb: 3, flexWrap: "wrap",
                    backgroundColor: colors.warm100,
                    borderRadius: "12px", p: 0.75, width: "fit-content",
                }}>
                    {([
                        {key: "ALL", label: "All"},
                        {key: "CONFIRMED", label: "Confirmed"},
                        {key: "PENDING", label: "Pending"},
                        {key: "CANCELLED", label: "Cancelled"},
                    ] as { key: FilterType; label: string }[]).map(f => (
                        <FilterTab
                            key={f.key}
                            label={f.label}
                            count={counts[f.key]}
                            active={filter === f.key}
                            onClick={() => setFilter(f.key)}
                        />
                    ))}
                </Box>

                {/* Content */}
                {loading ? (
                    <><ReservationSkeleton/><ReservationSkeleton/><ReservationSkeleton/></>
                ) : filtered.length === 0 ? (
                    <EmptyState filter={filter}/>
                ) : (
                    filtered.map(r => (
                        <ReservationCard
                            key={r.reservation_id}
                            reservation={r}
                            onCancel={setCancelTarget}
                        />
                    ))
                )}
            </Container>

            <CancelDialog
                open={Boolean(cancelTarget)}
                reservation={cancelTarget}
                onClose={() => setCancelTarget(null)}
                onConfirm={handleCancel}
            />

            <Snackbar open={toast.open} autoHideDuration={3500}
                      onClose={() => setToast(t => ({...t, open: false}))}>
                <Alert severity={toast.severity} sx={{borderRadius: "10px"}}>
                    {toast.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
}