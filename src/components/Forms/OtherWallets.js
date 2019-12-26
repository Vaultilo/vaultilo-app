import React, { useRef, useEffect, useState } from "react";

export default function OtherWallets(props) {
  const { credentials, setCredentials, type, onModalClose } = props;
  const name = useRef(null);
  const address = useRef(null);
  const privateKey=useRef(null);
  const platform=useRef(null);
  const password=useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose();
    }
  }, [credentials]);

  const handleClick = () => {
    if (name.current.value.length && address.current.value.length) {
      const newCred = {
        id: Date.now(),
        type: type,
        walletPlatform:platform.current.value,
        walletName: name.current.value,
        walletAddress: address.current.value,
        walletPrivateKey:privateKey.current.value,
        walletPassword:password.current.value
      };
      const oldCred = credentials ? JSON.parse(credentials) : [];
      setClicked(true);
      setCredentials(JSON.stringify([...oldCred, newCred]));
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
            ref={platform}
            className="form-control"
            id="inputPlatform"
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
            ref={name}
            className="form-control"
            id="inputName"
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
            ref={address}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPrivateKey" className="col-4 col-form-label">
          Private Key
        </label>
        <div className="col-8">
          <input
            type="password"
            className="form-control"
            id="inputPrivateKey"
            ref={privateKey}
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
            ref={password}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          disabled={clicked}
          type="button"
          className="btn btn-primary mr-2"
          onClick={handleClick}
        >
          Save
        </button>
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
