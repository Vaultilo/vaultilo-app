import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import passwordsDown from "./svg/passwords-down.svg";
import passwordsUp from "./svg/passwords-up.svg";
import itemsDown from "./svg/items-down.svg";
import itemsUp from "./svg/items-up.svg";
import cryptoDown from "./svg/crypto-down.svg";
import cryptoUp from "./svg/crypto-up.svg";
import notesDown from "./svg/notes-down.svg";
import notesUp from "./svg/notes-up.svg";

export default function Sidebar(props) {
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
    <div className="sidenav">
      <Link
        className={`dropdown-btn ${activeNav === "items" ? "active" : ""}`}
        to="/items/all"
        onClick={() => handleNavClick("items")}
      >
        <div className="nav-item">
          {activeNav === "items" ? (
            <div className="curve-up">
              <img src={itemsUp} />
            </div>
          ) : null}
          <i className="fa fa-lock" />
          <span className="nav-title">All Items</span>
          {activeNav === "items" ? (
            <div className="curve-down">
              <img src={itemsDown} />
            </div>
          ) : null}
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${activeNav === "passwords" ? "active" : ""}`}
        to="/passwords/all"
        onClick={() => handleNavClick("passwords")}
      >
        <div className="nav-item">
          {activeNav === "passwords" ? (
            <div className="curve-up">
              <img src={passwordsUp} />
            </div>
          ) : null}
          <i className="fa fa-lock" />
          <span className="nav-title">Password</span>
          {activeNav === "passwords" ? (
            <div className="curve-down">
              <img src={passwordsDown} />
            </div>
          ) : null}
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${activeNav === "crypto" ? "active" : ""}`}
        to="/crypto/all"
        onClick={() => handleNavClick("crypto")}
      >
        <div className="nav-item">
          {activeNav === "crypto" ? (
            <div className="curve-up">
              <img src={cryptoUp} />
            </div>
          ) : null}
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
                    to={`/crypto/${subType}`}
                    onClick={() => handleSubNavClick(subType)}
                  >
                    {subType}
                  </Link>
                );
              }
            )}
          </div>
          {activeNav === "crypto" ? (
            <div className="curve-down">
              <img src={cryptoDown} />
            </div>
          ) : null}
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${activeNav === "notes" ? "active" : ""}`}
        to="/notes/all"
        onClick={() => handleNavClick("notes")}
      >
        <div className="nav-item">
          {activeNav === "notes" ? (
            <div className="curve-up">
              <img src={notesUp} />
            </div>
          ) : null}
          <i className="fa fa-lock" />
          <span className="nav-title">Note</span>
          {activeNav === "notes" ? (
            <div className="curve-down">
              <img src={notesDown} />
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
