import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrength from "../PasswordsForm/PasswordStrength";
import OpenVaultilo from "./Icons/OpenVaultilo.png";

export default function PasswordDetail(props) {
  const id = props.location.state.id;
  console.log("props", props);
  const passwords = props.passwords;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const credentialItem = passwords.find(item => item.id === id);
  const {
    domainName,
    domainAddress,
    domainUsername,
    password
  } = credentialItem;

  return (
    <>
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Passwords</div>
        </div>
        <div className="ext-content">
            
          <div className="col-12 form-content">
             <div className="form-group row">
              <label htmlFor="domain" className="col-12 custom-label">
                Domain Name
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="custom-input form-control"
                  id="domain"
                  value={domainName}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputDomainAddress"
                className="col-12 custom-label"
              >
                Domain Address
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="custom-input form-control"
                  id="inputDomainAddress"
                  value={domainAddress}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputDomainUsername"
                className="col-12 custom-label"
              >
                Username
              </label>
              <div className="col-12">
                <input
                  type="text"
                  className="custom-input form-control"
                  id="inputDomainUsername"
                  value={domainUsername}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-12 custom-label">
                Password
              </label>
              <div className="col-12">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="custom-input form-control"
                  id="inputPassword"
                  value={password}
                />
                <span
                  className="password-visibility-btn"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <i class="fa fa-eye-slash" aria-hidden="true" />
                  ) : (
                    <i className="fa fa-eye" aria-hidden="true" />
                  )}
                </span>
                <span>
                  <PasswordStrength password={password} />
                </span>
              </div>
            
          </div>
        </div>
      </div>
      <Link 
         to="/items/all"
         target="_blank"  >
      <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
      </Link>
    </>
  );
}
