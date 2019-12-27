import React, { useRef, useEffect, useState } from "react";

export default function PasswordsForm(props) {
  const { passwords, setPasswords, onModalClose } = props;
  const domainName = useRef(null);
  const password = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [passwords]);

  const handleClick = () => {
    if (domainName.current.value.length && password.current.value.length) {
      const newCred = {
        id: Date.now(),
        type: 'passwords',
        subType: '',
        domainName: domainName.current.value,
        password: password.current.value,
      };
      const oldCred = passwords ? JSON.parse(passwords) : [];
      setClicked(true);
      setPasswords(JSON.stringify([...oldCred, newCred]));
    }
  };

  return (
    <>
      <div className="form-group row">
        <label htmlFor="domain" className="col-4 col-form-label">
          Domain Name
        </label>
        <div className="col-8">
          <input
            type="text"
            ref={domainName}
            className="form-control"
            id="domain"
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
