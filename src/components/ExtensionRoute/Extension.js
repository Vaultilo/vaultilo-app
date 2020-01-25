import React, { useState } from "react";
import "./extension.css";
import {Link} from 'react-router-dom';
import logo from "../ExtensionRoute/Icons/logo.png";
import OpenVaultilo from '../ExtensionRoute/Icons/OpenVaultilo.png'


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
    <div className="extension-container" style={{borderRadius:"0px",height:"600px",width:"410px"}} >

        <div className="logo-bar"><img  src={logo}/></div>
      <Link
        className={`dropdown-btn ${activeNav === "passwords" ? "active" : ""}`}
        to='/extension/passwords'
        onClick={() => handleNavClick("passwords")}
      >
        <div className="password">
          <i className="fa fa-lock" />
          <span className="nav-title">Passwords</span>
            <span className="nav-right-angle"><i className="fa fa-angle-right"></i></span>

        </div>
      </Link>

      <Link
        className={`dropdown-btn ${activeNav === "crypto" ? "active" : ""}`}
        onClick={() => handleNavClick("crypto")}

      >
        <div className="password" style={{top:"140px"}}>
          <i className="fa fa-lock" />
          <span className="nav-title">Crypto Wallets</span>
            <span className="nav-right-angle"><i className="fa fa-angle-right"></i></span>

          <div
            className={`dropdown-container ${
              activeNav === "crypto" ? "d-block" : "d-none"
            }`}
          >

          </div>
        </div>

      </Link>
      <Link
        className={`dropdown-btn ${activeNav === "notes" ? "active" : ""}`}
        to="/extension/notes"
        onClick={() => handleNavClick("notes")}
      >
        <div className="password" style={{top:"210px"}}>
          <i className="fa fa-lock" />
          <span className="nav-title">Note</span>

            <span className="nav-right-angle"><i className="fa fa-angle-right"></i></span>

        </div>
      </Link>
        <Link
            className={`dropdown-btn ${activeNav === "notes" ? "active" : ""}`}
            to="/extension/notes"
            onClick={() => handleNavClick("NFT")}
        >
            <div className="password" style={{top:"280px"}}>
                <i className="fa fa-lock" />
                <span className="nav-title">NFT</span>

                <span className="nav-right-angle"><i className="fa fa-angle-right"></i></span>

            </div>
        </Link>
        <div className="open-vaultilo">
            <img src={OpenVaultilo}/>

        </div>

        </div>


  );
}

