import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/companies" className="nav-item nav-link">Companies</NavLink>
                <NavLink to="/countries" className="nav-item nav-link">Countries</NavLink>
                <NavLink to="/leader" className="nav-item nav-link">Leader</NavLink>
                <NavLink to="/mining" className="nav-item nav-link">Mining</NavLink>
            </div>
        </nav>
    );
}

export default Nav;
