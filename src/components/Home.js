import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return <>
        <h1 className="pageName">JUST DO IT!</h1>
        <ul>
            <li><Link to="/activities">Activities</Link></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </>
}

export default Home; 