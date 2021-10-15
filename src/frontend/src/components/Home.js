import React from "react";
import HomeTagCloud from "./HomeBlocks/HomeTagCloud";
import HomeTasks from "./HomeBlocks/HomeTasks";

export const Home = () => {
    return (
        <div className="container mt-3 text-center">
            <HomeTagCloud/>
            <HomeTasks/>
        </div>
    )
}