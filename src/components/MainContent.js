import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import FormOptions from "./FormOptions.js";
import CarouselRow from "./CarouselRow";
import CryptoCard from "./Cards/CryptoCard";
import NotesCard from "./Cards/NotesCard.js";
import PasswordsCard from "./Cards/PasswordsCard.js";
import AddNewCard from "./Cards/AddNewCard.js";
import {CryptoTypes} from "../helper/constants";

export default function MainContent(props) {
  const { credentials, setCredentials, notes, setNotes, passwords, setPasswords, searchText } = props;
  const { subType, type } = props.match.params;
  const [formModalShow, setFormModalShow] = useState(false);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formType, setFormType] = useState(type);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [modalTransparent, setModalTransparent] = useState(false)

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setConfirmationModalShow(true);
  }

  const handleDeleteConfirm = () => {
    if (selectedItem.type === 'crypto') {
      const updatedCredentials = credentials.filter(item => item.id !== selectedItem.id);
      setCredentials(JSON.stringify(updatedCredentials));
      setDeleteInProgress(true);
      return false;
    }
    if (selectedItem.type === 'notes') {
      const updatedNotes = notes.filter(item => item.id !== selectedItem.id);
      setNotes(JSON.stringify(updatedNotes));
      setDeleteInProgress(true);
      return false;
    }
    if (selectedItem.type === 'passwords') {
      const updatedPasswords = passwords.filter(item => item.id !== selectedItem.id);
      setPasswords(JSON.stringify(updatedPasswords));
      setDeleteInProgress(true);
      return false;
    }
  }

  useEffect(() => {
    if (deleteInProgress) {
      setDeleteInProgress(false);
      setConfirmationModalShow(false);
    }
  }, [credentials.length, notes.length, passwords.length]);

  const handleDeleteCancel = () => {
    setSelectedItem(null);
    setConfirmationModalShow(false);
  }

  const handleModalClose = () => {
    setFormModalShow(false);
  };

  const handleAddFormClick = type => {
    setFormType(type);
    setSelectedItem(null);
    setFormModalShow(true);
    setModalTransparent(false);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setFormModalShow(true);
    setModalTransparent(false);
  };

  const renderHeader = () => {
    let pageTitle;
    switch (type) {
      case "notes":
        pageTitle = "Notes";
        break;
      case "passwords":
        pageTitle = "Passwords";
        break;
      case "crypto":
        pageTitle = subType !== 'all' ? `Crypto Wallets / ${subType}` : 'Crypto Wallets';
        break;
      default:
        pageTitle = "All Items"
        break;
    }
    return (
      <div className="row page-header">
        <div className="col-12">
          <div className="text-capitalize">{pageTitle}</div>
        </div>
      </div>
    )
  }
  
  const getItemsHeader = title => (
    <div className="row item-header">
      <div className="col-12">
        <div className="header-text text-capitalize">{`${title}`}</div>
      </div>
    </div>
  );

  const getFormHeader = () => {
    const formAction = selectedItem ? "Edit" : "Add";
    let formText;
    switch (formType) {
      case "notes":
        formText = "Note";
        break;
      case "passwords":
        formText = "Password";
        break;
      default:
        formText = "Wallet"
        break;
    }
    return `${formAction} ${formText}`;
  };

  const renderCryptoItem = credentials => {
    const items = credentials.filter(
      credential => subType === "all" || credential.subType === subType
    );
    if (type === "items") {
      return (
        <>
          {getItemsHeader("crypto")}
          <div className="row mt-3">
            <div className="col-3">
              <AddNewCard onClick={handleAddFormClick} formType={"crypto"} />
            </div>
            <div className="col-9">
              <CarouselRow items={items} cardType={"crypto"} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
            </div>
          </div>
        </>
      );
    }

    if (type === "crypto" && subType === "all") {
      return (
        <>
          {CryptoTypes.map(cryptoType => {
            const cryptoTypeItems = items.filter(
              item => item.subType === cryptoType
            );
            return (
              <>
                {getItemsHeader(cryptoType)}
                <div className="row mt-3">
                  <div className="col-3">
                    <AddNewCard onClick={handleAddFormClick} formType={cryptoType} />
                  </div>
                  <div className="col-9">
                    <CarouselRow items={cryptoTypeItems} cardType={"crypto"} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    }
    return (
      <>
        {getItemsHeader("crypto")}
        <div className="row mt-3">
          {
            <div className="col-3">
              <AddNewCard onClick={handleAddFormClick} formType={subType} />
            </div>
          }
          {items.map(credential => {
            return (
              <div className="col-3" key={credential.id}>
                <CryptoCard credential={credential} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderPasswordItem = passwords => {
    const items = passwords;
    if (type === "items") {
      return (
        <>
          {getItemsHeader("passwords")}
          <div className="row mt-3">
            <div className="col-3">
              <AddNewCard onClick={handleAddFormClick} formType={"passwords"} />
            </div>
            <div className="col-9">
              <CarouselRow items={items} cardType={"passwords"} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        {getItemsHeader("passwords")}
        <div className="row mt-3">
          <>
            {
              <div className="col-3">
                <AddNewCard onClick={handleAddFormClick} formType={"passwords"} />
              </div>
            }
            {items.map(item => {
              const { id } = item;
              return (
                <div className="col-3" key={id}>
                  <PasswordsCard credential={item} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
                </div>
              );
            })}
          </>
        </div>
      </>
    );
  };

  const renderNotesItem = notes => {
    const items = notes;
    if (type === "items") {
      return (
        <>
          {getItemsHeader("notes")}
          <div className="row mt-3">
            <div className="col-3">
              <AddNewCard onClick={handleAddFormClick} formType={"notes"} />
            </div>
            <div className="col-9">
              <CarouselRow items={items} cardType={"notes"} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        {getItemsHeader("notes")}
        <div className="row mt-3">
          <>
            {
              <div className="col-3">
                <AddNewCard onClick={handleAddFormClick} formType={"notes"} />
              </div>
            }
            {items.map(item => {
              const { id } = item;
              return (
                <div className="col-3" key={id}>
                  <NotesCard credential={item} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
                </div>
              );
            })}
          </>
        </div>
      </>
    );
  };

  const renderFilteredItems = () => {
    if (type === "passwords") {
      return (
        <div className="row mt-3">
          {passwords.filter(item => item.domainName.toLowerCase().includes(searchText.toLowerCase())).map(item => {
            const { id } = item;
            return (
              <div className="col-3" key={id}>
                <PasswordsCard credential={item} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
              </div>
            );
          })}
        </div>
      )
    }
    if (type === "crypto") {
      return (
        <div className="row mt-3">
          {credentials.filter(item => item.walletName.toLowerCase().includes(searchText.toLowerCase())).map(credential => {
            return (
              <div className="col-3" key={credential.id}>
                <CryptoCard credential={credential} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
              </div>
            );
          })}
        </div>
      )
    }
    if (type === "notes") {
      return (
        <div className="row mt-3">
          {notes.filter(item => item.noteTitle.toLowerCase().includes(searchText.toLowerCase())).map(item => {
            const { id } = item;
            return (
              <div className="col-3" key={id}>
                <NotesCard credential={item} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
              </div>
            );
          })}
        </div>
      )
    }
    return (
      <div className="row mt-3">
        {passwords.filter(item => item.domainName.toLowerCase().includes(searchText.toLowerCase())).map(item => {
          const { id } = item;
          return (
            <div className="col-3" key={id}>
              <PasswordsCard credential={item} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
            </div>
          );
        })}
        {credentials.filter(item => item.walletName.toLowerCase().includes(searchText.toLowerCase())).map(credential => {
          return (
            <div className="col-3" key={credential.id}>
              <CryptoCard credential={credential} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
            </div>
          );
        })}
        {notes.filter(item => item.noteTitle.toLowerCase().includes(searchText.toLowerCase())).map(item => {
          const { id } = item;
          return (
            <div className="col-3" key={id}>
              <NotesCard credential={item} onClick={handleItemClick} onDeleteClick={handleDeleteClick} />
            </div>
          );
        })}
      </div>
    )
  }

  const renderItems = () => {
    if (type === "passwords") {
      return renderPasswordItem(passwords);
    }
    if (type === "crypto") {
      return renderCryptoItem(credentials);
    }
    if (type === "notes") {
      return renderNotesItem(notes);
    }
    return [
      renderPasswordItem(passwords),
      renderCryptoItem(credentials),
      renderNotesItem(notes)
    ];
  };

  return (
    <>
      {renderHeader()}
      {!searchText.length ? renderItems() : renderFilteredItems()}
      <Modal
        dialogClassName={`custom-modal ${modalTransparent ? 'transparent-modal' : ''}`}
        show={formModalShow}
        onHide={() => setFormModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {getFormHeader()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormOptions
            {...props}
            onModalClose={handleModalClose}
            type={type}
            selectedItem={selectedItem}
            formType={formType}
            setModalTransparent={(bool) => {setModalTransparent(bool)}}
          />
        </Modal.Body>
      </Modal>
      <Modal
        dialogClassName="custom-modal"
        show={confirmationModalShow}
        onHide={() => setConfirmationModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Do you want to confirm the delete ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirmation-body d-flex justify-content-end">
            <button className="btn btn-primary mr-2" onClick={handleDeleteConfirm} disabled={deleteInProgress}>Confirm</button>
            <button className="btn btn-danger" onClick={handleDeleteCancel} disabled={deleteInProgress}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
