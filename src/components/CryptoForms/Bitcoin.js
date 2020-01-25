import React, { useEffect, useState } from "react";
import * as bip39 from 'bip39';
import WAValidator from 'wallet-address-validator';
import toaster from 'toasted-notes'

export default function Bitcoin(props) {
  const { credentials, setCredentials, subType, onModalClose, selectedItem } = props;
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

  const validateForm = () => {
    const addValid=WAValidator.validate(walletAddress,"BTC")
    const valid=bip39.validateMnemonic(seedWords)
    if (!addValid){
      showToast('Bitcoin wallet address invalid',2000)
    }

    if (!valid){
      showToast('Invalid Seed Words',2000)
    }

    if (addValid && valid){
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
        seedWords,
        timeStamp: Date.now()
      };
      setClicked(true);
      setCredentials(JSON.stringify([...credentials, newCred]));
    }
  };

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedCredentials = credentials.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, walletName, walletAddress, seedWords, timeStamp: Date.now() };
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
        <label htmlFor="inputName" className="col-12 custom-label">
         Bitcoin Wallet Name
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="inputName"
            value={walletName}
            onChange={evt => setWalletName(evt.target.value)}
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
            className="custom-input form-control"
            id="inputAddress"
            value={walletAddress}
            onChange={evt => setWalletAddress(evt.target.value)}
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
            onClick={handleClick}
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
    </>
  );
}
