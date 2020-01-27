import React, { useEffect, useState, useRef } from "react";
import { FilePicker } from "react-file-picker";
import { Modal, Overlay, Tooltip } from "react-bootstrap";
import IconService from "icon-sdk-js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import PasswordStrength from '../PasswordsForm/PasswordStrength';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './index.css';

export default function Icon(props) {
  const [pwTooltip, setPwTooltip] = useState(false);
  const [pvtKeyTooltip, setPvtKeyTooltip] = useState(false);
  const [walletAddTooltip, setWalletAddTooltip] = useState(false);

  const passwordRef = useRef(null);
  const pvtKeyRef = useRef(null);
  const walletAddRef = useRef(null);

  const {
    credentials, 
    setCredentials,
    subType,
    onModalClose,
    selectedItem,
    setModalTransparent
  } = props;
  const credentialsString = JSON.stringify(credentials);
  const defaultValue = selectedItem
    ? {
        walletName: selectedItem.walletName,
        walletAddress: selectedItem.walletAddress,
        privateKey: selectedItem.privateKey,
        password: selectedItem.password
      }
    : {
        walletName: "",
        walletAddress: "",
        privateKey: "",
        password: ""
      };

  const handleTooltipClick = (type) => {
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
  }

  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [privateKey, setPrivateKey] = useState(defaultValue.privateKey);
  const [password, setPassword] = useState(defaultValue.password);
  const [clicked, setClicked] = useState(false);
  const [keyStore, setKeystore] = useState('');
  const [keyStoreName, setKeystoreName] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [privateVisible,setPrivateVisible] = useState(false);
  const [emptyWalletName, setEmptyWalletName] = useState(null);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
      setConfirmationModalShow(false);
    }
  }, [credentialsString]);

  const getInvalidFields = () => {
    const invalidFields = [];
    if (!IconService.IconValidator.isEoaAddress(walletAddress)) {
      invalidFields.push("Wallet Address");
    }
    if (!IconService.IconValidator.isPrivateKey(privateKey)) {
      invalidFields.push("Private Key");
    }
    return invalidFields;
  }

  const showToast = (text, time) => {
    toaster.notify(() => <span className="btn btn-primary mr-2">{text}</span>, {
      position: "top",
      duration: time
    });
  };

  const submitCreateForm = () => {
    const newCred = {
      id: Date.now(),
      type: "crypto",
      subType,
      walletName,
      walletAddress,
      privateKey,
      password,
      keyStore,
      keyStoreName,
      timeStamp: Date.now()
    };
    setClicked(true);
    setCredentials(JSON.stringify([...credentials, newCred]));
  }

  const submitUpdateForm = () => {
    const updatedCredentials = credentials.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, walletName, walletAddress, privateKey, password, keyStore, keyStoreName, timeStamp: Date.now() };
      }
      return item;
    });
    setClicked(true);
    setCredentials(JSON.stringify(updatedCredentials));
  }

  const handleSubmit = () => {
    if (!walletName.length) {
      setEmptyWalletName(true);
    }
    else if (getInvalidFields().length) {
      setInvalidFields(getInvalidFields());
      setConfirmationModalShow(true);
      setModalTransparent(true);
    } else {
      submitCreateForm();
    }
  };

  const handleUpdate = () => {
    if (!walletName.length) {
      setEmptyWalletName(true);
    }
    else if (getInvalidFields().length) {
      setInvalidFields(getInvalidFields());
      setConfirmationModalShow(true);
      setModalTransparent(true);
    } else {
      submitUpdateForm();
    }
  };

  const handleBackClick = () => {
    setConfirmationModalShow(false);
    setModalTransparent(false);
  }

  const handleConfirmClick = () => {
    if (selectedItem) {
      submitUpdateForm();
    } else {
      submitCreateForm();
    }
  }

  const handleDownload = () => {
    const {keyStore, keyStoreName} = selectedItem;
    var a = document.createElement("a");
    var blob = new Blob([keyStore]);
    a.href = window.URL.createObjectURL(blob);
    a.download = keyStoreName;
    a.click();
  };

  const handleUpload = file => {
    const reader = new FileReader();
    const afterFileRead = e => {
      const text = e.target.result;
      setKeystore(text);
      setFileUploaded(true);
      setKeystoreName(file.name);
    };

    reader.addEventListener(
      "load",
      function(e) {
        afterFileRead(e);
      }.bind(this)
    );

    reader.readAsText(file);
  };

  return ( 
    <>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-12 custom-label">
          Wallet Name
        </label>
        <div className="col-12">
          <input
            autoComplete={'off'}
            type="text"
            className={`custom-input form-control ${emptyWalletName ? 'invalid' : ''}`}
            id="inputName"
            value={walletName}
            onChange={evt => setWalletName(evt.target.value)}
          />
          { emptyWalletName ? <span className="validation-text">Required</span> : null }
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputAddress" className="col-12 custom-label">
          Wallet Address
        </label>
        <div className="col-12">
          <input
            type="text"
            autoComplete={'off'}
            className="custom-input form-control"
            id="inputAddress"
            value={walletAddress}
            onChange={evt => setWalletAddress(evt.target.value)}
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
        <label htmlFor="inputPrivateKey" className="col-12 custom-label">
          Private Key
        </label>
        <div className="col-12">
          <input
            type={privateVisible ? 'text':'password'}
            className="custom-input form-control"
            id="inputPrivateKey"
            value={privateKey}
            onChange={evt => setPrivateKey(evt.target.value)}
          />
          <span className="password-visibility-btn" onClick={() => setPrivateVisible(!privateVisible)}>{ privateVisible ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>
          <CopyToClipboard text={privateKey}>
            <span ref={pvtKeyRef} className="copy-btn copy-btn-pw" data-clipboard-target="#inputPrivateKey" onClick={() => handleTooltipClick('pvtKey')}>
              <img src="/images/copy.png" alt="copy"/>
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
          <CopyToClipboard text={password}>
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
          <span className="password-visibility-btn" onClick={() => setPasswordVisible(!passwordVisible)}>{ passwordVisible ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>
          <span>
          <PasswordStrength password={password}/>
        </span>
        </div>
      </div>
      <div className="d-flex justify-content-start">
        {(selectedItem && selectedItem.keyStore) ? (
          <>
          <span className="key-store-text">Key Store:</span>
          <button
            type="button"
            className="btn btn-file mx-2"
            size="small"
            onClick={handleDownload}
          >
            Download
          </button>
          </>
        ) : (
          <>
          <span className="key-store-text">Key Store:</span>
          <FilePicker
            onChange={FileObject => handleUpload(FileObject)}
            onError={errMsg => console.log(errMsg)}
          >
            <button
              type="button"
              className="btn btn-file mx-2"
              size="small"
            >
              {!fileUploaded ? 'Upload' : 'Uploaded'}
            </button>
          </FilePicker>
          </>
        )}
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
            onClick={handleSubmit}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className="btn btn-danger"
          onClick={onModalClose}
        >
          Cancel
        </button>
      </div>
      <Modal
        dialogClassName="custom-modal"
        show={confirmationModalShow}
        onHide={handleBackClick}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div>Do you still want to continue ?</div>
            <div className="modal-info">{`The following fields are invalid:  ${invalidFields.join(', ')}.`}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirmation-body d-flex justify-content-end">
            <button className="btn btn-danger mr-2" onClick={handleConfirmClick} disabled={clicked}>Confirm</button>
            <button className="btn btn-primary" onClick={handleBackClick}>Back</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
