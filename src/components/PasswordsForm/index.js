import React, { useRef, useEffect, useState } from "react";

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
        <label htmlFor="domain" className="col-4 col-form-label">
          Domain Name
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="domain"
            value={domainName}
            onChange={evt => setDomainName(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputDomainAddress" className="col-4 col-form-label">
          Domain Address
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputDomainAddress"
            value={domainAddress}
            onChange={evt => setDomainAddress(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputDomainUsername" className="col-4 col-form-label">
         Username
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            id="inputDomainUsername"
            value={domainUsername}
            onChange={evt => setDomainUsername(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-4 col-form-label">
          Password
        </label>
        <div className="col-8">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
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
