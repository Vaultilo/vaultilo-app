import React, { useState } from "react";
import {Button, Card, Modal} from "react-bootstrap";
import FormOptions from './FormOptions.js';

export default function MainContent(props) {
  const {subType, type} = props.match.params;
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => {
    setModalShow(false);
  }

  const renderCryptoItem = (credential) => {
    const {walletAddress, walletName, type, id} = credential;
    return (
      <div className="col-3 wallet-box mb-3" key={id}>
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
      <div className="col-3 wallet-box mb-3" key={id}>
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
    const {note, id, type} = item;
    return (
      <div className="col-3 wallet-box mb-3" key={id}>
        <Card>
          <Card.Body>
            <Card.Text>{note}</Card.Text>
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
          <div className="mt-3 font-weight-bold text-uppercase">{'Items'}</div>
        </div>
      </div>
      {
        <>
          <div className="row mt-3">
              {getItems().length === 0 ? (
                <div>0 Items</div>
              ) : getItems()}
            </div>
          <div className="row mt-3">
            <div className="col-4 col-md-4 py-1">
              <Button variant="primary" onClick={() => setModalShow(true)}>
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
              <FormOptions {...props} itemsList={getItems()} onModalClose={handleModalClose} type={type} />
            </Modal.Body>
          </Modal>
        </>
      }
    </>
  );
}
