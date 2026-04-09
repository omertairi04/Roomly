import React from "react";
import HomeContent from "../components/homePage/HomeContent";
import NavBar from "../components/homePage/NavBar";

const HomePage: React.FC = () => {

    return  (
        <div>
            <NavBar />
            <HomeContent />
        </div>
    );
}

export default HomePage;