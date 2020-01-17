import React, { useState } from "react";
import "../Sidebar.css";
import {Link,Redirect } from 'react-router-dom';
//import {}

export default function Extension(props) {
  const credentials =
    props.credentials === null ? [] : JSON.parse(props.credentials);
  const [activeNav, setActiveNav] = useState("items");
  const [activeSubNav, setActiveSubNav] = useState("");
  const handleNavClick = path => { 
    setActiveNav(path);
    setActiveSubNav("");
  };
  const handleSubNavClick = path => {
    setActiveSubNav(path);
   
  };
  return (
    <div className="side-content" style={{borderRadius:"0px",height:"650px",width:"410px"}} >
      <Link
        className={`dropdown-btn ${activeNav === "passwords" ? "active" : ""}`}
        to='/extension/passwords'
        onClick={() => handleNavClick("passwords")}
      >
        <div className="nav-item">
          <i className="fa fa-lock" />
          <span className="nav-title">Passwords</span>
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${activeNav === "crypto" ? "active" : ""}`}
        onClick={() => handleNavClick("crypto")}

      >
        <div className="nav-item">
          <i className="fa fa-lock" />
          <span className="nav-title">Crypto Wallets</span>
          <div
            className={`dropdown-container ${
              activeNav === "crypto" ? "d-block" : "d-none"
            }`}
          >
            {[...new Set(credentials.map(cred => cred.subType))].map(
              subType => {
                return (
                  <Link
                    key={`crypto-${subType}`}
                    className={`${activeSubNav === subType ? "active" : ""}`}
                    to={`/extension/crypto/${subType}`}
                    onClick={() => handleSubNavClick(subType)}
                  >
                   <div style={{color:"#FFFFFF"}}>{subType}</div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${activeNav === "notes" ? "active" : ""}`}
        to="/extension/notes"
        onClick={() => handleNavClick("notes")}
      >
        <div className="nav-item">
          <i className="fa fa-lock" />
          <span className="nav-title">Note</span>
        </div>
      </Link>
    </div>
  );
}

