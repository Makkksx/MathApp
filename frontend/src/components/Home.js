import React from "react";
import HomeTagCloud from "./homeBlocks/HomeTagCloud";
import HomeTasks from "./homeBlocks/HomeTasks";

export const Home = () => {
    return (
        <div className="container mt-3 text-center">
            <HomeTagCloud/>
            <HomeTasks/>
        </div>
    )
}