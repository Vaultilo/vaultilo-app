import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as bip39 from 'bip39';
import WAValidator from 'wallet-address-validator';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import './index.css';

export default function Ethereum(props) {
  const { credentials, setCredentials, subType, onModalClose, selectedItem, setModalTransparent } = props;
  const credentialsString = JSON.stringify(credentials);
  const defaultValue = selectedItem
  ? {
      walletName: selectedItem.walletName,
      walletAddress: selectedItem.walletAddress,
      privateKey: selectedItem.privateKey,
      seedWords:selectedItem.seedWords
    }
  : {
      walletName: "",
      walletAddress: "",
      privateKey: "",
      seedWords:""
    };
  
  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [privateKey, setPrivateKey] = useState(defaultValue.privateKey);
  const [seedWords,setSeedWords]=useState(defaultValue.seedWords)
  const [clicked, setClicked] = useState(false);
  const [emptyWalletName, setEmptyWalletName] = useState(null);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

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
    if (!WAValidator.validate(walletAddress,"ETH")) {
      invalidFields.push("Wallet Address");
    }
    if (!bip39.validateMnemonic(seedWords)) {
      invalidFields.push("Seed words");
    }
    return invalidFields;
  };

  const submitCreateForm = () => {
    const newCred = {
      id: Date.now(),
      type: 'crypto',
      subType: subType,
      walletName,
      walletAddress,
      privateKey,
      seedWords,
      timeStamp: Date.now()
    };
    setClicked(true);
    setCredentials(JSON.stringify([...credentials, newCred]));
  }

  const submitUpdateForm = () => {
    const updatedCredentials = credentials.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, walletName, walletAddress, privateKey, seedWords, timeStamp: Date.now()  };
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

  return (
    <>
      <div className="form-group row">
        <label htmlFor="inputName" className="col-12 custom-label">
          Ethereum Wallet Name
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
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPrivateKey" className="col-12 custom-label">
          Private Key
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputPrivateKey"
            value={privateKey}
            onChange={evt => setPrivateKey(evt.target.value)}
          />
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
