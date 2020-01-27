import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Overlay, Tooltip } from "react-bootstrap";
import OpenVaultilo from ".//Icons/OpenVaultilo.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function IconView(props) {
  const [pwTooltip, setPwTooltip] = useState(false);
  const [walletAddTooltip, setWalletAddTooltip] = useState(false);

  const passwordRef = useRef(null);
  const walletAddRef = useRef(null);


  const { walletName, walletAddress,seedWords} = props.item;

  const handleTooltipClick = (type) => {
    if (type === 'password') { 
      setPwTooltip(true);
    }
   
    if (type === 'walletAdd') {
      setWalletAddTooltip(true);
    }
    setTimeout(() => {
      setPwTooltip(false);
      
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
        <div className="title">Bitcoin</div>
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
        <label htmlFor="inputSeedWords" className="col-12 custom-label">
          Seed Words
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputSeedWords"
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
