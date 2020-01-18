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
  const { type, selectedItem } = props;
  const [modalType, setModalType] = useState(selectedItem ? selectedItem.type : type);

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
      {renderForm()}
    </>
  );
}
