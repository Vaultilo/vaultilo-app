import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

import FormOptions from "./FormOptions.js";
import ItemsRow from "./CarouselRow";
import CryptoCard from "./Cards/CryptoCard";
import NotesCard from "./Cards/NotesCard.js";
import PasswordsCard from "./Cards/PasswordsCard.js";

const CryptoTypes = ["icon", "ethereum", "bitcoin", "ripple", "other"];
export default function MainContent(props) {
  const { subType, type } = props.match.params;
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formType, setFormType] = useState(type);
  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleAddFormClick = type => {
    setFormType(type);
    setSelectedItem(null);
    setModalShow(true);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    setModalShow(true);
  };

  const getItemsHeader = title => (
    <div className="row mt-3">
      <div className="col-12 py-1">
        <div className="mt-3 font-weight-bold text-uppercase">{`${title}`}</div>
      </div>
    </div>
  );

  const getFormHeader = () => {
    const formAction = selectedItem ? "Edit" : "Add";
    let formText;
    switch (formType) {
      case "crypto":
        formText = "Wallet";
        break;
      case "notes":
        formText = "Note";
        break;
      case "passwords":
        formText = "Password";
        break;
    }
    return `${formAction} ${formText}`;
  };

  const renderCryptoItem = credentials => {
    const items = JSON.parse(credentials).filter(
      credential => subType === "all" || credential.subType === subType
    );
    if (type === "items") {
      return (
        <>
          {getItemsHeader("crypto")}
          <div className="row mt-3">
            <div className="col-3 mb-3">
              <Card onClick={() => handleAddFormClick("crypto")}>
                <Card.Body>
                  <Card.Title>{"+"}</Card.Title>
                  <Card.Text>{"Add New"}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-9">
              <ItemsRow items={items} cardType={"crypto"} />
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
                  <div className="col-3 mb-3">
                    <Card onClick={() => handleAddFormClick("crypto")}>
                      <Card.Body>
                        <Card.Title>{"+"}</Card.Title>
                        <Card.Text>{"Add New"}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-9">
                    <ItemsRow items={cryptoTypeItems} cardType={"crypto"} />
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
            <div className="col-3 mb-3">
              <Card onClick={() => handleAddFormClick("crypto")}>
                <Card.Body>
                  <Card.Title>{"+"}</Card.Title>
                  <Card.Text>{"Add New"}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          }
          {items.map(credential => {
            return (
              <div className="col-3 mb-3" key={credential.id}>
                <CryptoCard credential={credential} />
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderPasswordItem = passwords => {
    const items = JSON.parse(passwords);
    if (type === "items") {
      return (
        <>
          {getItemsHeader("passwords")}
          <div className="row mt-3">
            <div className="col-3 mb-3">
              <Card onClick={() => handleAddFormClick("passwords")}>
                <Card.Body>
                  <Card.Title>{"+"}</Card.Title>
                  <Card.Text>{"Add New"}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-9">
              <ItemsRow items={items} cardType={"passwords"} />
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
              <div className="col-3 mb-3">
                <Card onClick={() => handleAddFormClick("passwords")}>
                  <Card.Body>
                    <Card.Title>{"+"}</Card.Title>
                    <Card.Text>{"Add New"}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            }
            {items.map(item => {
              const { id } = item;
              return (
                <div className="col-3 mb-3" key={id}>
                  <PasswordsCard credential={item} />
                </div>
              );
            })}
          </>
        </div>
      </>
    );
  };

  const renderNotesItem = notes => {
    const items = JSON.parse(notes);
    if (type === "items") {
      return (
        <>
          {getItemsHeader("notes")}
          <div className="row mt-3">
            <div className="col-3 mb-3">
              <Card onClick={() => handleAddFormClick("notes")}>
                <Card.Body>
                  <Card.Title>{"+"}</Card.Title>
                  <Card.Text>{"Add New"}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-9">
              <ItemsRow items={items} cardType={"notes"} />
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
              <div className="col-3 mb-3">
                <Card onClick={() => handleAddFormClick("notes")}>
                  <Card.Body>
                    <Card.Title>{"+"}</Card.Title>
                    <Card.Text>{"Add New"}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            }
            {items.map(item => {
              const { id } = item;
              return (
                <div className="col-3 mb-3" key={id}>
                  <NotesCard credential={item} />
                </div>
              );
            })}
          </>
        </div>
      </>
    );
  };

  const getItems = () => {
    const credentials = props.credentials || "[]";
    const passwords = props.passwords || "[]";
    const notes = props.notes || "[]";

    if (type === "crypto") {
      return renderCryptoItem(credentials);
    }
    if (type === "passwords") {
      return renderPasswordItem(passwords);
    }
    if (type === "notes") {
      return renderNotesItem(notes);
    }
    return [
      renderCryptoItem(credentials),
      renderPasswordItem(passwords),
      renderNotesItem(notes)
    ];
  };

  return (
    <>
      {getItems().length === 0 ? (
        <>
          {getItemsHeader()}
          <div className="row mt-3">
            <div className="px-2">0 Items</div>
          </div>
        </>
      ) : (
        getItems()
      )}
      <Modal
        dialogClassName="custom-modal"
        show={modalShow}
        onHide={() => setModalShow(false)}
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
            itemsList={getItems()}
            onModalClose={handleModalClose}
            type={formType}
            selectedItem={selectedItem}
            subType={subType}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
