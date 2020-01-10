import React, { useRef, useEffect, useState } from "react";
import PasswordStrength from './PasswordStrength';
import '../CryptoForms/index.css'

export default function PasswordsForm(props) {
  const { passwords, setPasswords, onModalClose, selectedItem } = props;

  const defaultValue = selectedItem
    ? {
        domainName: selectedItem.domainName,
        password: selectedItem.password,
        domainAddress:selectedItem.domainAddress,
        domainUsername:selectedItem.domainUsername
      }
    : {
        domainName: "",
        password: "",
        domainAddress:"",
        domainUsername:""
      };

  const [domainName, setDomainName] = useState(defaultValue.domainName);
  const [password, setPassword] = useState(defaultValue.password);
  const [domainAddress,setDomainAddress]=useState(defaultValue.domainAddress);
  const [domainUsername,setDomainUsername]=useState(defaultValue.domainUsername);
  const [passwordVisible,setPasswordVisible]=useState(false)

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [passwords]);

  const validateForm = () => {
    return domainName.length && password.length && domainAddress.length && domainUsername.length;
  };

  const handleClick = () => {
    if (validateForm()) {
      const newCred = {
        id: Date.now(),
        type: "passwords",
        subType: "",
        domainName,
        password,
        domainAddress,
        domainUsername
      };
      const oldCred = passwords ? JSON.parse(passwords) : [];
      setClicked(true);
      setPasswords(JSON.stringify([...oldCred, newCred]));
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedPasswords = JSON.parse(passwords).map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, domainName, password,domainAddress,domainUsername };
        }
        return item;
      });
      setClicked(true);
      setPasswords(JSON.stringify(updatedPasswords));
    }
  };

  return (
    <>
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
            onChange={evt => setDomainName(evt.target.value)}
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
            onChange={evt => setDomainAddress(evt.target.value)}
          />
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
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-12 custom-label">
          Password
        </label>
        <div className="col-12">
          <input
            type={passwordVisible ? 'text':'password'}
            className="custom-input form-control"
            id="inputPassword"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
        <span className="password-visibility-btn" onClick={() => setPasswordVisible(!passwordVisible)}>{ passwordVisible ? <i class="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>
        <span>
          <PasswordStrength password={password}/>
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
