import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function MainContent(props) {
  const contentType = props.match.params.type;
  const {credentials, setCredentials} = props;
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
            <div className="d-flex col-12">
              {credentials === null ? (
                <div>0 Wallets</div>
              ) : (
                JSON.parse(credentials).map(credential => {
                  const { walletName, walletAddress, id } = credential;
                  if( contentType === 'all' || contentType === credential.type)
                  return (
                    <div className="wallet-box" key={id}>
                      <Link to={{ pathname: 'crypto/update', state: credential }}>
                        <Card
                          style={{ width: "17rem" }}
                          className="mr-2"
                        >
                          <Card.Body>
                            <Card.Title>{walletName}</Card.Title>
                            <Card.Text>{walletAddress}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4 col-md-4 py-1">
              <Link to={{ pathname: '/crypto/new', state: {} }}>
                <span className="p-2 border">
                  Create New <i className="fa fa-plus"></i>
                </span>
              </Link>
            </div>
          </div>
        </>
      }
    </>
  );
}
