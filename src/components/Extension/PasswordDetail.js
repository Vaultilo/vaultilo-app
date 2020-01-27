import React, { useState ,useRef} from "react";
import {Overlay,Tooltip} from "react-bootstrap"
import { Link } from "react-router-dom";
import PasswordStrength from "../PasswordsForm/PasswordStrength";
import OpenVaultilo from "./Icons/OpenVaultilo.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function PasswordDetail(props) {

  const [pwTooltip, setPwTooltip] = useState(false);
  const [domainAddTooltip, setDomainAddTooltip] = useState(false);
  const [domainUsernameTooltip,setDomainUsernameTootip]=useState(false)

  const passwordRef = useRef(null);
  const domainAddRef = useRef(null);
  const domainUsernameRef =useRef(null);
  const id = props.location.state.id;
  const passwords = props.passwords;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const credentialItem = passwords.find(item => item.id === id);
  const {
    domainName,
    domainAddress,
    domainUsername,
    password
  } = credentialItem;

  const handleTooltipClick = (type) => {
    if (type === 'password') { 
      setPwTooltip(true);
    }
    if (type === 'domainUsername'){
      setDomainUsernameTootip(true);
    }
   
    if (type === 'domainAdd') {
      setDomainAddTooltip(true);
    }
    setTimeout(() => {
      setPwTooltip(false);
      setDomainUsernameTootip(false);
      setDomainAddTooltip(false);
    }, 1000);
  }

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
            <label htmlFor="inputDomainAddress" className="col-12 custom-label">
              Domain Address
            </label>
            <div className="col-12">
              <input
                type="text"
                className="custom-input form-control"
                id="inputDomainAddress"
                value={domainAddress}
              />
              <CopyToClipboard text={domainAddress}>
                <span
                  ref={domainAddRef}
                  className="copy-btn copy-btn-input"
                  data-clipboard-target="#inputAddress"
                  onClick={() => handleTooltipClick("domainAdd")}
                >
                  <img src="/images/copy.png" alt="copy" />
                </span>
              </CopyToClipboard>
              <Overlay
                target={domainAddRef.current}
                show={domainAddTooltip}
                placement="top"
              >
                {props => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied
                  </Tooltip>
                )}
              </Overlay>
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
              <CopyToClipboard text={domainUsername}>
                <span
                  ref={domainUsernameRef}
                  className="copy-btn copy-btn-input"
                  data-clipboard-target="#inputDomainUsername"
                  onClick={() => handleTooltipClick("domainUsername")}
                >
                  <img src="/images/copy.png" alt="copy" />
                </span>
              </CopyToClipboard>
              <Overlay
                target={domainUsernameRef.current}
                show={domainUsernameTooltip}
                placement="top"
              >
                {props => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied
                  </Tooltip>
                )}
              </Overlay>
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
              <CopyToClipboard text={password}>
                <span
                  ref={passwordRef}
                  className="copy-btn copy-btn-pw"
                  data-clipboard-target="#inputPassword"
                  onClick={() => handleTooltipClick("password")}
                >
                  <img src="/images/copy.png" alt="copy" />
                </span>
              </CopyToClipboard>
              <Overlay
                target={passwordRef.current}
                show={pwTooltip}
                placement="top"
              >
                {props => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied
                  </Tooltip>
                )}
              </Overlay>
            </div>
          </div>
          
        </div>
      </div>
      <Link to="/items/all" target="_blank">
        <div className="ext-footer">
          <img src={OpenVaultilo} />
        </div>
      </Link>
    </>
  );
}
