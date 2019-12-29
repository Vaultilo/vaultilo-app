import React, { useState } from "react";
import {Button, Card, Modal} from "react-bootstrap";
import FormOptions from './FormOptions.js';

export default function MainContent(props) {
  const {subType, type} = props.match.params;
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleModalClose = () => {
    setModalShow(false);
  }

  const handleAddFormClick = () => {
    setSelectedItem(null);
    setModalShow(true);
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalShow(true);
  }

  const renderCryptoItem = (credential) => {
    const {walletAddress, walletName, type, id} = credential;
    return (
      <div className="col-3 wallet-box mb-3" key={id} onClick={() => handleItemClick(credential)}>
        <Card>
          <Card.Body>
            <Card.Title>{walletName}</Card.Title>
            <Card.Text>{walletAddress}</Card.Text>
            <Card.Text>{type}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  const renderPasswordItem = (item) => {
    const {domainName, type, id} = item;
    return (
      <div className="col-3 wallet-box mb-3" key={id} onClick={() => handleItemClick(item)}>
        <Card>
          <Card.Body>
            <Card.Title>{domainName}</Card.Title>
            <Card.Text>{type}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

  const renderNotesItem = (item) => {
    const {noteInput, id, type} = item;
    return (
      <div className="col-3 wallet-box mb-3" key={id} onClick={() => handleItemClick(item)}>
        <Card>
          <Card.Body>
            <Card.Text>{noteInput}</Card.Text>
            <Card.Text>{type}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

  const getItems = () => {
    const credentials = props.credentials || '[]';
    const passwords = props.passwords || '[]';
    const notes = props.notes || '[]';

    if (type === 'crypto') {
      const items = JSON.parse(credentials).filter(credential => subType === 'all' || credential.subType === subType);
      return items.map(credential => renderCryptoItem(credential));
    }
    if (type === 'passwords') {
      const items = JSON.parse(passwords);
      return items.map(item => renderPasswordItem(item));
    }
    if (type === 'notes') {
      const items = JSON.parse(notes);
      return items.map(item => renderNotesItem(item));
    }
    const items = [...JSON.parse(credentials), ...JSON.parse(passwords), ...JSON.parse(notes)];
    return items.map(item => {
      if (item.type === 'crypto') {
        return renderCryptoItem(item);
      }
      if (item.type === 'passwords') {
        return renderPasswordItem(item);
      }
      if (item.type === 'notes') {
        return renderNotesItem(item);
      }
    });
  }

  return ( 
    <>
      <div className="row mt-3">
        <div className="col-12 py-1">
          <div className="mt-3 font-weight-bold text-uppercase">{`${type}`}</div>
        </div>
      </div>
      {
        <>
          <div className="row mt-3">
              {getItems().length === 0 ? (
                <div className="px-2">0 Items</div>
              ) : getItems()}
            </div>
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
                { type === 'items' ? 'Choose A Type' : 'Add A Credential'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormOptions {...props} itemsList={getItems()} onModalClose={handleModalClose} type={type} selectedItem={selectedItem} subType={subType} />
            </Modal.Body>
          </Modal>
        </>
      }
    </>
  );
}
