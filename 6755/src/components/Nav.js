import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="navlinks">
        <div className="container">
            <NavLink className="navlink" to="/" activeClassName="is-active" exact={true}>Simple Search</NavLink>
            <NavLink className="navlink" to="/css-wizardry" activeClassName="is-active" exact={true}>CSS-Wizardry</NavLink>
        </div>
    </nav>
);

export default Nav;