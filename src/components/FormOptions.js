import React from 'react';
import CrypoForms from './CryptoForms/index.js';
import PasswordsForm from './PasswordsForm/index.js';
import NotesForm from './NotesForm/index.js';

export default function FormOptions(props) {
  const { type, selectedItem } = props;
  const formType = selectedItem ? selectedItem.type : props.formType;
  const renderForm = () => {
    if (formType === 'crypto' || type === 'crypto') {
      return <CrypoForms subType={formType} {...props} />;
    }
    if (formType === 'passwords') {
      return <PasswordsForm {...props} />;
    }
    if (formType === 'notes') {
      return <NotesForm {...props} />;
    }
    return null;
  };

  return <>{renderForm()}</>;
}
