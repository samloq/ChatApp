import React from 'react'
import './NavBar.css';

const NavBar = () => {
  return (
    <React.Fragment>
        <div className="nav-section">
            <ul>
                <li><i className="fa fa-comment-o" aria-hidden="true"></i></li>
                <li><i className="fa fa-calendar" aria-hidden="true"></i></li>
            </ul>
        </div>
    </React.Fragment>
  );
}

export default NavBar;
