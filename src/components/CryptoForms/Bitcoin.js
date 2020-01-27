import React, { useEffect, useState,useRef } from "react";
import { Modal,Overlay,Tooltip} from "react-bootstrap";
import * as bip39 from 'bip39';
import WAValidator from 'wallet-address-validator';
import toaster from 'toasted-notes'
import {CopyToClipboard} from "react-copy-to-clipboard"

export default function Bitcoin(props) {
  const { credentials, setCredentials, subType, onModalClose, selectedItem, setModalTransparent} = props;
  const credentialsString = JSON.stringify(credentials);
  const defaultValue = selectedItem
  ? {
      walletName: selectedItem.walletName,
      walletAddress: selectedItem.walletAddress,
      seedWords:selectedItem.seedWords
    }
  : {
      walletName: "",
      walletAddress: "",
      seedWords:""
    };
  
  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [seedWords,setSeedWords]=useState(defaultValue.seedWords)
  const [clicked, setClicked] = useState(false);
  const [emptyWalletName, setEmptyWalletName] = useState(null);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [pwTooltip, setPwTooltip] = useState(false);
  const [walletAddTooltip, setWalletAddTooltip] = useState(false);

  const passwordRef = useRef(null);
  const walletAddRef = useRef(null);
  const handleTooltipClick = (type) => {
    if (type === 'password') { 
      setPwTooltip(true);
    }
   
    if (type === 'walletAdd') {
      setWalletAddTooltip(true);
    }
    setTimeout(() => {
      setPwTooltip(false);
      
      setWalletAddTooltip(false);
    }, 1000);
  }

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose();
    }
  }, [credentialsString]);

  const showToast = (text, time) => {
    toaster.notify(() => <span className="btn btn-primary mr-2">{text}</span>, {
      position: "top",
      duration: time
    });
  };

  const getInvalidFields = () => {
    const invalidFields = [];
    if (!WAValidator.validate(walletAddress,"BTC")) {
      invalidFields.push("Wallet Address");
    }
    if (!bip39.validateMnemonic(seedWords)) {
      invalidFields.push("Seed words");
    }
    return invalidFields;
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

  const submitCreateForm = () => {
    const newCred = {
      id: Date.now(),
      type: 'crypto',
      subType: subType,
      walletName,
      walletAddress,
      seedWords,
      timeStamp: Date.now()
    };
    setClicked(true);
    setCredentials(JSON.stringify([...credentials, newCred]));
  }

  const submitUpdateForm = () => {
    const updatedCredentials = credentials.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, walletName, walletAddress, seedWords, timeStamp: Date.now() };
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

  return (
    <>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-12 custom-label">
         Bitcoin Wallet Name
        </label>
        <div className="col-12">
          <input
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
        <label htmlFor="inputSeedWords" className="col-12 custom-label">
          Seed Words
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputSeedWords"
            value={seedWords}
            onChange={evt => setSeedWords(evt.target.value)}
          />
          <CopyToClipboard text={seedWords}>
            <span ref={passwordRef} className="copy-btn copy-btn-input" data-clipboard-target="#inputPassword" onClick={() => handleTooltipClick('password')}>
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
            <div>{`The following fields are invalid: ${invalidFields.join(', ')}.`}</div>
            <br />
            <div>Do you still want to continue ?</div>
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
