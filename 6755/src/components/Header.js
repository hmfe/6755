import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <div className="header">
            <div className="container">
                <h1 className="header__title">H&M Work Task</h1>
            </div>
        </div>
        <div className="navlinks">
            <div className="container">
                <NavLink className="navlink" to="/" activeClassName="is-active" exact={true}>Simple Search</NavLink>
                <NavLink className="navlink" to="/css-wizardry" activeClassName="is-active" exact={true}>CSS-Wizardry</NavLink>
            </div>
        </div>
    </header>
);

export default Header;