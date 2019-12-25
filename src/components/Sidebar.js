import React, {useState} from "react";
import './Sidebar.css';
import {Link} from 'react-router-dom';

export default function Sidebar(props) {
  const credentials = props.credentials === null ? [] : JSON.parse(props.credentials);
  const [activeNav, setActiveNav] = useState('crypto');
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
      <Link className={`dropdown-btn ${activeNav === 'crypto' ? 'active': ''}`} to="/crypto/all" onClick={() => handleNavClick('crypto')}>
        CryptoCurrencies
      </Link>
      <div className="dropdown-container">
        {[...new Set(credentials.map(cred => cred.type))].map(type => {
          return(
            <Link key={`crypto-${type}`} className={`${ activeSubNav === type ? 'active': ''}`} to={`/crypto/${type}`} onClick={() => handleSubNavClick(type)}>{type}</Link>
          )
        })}
      </div>
      <Link className={`dropdown-btn ${activeNav === 'notes' ? 'active': ''}`} to="/notes" onClick={() => handleNavClick('Notes')}>notes</Link>
    </div>
  );
}
