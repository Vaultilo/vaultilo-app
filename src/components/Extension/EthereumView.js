import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Overlay, Tooltip } from "react-bootstrap";
import OpenVaultilo from ".//Icons/OpenVaultilo.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function IconView(props) {
  const [pwTooltip, setPwTooltip] = useState(false);
  const [pvtKeyTooltip, setPvtKeyTooltip] = useState(false);
  const [walletAddTooltip, setWalletAddTooltip] = useState(false);

  const passwordRef = useRef(null);
  const pvtKeyRef = useRef(null);
  const walletAddRef = useRef(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [privateVisible, setPrivateVisible] = useState(false);
  const { walletName, walletAddress, privateKey, seedWords} = props.item;

  const handleTooltipClick = (type) => {
    if (type === 'password') { 
      setPwTooltip(true);
    }
    if (type === 'pvtKey') {
      setPvtKeyTooltip(true);
    }
    if (type === 'walletAdd') {
      setWalletAddTooltip(true);
    }
    setTimeout(() => {
      setPwTooltip(false);
      setPvtKeyTooltip(false);
      setWalletAddTooltip(false);
    }, 1000);
  }

  

  return (
    <>
     <div className="list-header">
        <Link to="/extension/crypto">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Ethereum</div>
      </div>
    <div className="ext-content">
      <div className="col-12 form-content">
      <div className="form-group row">
        <label htmlFor="inputName" className="col-12 custom-label">
          Wallet Name
        </label>
        <div className="col-12">
          <input
            autoComplete={"off"}
            type="text"
            className="custom-input form-control"
            id="inputName"
            value={walletName}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputAddress" className="col-12 custom-label">
          Wallet Address
        </label>
        <div className="col-12">
          <input
            type="text"
            autoComplete={"off"}
            className="custom-input form-control"
            id="inputAddress"
            value={walletAddress}
          />
          <CopyToClipboard text={walletAddress}>
            <span ref={walletAddRef} className="copy-btn copy-btn-input" data-clipboard-target="#inputAddress" onClick={() => handleTooltipClick('walletAdd')}>
              <img src="/images/copy.png" alt="copy"/>
            </span>
          </CopyToClipboard>
          <Overlay target={walletAddRef.current} show={walletAddTooltip} placement="top">
            {props => (
              <Tooltip id="overlay-example" {...props}>
                Copied
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPrivateKey" className="col-12 custom-label">
          Private Key
        </label>
        <div className="col-12">
          <input
            type={privateVisible ? "text" : "password"}
            className="custom-input form-control"
            id="inputPrivateKey"
            value={privateKey}
          />
          <span
            className="password-visibility-btn"
            onClick={() => setPrivateVisible(!privateVisible)}
          >
            {privateVisible ? (
              <i class="fa fa-eye-slash" aria-hidden="true" />
            ) : (
              <i className="fa fa-eye" aria-hidden="true" />
            )}
          </span>
          <CopyToClipboard text={privateKey}>
            <span ref={pvtKeyRef} className="copy-btn copy-btn-pw" data-clipboard-target="#inputPrivateKey" onClick={() => handleTooltipClick('pvtKey')}>
              <img src="/images/copy.png" alt="copy"/>
            </span>
          </CopyToClipboard>
          <Overlay target={pvtKeyRef.current} show={pvtKeyTooltip} placement="top">
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
          Seed Words
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputPassword"
            value={seedWords}
          />
         
          <CopyToClipboard text={seedWords}>
            <span ref={passwordRef} className="copy-btn copy-btn-pw" data-clipboard-target="#inputPassword" onClick={() => handleTooltipClick('password')}>
              <img src="/images/copy.png" alt="copy"/>
            </span>
          </CopyToClipboard>
          <Overlay target={passwordRef.current} show={pwTooltip} placement="top">
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
    <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
    </>
  );
}
