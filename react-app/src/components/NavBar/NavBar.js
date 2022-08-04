
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <div id="navbar">
      <div id="logo" >
        <h2>Foodgram</h2>
      </div>
      <div id="navlinks">
        <nav>
          <ul>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                <img src='images/home.png' alt='home' />
              </NavLink>
            </li>
            <li>
              <NavLink to='/posts' exact={true} activeClassName='active'>
                <img src="images/explore.png" alt="explore" />
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
