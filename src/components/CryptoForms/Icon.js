import React, { useEffect, useState } from "react";
import { FilePicker } from "react-file-picker";
import IconService from "icon-sdk-js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import PasswordStrength from '../PasswordsForm/PasswordStrength'
import './index.css';

export default function Icon(props) {
  const {
    credentials, 
    setCredentials,
    subType,
    onModalClose,
    selectedItem
  } = props;

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

  const [walletName, setWalletName] = useState(defaultValue.walletName);
  const [walletAddress, setWalletAddress] = useState(defaultValue.walletAddress);
  const [privateKey, setPrivateKey] = useState(defaultValue.privateKey);
  const [password, setPassword] = useState(defaultValue.password);
  const [clicked, setClicked] = useState(false);
  const [keyStore, setKeystore] = useState('');
  const [keyStoreName, setKeystoreName] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [privateVisible,setPrivateVisible]=useState(false)

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [credentials]);

  const validateForm = () => {
    const addressBool = IconService.IconValidator.isEoaAddress(walletAddress);
    const privateBool = IconService.IconValidator.isPrivateKey(privateKey);

    if (!addressBool) {
      showToast("Invalid Wallet Address", 1922);
    }
    if (!privateBool) {
      showToast("Invalid Private Key", 2372);
    }
    if (keyStore !== "") {
      const wallet = IconService.IconWallet.loadKeystore(keyStore, password);
      const getAddress = wallet.getAddress();
      const getPrivate = wallet.getPrivateKey();

      if (getAddress !== walletAddress) {
        showToast("Adress dont match with the keystore", 2400);
      }
      if (getPrivate !== privateKey) {
        showToast("Private key dont match with the keystore", 2400);
      }
    }

    if (addressBool && privateBool) {
      return (
        walletName.length &&
        walletAddress.length &&
        password.length &&
        privateKey.length
      );
    }
    return false;
  };

  const showToast = (text, time) => {
    toaster.notify(() => <span className="btn btn-primary mr-2">{text}</span>, {
      position: "top",
      duration: time
    });
  };

  const handleClick = () => {
    const validation = validateForm();
    if (validation) {
      const newCred = {
        id: Date.now(),
        type: "crypto",
        subType,
        walletName,
        walletAddress,
        privateKey,
        password,
        keyStore,
        keyStoreName
      };
      const oldCred = credentials ? JSON.parse(credentials) : [];
      setClicked(true);
      setCredentials(JSON.stringify([...oldCred, newCred]));
    }
  };

  const handleUpdate = () => {
    const validation = validateForm();
    if (validation) {
      const updatedCredentials = JSON.parse(credentials).map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, walletName, walletAddress, privateKey, password, keyStore, keyStoreName };
        }
        return item;
      });
      setClicked(true);
      setCredentials(JSON.stringify(updatedCredentials));
    }
  };

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
        <span className="password-visibility-btn" onClick={() => setPrivateVisible(!privateVisible)}>{ privateVisible ? <i class="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>  
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
          <span className="password-visibility-btn" onClick={() => setPasswordVisible(!passwordVisible)}>{ passwordVisible ? <i class="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}</span>
          <span>
          <PasswordStrength password={password}/>
        </span>
        </div>
      </div>
      <div className="d-flex justify-content-start">
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
              {!fileUploaded ? 'Upload Keystore File' : 'Uploaded'}
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
