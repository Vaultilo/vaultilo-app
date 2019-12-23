import React, { useRef, useState, useEffect } from "react";
import { useFile } from "react-blockstack";
import { Link } from "react-router-dom";


export default function Form(props) {
  const {walletPath} = props;
  const [credentials, setCredentials] = useFile(`${walletPath}.json`);
  const title = useRef("");
  const address = useRef("");

  const handleClick = () => {
    if (title.current.value.length && address.current.value.length) {
      const newCred = {
        walletName: title.current.value,
        walletAddress: address.current.value
      };
      const oldCred = credentials ? JSON.parse(credentials) : [];
      setCredentials(JSON.stringify([...oldCred, newCred]));
    }
  };

  return (
    <>
      <div className="row my-3">
        <div className="col-12 py-1">
          <Link to={`/${walletPath}`}>
            <span className="py-2">
              <i className="fa fa-arrow-left"></i> Back
            </span>
          </Link>
          <div className="mt-2 font-weight-bold text-uppercase">
            {"Create New Credential"}
          </div>
        </div>
      </div>
      <div className="row">
        <form className="col-12">
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Wallet Name
            </label>
            <div className="col-4">
              <input
                type="text"
                ref={title}
                className="form-control"
                id="inputName"
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
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button
                disabled={credentials === undefined}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
