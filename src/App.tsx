import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/homePage/NavBar";
import HomeContent from "./components/homePage/HomeContent";
import MyReservations from "./components/homePage/MyReservations";
import AdminPage from "./pages/AdminPage";


// If you have separate pages for Venues and Companies, import them here too.
// For now they fall back to HomeContent with a tab pre-selected,
// or you can create dedicated pages later.

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomeContent defaultTab={0}/>}/>
                <Route path="/venues" element={<HomeContent defaultTab={1}/>}/>
                <Route path="/companies" element={<HomeContent defaultTab={2}/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/my-reservations" element={<MyReservations/>}/>
            </Routes>
        </BrowserRouter>
    );
}