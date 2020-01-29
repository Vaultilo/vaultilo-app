import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const ExtLanding = () => (
  <div className="ext-container">
    <nav className="ext-navbar">
      <img
        className="ext-land-logo  py-4"
        src="/images/logo-white.svg"
        al="logg"
      />
      <a className="ext-navbar-brand">
        <img src="/images/topbar.svg" al="Logo" />
      </a>
    </nav>
    <div className="panel-landing text-center py-5">
      <div className="ext-landing-text text-uppercase">
        <span className="color-primary">Secure</span> your crypto wallets and
        credentials with decentralised technology
      </div>
      <Link
        to="/login"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <button className="login-btn">
          <img
            src="/images/login-btn-img.svg"
            alt="Login with blockstack"
          />
        </button>
      </Link>
    </div>
  </div>
);

export default ExtLanding;
