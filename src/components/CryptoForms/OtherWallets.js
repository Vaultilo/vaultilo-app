import React, { useEffect, useState, useRef } from 'react';
import PasswordStrength from '../PasswordsForm/PasswordStrength';
import '../CryptoForms/index.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip, Overlay } from 'react-bootstrap';

export default function OtherWallets(props) {
  const { credentials, setCredentials, subType, onModalClose, selectedItem } = props;
  const credentialsString = JSON.stringify(credentials);
  const defaultValue = selectedItem
    ? {
        walletName: selectedItem.walletName,
        walletAddress: selectedItem.walletAddress,
        privateKey: selectedItem.privateKey,
        password: selectedItem.password,
        platform: selectedItem.platform,
      }
    : {
        walletName: '',
        walletAddress: '',
        privateKey: '',
        password: '',
        platform: '',
      };

  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [privateKey, setPrivateKey] = useState(defaultValue.privateKey);
  const [platform, setPlatform] = useState(defaultValue.platform);
  const [password, setPassword] = useState(defaultValue.password);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [privateVisible, setPrivateVisible] = useState(false);
  const [pwTooltip, setPwTooltip] = useState(false);
  const [pvtKeyTooltip, setPvtKeyTooltip] = useState(false);
  const [walletAddTooltip, setWalletAddTooltip] = useState(false);
  const [emptyWalletName, setEmptyWalletName] = useState(null);

  const passwordRef = useRef(null);
  const pvtKeyRef = useRef(null);
  const walletAddRef = useRef(null);

  const [clicked, setClicked] = useState(false);
  const handleTooltipClick = type => {
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
  };

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose();
    }
  }, [credentialsString]);

  const handleClick = () => {
    if (walletName.length) {
      const newCred = {
        id: Date.now(),
        type: 'crypto',
        subType: subType,
        platform,
        walletName,
        walletAddress,
        privateKey,
        password,
        timeStamp: Date.now(),
      };
      setClicked(true);
      setCredentials(JSON.stringify([...credentials, newCred]));
    } else {
      setEmptyWalletName(true);
    }
  };

  const handleUpdate = () => {
    if (walletName.length) {
      const updatedCredentials = credentials.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            walletName,
            walletAddress,
            privateKey,
            password,
            platform,
            timeStamp: Date.now(),
          };
        }
        return item;
      });
      setClicked(true);
      setCredentials(JSON.stringify(updatedCredentials));
    } else {
      setEmptyWalletName(true);
    }
  };

  return (
    <>
      <div className="form-group row">
        <label htmlFor="inputPlatform" className="col-12 custom-label">
          Wallet Platform
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputPlatform"
            value={platform}
            onChange={evt => setPlatform(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-12 custom-label">
          Wallet Name
        </label>
        <div className="col-12">
          <input
            type="text"
            className={`custom-input form-control ${emptyWalletName ? 'invalid' : ''}`}
            id="inputName"
            value={walletName}
            onChange={evt => setWalletName(evt.target.value)}
          />
          {emptyWalletName ? <span className="validation-text">Required</span> : null}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputAddress" className="col-12 custom-label">
          Wallet Address
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputAddress"
            value={walletAddress}
            onChange={evt => setWalletAddress(evt.target.value)}
          />
          <CopyToClipboard text={walletAddress}>
            <span
              ref={walletAddRef}
              className="copy-btn copy-btn-input"
              data-clipboard-target="#inputAddress"
              onClick={() => handleTooltipClick('walletAdd')}
            >
              <img src="/images/copy.png" alt="copy" />
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
            type={privateVisible ? 'text' : 'password'}
            className="custom-input form-control"
            id="inputPrivateKey"
            value={privateKey}
            onChange={evt => setPrivateKey(evt.target.value)}
          />
          <span
            className="password-visibility-btn"
            onClick={() => setPrivateVisible(!privateVisible)}
          >
            {privateVisible ? (
              <i className="fa fa-eye-slash" aria-hidden="true" />
            ) : (
              <i className="fa fa-eye" aria-hidden="true" />
            )}
          </span>
          <CopyToClipboard text={privateKey}>
            <span
              ref={pvtKeyRef}
              className="copy-btn copy-btn-pw"
              data-clipboard-target="#inputPrivateKey"
              onClick={() => handleTooltipClick('pvtKey')}
            >
              <img src="/images/copy.png" alt="copy" />
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
              <i className="fa fa-eye-slash" aria-hidden="true" />
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
    </>
  );
}
