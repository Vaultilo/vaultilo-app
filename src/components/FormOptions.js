import React, { useState } from "react";
import { Card } from "react-bootstrap";
import CrypoForms from "./CryptoForms/index.js";
import PasswordsForm from "./PasswordsForm/index.js";
import NotesForm from "./NotesForm/index.js";

const ITEM_TYPES = [
  { label: "Crypto Wallets", value: "crypto" },
  { label: "Passwords", value: "passwords" },
  { label: "Notes", value: "notes" }
];

export default function FormOptions(props) {
  const { type } = props;
  const [modalType, setModalType] = useState(type);

  const renderFormOptions = () => {
    return ITEM_TYPES.map(type => {
      return (
        <div
          className="col-4 wallet-box mb-3"
          key={`item__${type.value}`}
          onClick={() => setModalType(type.value)}
        >
          <Card>
            <Card.Body>
              <Card.Text>{type.label}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  const renderForm = () => {
    if (modalType === "crypto") {
      return <CrypoForms {...props} />;
    }
    if (modalType === "passwords") {
      return <PasswordsForm {...props} />;
    }
    if (modalType === "notes") {
      return <NotesForm {...props} />;
    }
    return null;
  };

  return (
    <>
      {modalType === "items" ? (
        <div className="row">{renderFormOptions()}</div>
      ) : (
        <>
          <div className="row">
            <button
              className="btn btn-link"
              onClick={() => setModalType("items")}
            >
              <i className="fa fa-arrow-left"></i> All Items
            </button>
          </div>
          {renderForm()}
        </>
      )}
    </>
  );
}
