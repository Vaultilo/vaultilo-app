import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import FormOptions from "./FormOptions.js";

export default function MainContent(props) {
  const { subType, type } = props.match.params;
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleAddFormClick = () => {
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

  const renderCryptoItem = credentials => {
    const items = JSON.parse(credentials).filter(
      credential => subType === "all" || credential.subType === subType
    );
    return (
      <>
        {getItemsHeader("crypto")}
        <div className="row mt-3">
          {items.map(credential => {
            const { walletAddress, walletName, type, id } = credential;
            return (
              <div className="col-3 wallet-box mb-3" key={id}>
                <Card onClick={() => handleItemClick(credential)}>
                  <Card.Body>
                    <Card.Title>{walletName}</Card.Title>
                    <Card.Text>{walletAddress}</Card.Text>
                    <Card.Text>{type}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderPasswordItem = passwords => {
    const items = JSON.parse(passwords);
    return (
      <>
        {getItemsHeader("passwords")}
        <div className="row mt-3">
          {items.map(item => {
            const { domainName, type, id } = item;
            return (
              <div className="col-3 wallet-box mb-3" key={id}>
                <Card onClick={() => handleItemClick(item)}>
                  <Card.Body>
                    <Card.Title>{domainName}</Card.Title>
                    <Card.Text>{type}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderNotesItem = notes => {
    const items = JSON.parse(notes);
    return (
      <>
        {getItemsHeader("notes")}
        <div className="row mt-3">
          {items.map(item => {
            const { noteInput, id, type } = item;
            return (
              <div className="col-3 wallet-box mb-3" key={id}>
                <Card onClick={() => handleItemClick(item)}>
                  <Card.Body>
                    <Card.Text>{noteInput}</Card.Text>
                    <Card.Text>{type}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
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
    return [renderCryptoItem(credentials), renderPasswordItem(passwords), renderNotesItem(notes)];
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
      <div className="row mt-3">
        <div className="col-4 col-md-4 py-1">
          <Button variant="primary" onClick={handleAddFormClick}>
            Add
          </Button>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {type === "items" ? "Choose A Type" : "Add A Credential"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormOptions
            {...props}
            itemsList={getItems()}
            onModalClose={handleModalClose}
            type={type}
            selectedItem={selectedItem}
            subType={subType}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
