import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import up from "./images/up.svg";
import down from "./images/down.svg";

export default function Sidebar(props) {
  const { subType: subNav, type } = props.match.params;
  const credentials =
    props.credentials === null ? [] : JSON.parse(props.credentials);
  return (
    <div className="sidenav">
      <Link
        className={`dropdown-btn ${type === "items" ? "active" : ""}`}
        to="/items/all"
      >
        <div className="nav-item">
          {type === "items" ? (
            <div className="curve-up">
              <img src={up} />
            </div>
          ) : null}
          <div className="nav-title-block">            
            <i className="icon-list"/>
            <span className="nav-title">All Items</span>
          </div>
          {type === "items" ? (
            <div className="curve-down">
              <img src={down} />
            </div>
          ) : null}
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${type === "passwords" ? "active" : ""}`}
        to="/passwords/all"
      >
        <div className="nav-item">
          {type === "passwords" ? (
            <div className="curve-up">
              <img src={up} />
            </div>
          ) : null}
          <div className="nav-title-block">
            <i className="icon-password" />
            <span className="nav-title">Password</span>
          </div>
          {type === "passwords" ? (
            <div className="curve-down">
              <img src={down} />
            </div>
          ) : null}
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${type === "crypto" ? "active" : ""}`}
        to="/crypto/all"
      >
        <div className="nav-item sub-navs">
          {type === "crypto" ? (
            <div className="curve-up">
              <img src={up} />
            </div>
          ) : null}
          <div className="nav-title-block">
            <i className="icon-wallet" />
            <span className="nav-title">Crypto Wallets</span>
          </div>
          <div
            className={`dropdown-container ${
              type === "crypto" ? "d-block" : "d-none"
            }`}
          >
            {[...new Set(credentials.map(cred => cred.subType))].map(
              subType => {
                console.log(subType);
                return (
                  <Link
                    key={`crypto-${subType}`}
                    className={`${subNav === subType ? "active" : ""}`}
                    to={`/crypto/${subType}`}
                  >
                    {subType}
                  </Link>
                );
              }
            )}
          </div>
          {type === "crypto" ? (
            <div className="curve-down">
              <img src={down} />
            </div>
          ) : null}
        </div>
      </Link>
      <Link
        className={`dropdown-btn ${type === "notes" ? "active" : ""}`}
        to="/notes/all"
      >
        <div className="nav-item">
          {type === "notes" ? (
            <div className="curve-up">
              <img src={up} />
            </div>
          ) : null}
          <div className="nav-title-block">
            <i className="icon-note" />
            <span className="nav-title">Note</span>
          </div>
          {type === "notes" ? (
            <div className="curve-down">
              <img src={down} />
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
