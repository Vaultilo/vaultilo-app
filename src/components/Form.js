import React, { useRef, useEffect, useState } from 'react';
import { useFile } from 'react-blockstack';
import { Link } from 'react-router-dom';

export default function Form(props) {
  const paramsState = props.location.state;
  const { wallet } = props.match.params;
  const [credentials, setCredentials] = useFile('crypto.json');
  const name = useRef(null);
  const address = useRef(null);
  const walletType = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      //props.history.push(`/${walletPath}`);
    }
  }, [credentials]);

  const handleClick = () => {
    if (name.current.value.length && address.current.value.length) {
      const newCred = {
        id: Date.now(),
        walletName: name.current.value,
        walletAddress: address.current.value,
        type: walletType.current.value
      };
      const oldCred = credentials ? JSON.parse(credentials) : [];
      setClicked(true);
      setCredentials(JSON.stringify([...oldCred, newCred]));
    }
  };

  const handleUpdate = () => {
    if (name.current.value.length && address.current.value.length) {
      const updatedCreds = JSON.parse(credentials).map(cred => {
        if(cred.id === paramsState.id) {
          cred.walletName = name.current.value;
          cred.walletAddress = address.current.value;
        }
        return cred;
      });
      setClicked(true);
      setCredentials(JSON.stringify(updatedCreds));
    }
  }

  return (
    <>
      <div className="row my-3">
        <div className="col-12 py-1">
          <div className="mt-2 font-weight-bold text-uppercase">
            {wallet === 'new' ? 'Create New Credential' : 'Update your Credential'}
          </div>
        </div>
      </div>
      <div className="row">
        <form className="col-12">
          <div className="form-group row">
            <label htmlFor="walletType" className="col-sm-2 col-form-label">
              Wallet type
            </label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                id="walletType"
                ref={walletType}
                defaultValue={''}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Wallet Name
            </label>
            <div className="col-4">
              <input
                type="text"
                ref={name}
                className="form-control"
                id="inputName"
                defaultValue={paramsState ? paramsState.walletName : ''}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
              Wallet Address
            </label>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                ref={address}
                defaultValue={paramsState ? paramsState.walletAddress : ''}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              { wallet === 'new' ? (
              <button
                disabled={clicked}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save
              </button> ) : (
              <button
                disabled={clicked}
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
