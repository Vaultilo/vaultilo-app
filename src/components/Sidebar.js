import React, {useState} from "react";
import './Sidebar.css';
import {Link} from 'react-router-dom';

export default function Sidebar(props) {
  const credentials = props.credentials === null ? [] : JSON.parse(props.credentials);
  const [activeNav, setActiveNav] = useState('items');
  const [activeSubNav, setActiveSubNav] = useState('');
  const handleNavClick = (path) => {
    setActiveNav(path);
    setActiveSubNav('');
  }
  const handleSubNavClick = (path) => {
    setActiveSubNav(path);
  }
  return (
    <div className="sidenav">
      <Link className={`dropdown-btn ${activeNav === 'items' ? 'active': ''}`} to="/items/all" onClick={() => handleNavClick('all')}>
        All Items
      </Link>
      <br />
      <Link className={`dropdown-btn ${activeNav === 'crypto' ? 'active': ''}`} to="/crypto/all" onClick={() => handleNavClick('crypto')}>
        Crypto Wallets
      </Link>
      <div className="dropdown-container">
        {[...new Set(credentials.map(cred => cred.subType))].map(subType => {
          return(
            <Link key={`crypto-${subType}`} className={`${ activeSubNav === subType ? 'active': ''}`} to={`/crypto/${subType}`} onClick={() => handleSubNavClick(subType)}>{subType}</Link>
          )
        })}
      </div>
      <Link className={`dropdown-btn ${activeNav === 'passwords' ? 'active': ''}`} to="/passwords/all" onClick={() => handleNavClick('passwords')}>Passwords</Link>
      <Link className={`dropdown-btn ${activeNav === 'notes' ? 'active': ''}`} to="/notes/all" onClick={() => handleNavClick('notes')}>Notes</Link>
    </div>
  );
}
