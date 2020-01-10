import React, { useEffect, useState } from "react";
import * as bip39 from 'bip39';
import WAValidator from 'wallet-address-validator';
import toaster from 'toasted-notes'

export default function Ripple(props) {
  const { credentials, setCredentials, subType, onModalClose, selectedItem } = props;

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

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose();
    }
  }, [credentials]);

  const showToast = (text, time) => {
    toaster.notify(() => <span className="btn btn-primary mr-2">{text}</span>, {
      position: "top",
      duration: time
    });
  };

  const validateForm = () => {
    const addValid=WAValidator.validate(walletAddress,"XRP")
    const seedValid=bip39.validateMnemonic(seedWords)
    console.log("Address ",addValid)

    if (!addValid){
      showToast('Ripple wallet address invalid',2000)
    }

    if (!seedValid){
      showToast('Invalid Seed Words',2000)
    }

    if (addValid && seedValid){
    return (
      walletName.length &&
      walletAddress.length
    );
    }
  };

  const handleClick = () => {
    if (validateForm()) {
      const newCred = {
        id: Date.now(),
        type: 'crypto',
        subType: subType,
        walletName,
        walletAddress,
        seedWords
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
          return { ...item, walletName, walletAddress,seedWords };
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
        <label htmlFor="inputName" className="col-4 col-form-label">
         Ripple Wallet Name
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
        <label htmlFor="inputSeedWords" className="col-4 col-form-label">
          Seed Words
        </label>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
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
