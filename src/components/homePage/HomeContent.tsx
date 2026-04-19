import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import SpotCard from "./SpotCard";

interface Spot {
    id: number;
    name: string;
    location: string;
    capacity: number;
    type: string;
    price: number;
    image: string;
}

const HomeContent: React.FC = () => {
    const [spots, setSpots] = useState<Spot[]>([]);

    useEffect(() => {
        fetch("http://localhost:4001/spots")
            .then((res) => res.json())
            .then((data) => setSpots(data));
    }, []);

    return (
        <Grid container spacing={3}>
            {spots.map((spot) => (
                <Grid key={spot.id} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                    <SpotCard spot={spot}/>
                </Grid>
            ))}
        </Grid>
    );
};


export default HomeContent;