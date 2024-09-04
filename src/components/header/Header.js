// src/components/header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import SearchBar from '../SearchBar/SearchBar'; // Adjust the path as needed
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <img className="header__icon" src={logo} alt="Logo" height="75px" />
                </Link>
                <Link to="/movies/popular" style={{ textDecoration: 'none' }}>
                    <span>Popular</span>
                </Link>
                <Link to="/movies/top_rated" style={{ textDecoration: 'none' }}>
                    <span>Top Rated</span>
                </Link>
                <Link to="/movies/upcoming" style={{ textDecoration: 'none' }}>
                    <span>Upcoming</span>
                </Link>
            </div>
            <div className="headerRight">
                <SearchBar /> {/* Include the SearchBar */}
            </div>
        </div>
    );
};

export default Header;
