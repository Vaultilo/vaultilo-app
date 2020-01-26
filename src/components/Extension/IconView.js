import React, { useEffect, useState } from "react";
import { FilePicker } from "react-file-picker";
import {Link} from 'react-router-dom';
import OpenVaultilo from ".//Icons/OpenVaultilo.png";

export default function IconView(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [privateVisible, setPrivateVisible] = useState(false);
  const { walletName, walletAddress, privateKey, password, } = props.item;
  return (
    <>
     <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Icon</div>
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
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPassword" className="col-12 custom-label">
          Password
        </label>
        <div className="col-12">
          <input
            type={passwordVisible ? "text" : "password"}
            className="custom-input form-control"
            id="inputPassword"
            value={password}
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
        </div>
      </div>
      {/* <div className="d-flex justify-content-start">
        {!selectedItem ? (
          <FilePicker
            onChange={FileObject => handleUpload(FileObject)}
            onError={errMsg => console.log(errMsg)}
          >
            <button
              type="button"
              className="btn btn-secondary mr-2"
              size="small"
            >
              {!fileUploaded ? "Upload Keystore File" : "Uploaded"}
            </button>
          </FilePicker>
        ) : (
          <button
            type="button"
            className="btn btn-secondary mr-2"
            size="small"
            onClick={handleDownload}
          >
            Download Keystore File
          </button>
        )}
      </div> */}
      </div>
    </div>
    <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
    </>
  );
}
