import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import EventCard from "./EventCard";
import VenueCard from "./VenueCard";
import CompanyCard from "./CompanyCard";

export interface Company {
    company_id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
}

export interface Venue {
    venue_id: number;
    company_id: number;
    name: string;
    address: string;
    capacity: number;
    description: string;
    company?: Company;
}

export interface Event {
    event_id: number;
    venue_id: number;
    title: string;
    description: string;
    event_date: string;
    event_end_date: string;
    max_capacity: number;
    price: number;
    status: "ACTIVE" | "CANCELLED" | "COMPLETED" | "DRAFT";
    venue?: Venue;
}

const API = "http://localhost:4001/api";

interface HomeContentProps {
    defaultTab?: number;
}

const HomeContent: React.FC<HomeContentProps> = ({ defaultTab = 0 }) => {
    const [tab, setTab]             = useState(defaultTab);
    const [events, setEvents]       = useState<Event[]>([]);
    const [venues, setVenues]       = useState<Venue[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading]     = useState(true);

    useEffect(() => { setTab(defaultTab); }, [defaultTab]);

    useEffect(() => {
        Promise.all([
            fetch(`${API}/events`).then((r) => r.json()),
            fetch(`${API}/venues`).then((r) => r.json()),
            fetch(`${API}/companies`).then((r) => r.json()),
        ]).then(([eventsData, venuesData, companiesData]) => {
            setEvents(eventsData);
            setVenues(venuesData);
            setCompanies(companiesData);
            setLoading(false);
        });
    }, []);

    return (
        <Box>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}
                  sx={{ mb: 3, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <Tab label={`Events (${events.length})`} />
                <Tab label={`Venues (${venues.length})`} />
                <Tab label={`Companies (${companies.length})`} />
            </Tabs>

            {loading ? (
                <Typography color="text.secondary">Loading...</Typography>
            ) : (
                <>
                    {tab === 0 && (
                        <Grid container spacing={3}>
                            {events.map((event) => (
                                <Grid key={event.event_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                    <EventCard event={event} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {tab === 1 && (
                        <Grid container spacing={3}>
                            {venues.map((venue) => (
                                <Grid key={venue.venue_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                    <VenueCard venue={venue} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {tab === 2 && (
                        <Grid container spacing={3}>
                            {companies.map((company) => (
                                <Grid key={company.company_id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <CompanyCard company={company} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </Box>
    );
};

export default HomeContent;