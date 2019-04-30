import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>H&M Work Task</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/css-wizardry" activeClassName="is-active" exact={true}>CSS-Wizardry</NavLink>
        <NavLink to="/simple-search" activeClassName="is-active" exact={true}>Simple Search</NavLink>
    </header>
);

export default Header;