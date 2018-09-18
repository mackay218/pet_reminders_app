import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to='/reminders'>
            Reminders
          </Link>
        </li>
        <li>
          <Link to='/addOwner'>
            Add Owner
          </Link>
        </li>
        <li>
          <Link to='/settings'>
            Reminder settings
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
