import React, { useRef, useEffect, useState } from 'react';
import PasswordStrength from './PasswordStrength';
import '../CryptoForms/index.css';
import { Overlay, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function PasswordsForm(props) {
  const { passwords, setPasswords, onModalClose, selectedItem } = props;
  const passwordString = JSON.stringify(passwords);
  const defaultValue = selectedItem
    ? {
        domainName: selectedItem.domainName,
        password: selectedItem.password,
        domainAddress: selectedItem.domainAddress,
        domainUsername: selectedItem.domainUsername,
      }
    : {
        domainName: '',
        password: '',
        domainAddress: '',
        domainUsername: '',
      };

  const [domainName, setDomainName] = useState(defaultValue.domainName);
  const [password, setPassword] = useState(defaultValue.password);
  const [domainAddress, setDomainAddress] = useState(defaultValue.domainAddress);
  const [domainUsername, setDomainUsername] = useState(defaultValue.domainUsername);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emptyDomainName, setEmptyDomainName] = useState(null);

  const [clicked, setClicked] = useState(false);
  const [pwTooltip, setPwTooltip] = useState(false);
  const [domainAddTooltip, setDomainAddTooltip] = useState(false);
  const [domainUsernameTooltip, setDomainUsernameTootip] = useState(false);

  const passwordRef = useRef(null);
  const domainAddRef = useRef(null);
  const domainUsernameRef = useRef(null);
  const handleTooltipClick = type => {
    if (type === 'password') {
      setPwTooltip(true);
    }
    if (type === 'domainUsername') {
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
  };
  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [passwordString]);

  const handleClick = () => {
    if (domainName.length) {
      const newCred = {
        id: Date.now(),
        type: 'passwords',
        subType: '',
        domainName,
        password,
        domainAddress,
        domainUsername,
        timeStamp: Date.now(),
      };
      setClicked(true);
      setPasswords(JSON.stringify([...passwords, newCred]));
    } else {
      setEmptyDomainName(true);
    }
  };

  const handleUpdate = () => {
    if (domainName.length) {
      const updatedPasswords = passwords.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            domainName,
            password,
            domainAddress,
            domainUsername,
            timeStamp: Date.now(),
          };
        }
        return item;
      });
      setClicked(true);
      setPasswords(JSON.stringify(updatedPasswords));
    } else {
      setEmptyDomainName(true);
    }
  };

  return (
    <div className="form-container">
      <div className="form-group row">
        <label htmlFor="domain" className="col-12 custom-label">
          Domain Name
        </label>
        <div className="col-12">
          <input
            type="text"
            className={`custom-input form-control ${emptyDomainName ? 'invalid' : ''}`}
            id="domain"
            value={domainName}
            onChange={evt => setDomainName(evt.target.value)}
          />
          {emptyDomainName ? <span className="validation-text">Required</span> : null}
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
            onChange={evt => setDomainAddress(evt.target.value)}
          />
          <CopyToClipboard text={domainAddress}>
            <span
              ref={domainAddRef}
              className="copy-btn copy-btn-input"
              data-clipboard-target="#inputAddress"
              onClick={() => handleTooltipClick('domainAdd')}
            >
              <img src="/images/copy.png" alt="copy" />
            </span>
          </CopyToClipboard>
          <Overlay target={domainAddRef.current} show={domainAddTooltip} placement="top">
            {props => (
              <Tooltip id="overlay-example" {...props}>
                Copied
              </Tooltip>
            )}
          </Overlay>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputDomainUsername" className="col-12 custom-label">
          Username
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputDomainUsername"
            value={domainUsername}
            onChange={evt => setDomainUsername(evt.target.value)}
          />
          <CopyToClipboard text={domainUsername}>
            <span
              ref={domainUsernameRef}
              className="copy-btn copy-btn-input"
              data-clipboard-target="#inputDomainUsername"
              onClick={() => handleTooltipClick('domainUsername')}
            >
              <img src="/images/copy.png" alt="copy" />
            </span>
          </CopyToClipboard>
          <Overlay target={domainUsernameRef.current} show={domainUsernameTooltip} placement="top">
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
            type={passwordVisible ? 'text' : 'password'}
            className="custom-input form-control"
            id="inputPassword"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
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
              onClick={() => handleTooltipClick('password')}
            >
              <img src="/images/copy.png" alt="copy" />
            </span>
          </CopyToClipboard>
          <Overlay target={passwordRef.current} show={pwTooltip} placement="top">
            {props => (
              <Tooltip id="overlay-example" {...props}>
                Copied
              </Tooltip>
            )}
          </Overlay>
          <span>
            <PasswordStrength password={password} />
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        {selectedItem ? (
          <button
            disabled={clicked}
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            disabled={clicked}
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClick}
          >
            Save
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={onModalClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
