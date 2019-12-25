import React, { useState } from "react";
import {Button, Card, Modal} from "react-bootstrap";
import Form from './Forms/index.js';

export default function MainContent(props) {
  const contentType = props.match.params.type;
  const [modalShow, setModalShow] = useState(false);
  const {credentials, setCredentials} = props;
  const handleModalClose = () => {
    setModalShow(false);
  }
  return (
    <>
      <div className="row mt-3">
        <div className="col-12 py-1">
          <div className="mt-3 font-weight-bold text-uppercase">{'Crypto Wallets'}</div>
        </div>
      </div>
      {
        <>
          <div className="row mt-3">
              {credentials === null ? (
                <div>0 Wallets</div>
              ) : (
                JSON.parse(credentials).map(credential => {
                  const { walletName, walletAddress, id } = credential;
                  if( contentType === 'all' || contentType === credential.type)
                  return (
                    <div className="col-3 wallet-box mb-3" key={id}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{walletName}</Card.Title>
                            <Card.Text>{walletAddress}</Card.Text>
                          </Card.Body>
                        </Card>
                    </div>
                  );
                })
              )}
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
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Credential
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form credentials={credentials} type={contentType} setCredentials={setCredentials} onModalClose={handleModalClose} />
            </Modal.Body>
            {/* <Modal.Footer>
              <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer> */}
          </Modal>
        </>
      }
    </>
  );
}
