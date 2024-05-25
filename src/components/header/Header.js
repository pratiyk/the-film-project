import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
    return (
        
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <img className="header__icon" src={logo} height="75px" />
                </Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}>
                    <span>Popular</span>
                </Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
                    <span>Top Rated</span>
                </Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
                    <span>Upcoming</span>
                </Link>
                <div className="searchBar">
                    <input type="text" />
                    <button>Show All</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
