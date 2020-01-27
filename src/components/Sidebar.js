import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import up from "./images/up.svg";
import down from "./images/down.svg";
import {CryptoTypes} from '../helper/constants';

export default function Sidebar(props) {
  const { subType: subNav, type } = props.match.params;
  return (
    <div className="sidenav">
      <div className="logo-container">
        <img src="/images/logo.png" />
      </div>
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
            {CryptoTypes.map(
              subType => {
                return (
                  <Link
                    key={`crypto-${subType}`}
                    className={`${subNav === subType ? "active" : ""}`}
                    to={`/crypto/${subType}`}
                  >
                    <div className="sub-nav-item d-flex justify-content-start">
                      <div className="mr-2 sub-nav-img">
                        <img src={`/images/${subType}-small.svg`} />
                      </div>
                      {subType}
                    </div>
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
