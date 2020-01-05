import React, { useEffect, useState } from "react";

export default function OtherWallets(props) {
  const { credentials, setCredentials, subType, onModalClose, selectedItem } = props;

  const defaultValue = selectedItem
  ? {
      walletName: selectedItem.walletName,
      walletAddress: selectedItem.walletAddress,
      privateKey: selectedItem.privateKey,
      password: selectedItem.password,
      platform: selectedItem.platform
    }
  : {
      walletName: '',
      walletAddress: '',
      privateKey: '',
      password: '',
      platform: ''
    };

  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [privateKey, setPrivateKey]=useState(defaultValue.privateKey);
  const [platform, setPlatform]=useState(defaultValue.platform);
  const [password, setPassword]=useState(defaultValue.password);
  const [passwordVisible,setPasswordVisible]=useState(false)
  const [privateVisible,setPrivateVisible]=useState(false)

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose();
    }
  }, [credentials]);

  const validateForm = () => {
    return (
      walletName.length &&
      walletAddress.length &&
      password.length &&
      privateKey.length &&
      platform.length
    );
  };

  const handleClick = () => {
    if (validateForm()) {
      const newCred = {
        id: Date.now(),
        type: 'crypto',
        subType: subType,
        platform,
        walletName,
        walletAddress,
        privateKey,
        password
      };
      const oldCred = credentials ? JSON.parse(credentials) : [];
      setClicked(true);
      setCredentials(JSON.stringify([...oldCred, newCred]));
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedCredentials = JSON.parse(credentials).map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, walletName, walletAddress, privateKey, password, platform };
        }
        return item;
      });
      setClicked(true);
      setCredentials(JSON.stringify(updatedCredentials));
    }
  };

  return (
    <>
      <div className="form-group row">
        <label htmlFor="inputPlatform" className="col-4 col-form-label">
           Wallet Platform
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputPlatform"
            value={platform}
            onChange={evt => setPlatform(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-4 col-form-label">
           Wallet Name
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={walletName}
            onChange={evt => setWalletName(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputAddress" className="col-4 col-form-label">
          Wallet Address
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            value={walletAddress}
            onChange={evt => setWalletAddress(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPrivateKey" className="col-4 col-form-label">
          Private Key
        </label>
        <div className="col-8">
          <input
            type={privateVisible ? 'text' : 'password'}
            className="form-control"
            id="inputPrivateKey"
            value={privateKey}
            onChange={evt => setPrivateKey(evt.target.value)}
          />
        <span className="password-visibility-btn" onClick={() => setPrivateVisible(!privateVisible)}>{ privateVisible ? <i class="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-4 col-form-label">
          Password 
        </label>
        <div className="col-8">
          <input
            type={passwordVisible ? 'text' : 'password'}
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
        <span className="password-visibility-btn" onClick={() => setPasswordVisible(!passwordVisible)}>{ passwordVisible ? <i class="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={onModalClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
