import React from "react";
import Card from "react-bootstrap/Card";
import { useFile } from "react-blockstack";
import { Link } from "react-router-dom";

export default function MainContent(props) {
  const { walletPath } = props.match.params;
  const [credentials, setCredentials] = useFile(`${walletPath}.json`);
  const handleDelete = () => {
    setCredentials(null);
  };
  return (
    <>
      <div className="row mt-3">
        <div className="col-12 py-1">
          <Link to="/">
            <span className="py-2">
              <i className="fa fa-arrow-left"></i> Back
            </span>
          </Link>
          <div className="mt-3 font-weight-bold text-uppercase">{`${walletPath} Wallets`}</div>
        </div>
      </div>
      {credentials === undefined ? (
        <div className="mt-3">Loading..</div>
      ) : (
        <>
          <div className="row mt-3">
            <div className="d-flex col-12">
              {credentials === null ? (
                <div>0 Wallets</div>
              ) : (
                JSON.parse(credentials).map(credential => {
                  const { walletName, walletAddress, id } = credential;
                  return (
                    <div className="wallet-box" key={walletAddress}>
                      <Link to={{ pathname: `${walletPath}/${walletName}`, state: credential }}>
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
            <div className="col-2 py-1">
              <Link to={{ pathname: `${walletPath}/new`, state: {} }}>
                <span className="p-2 border">
                  Create New <i className="fa fa-plus"></i>
                </span>
              </Link>
            </div>
            <div className="col-2 py-1">
              <button className="btn btn-link" onClick={handleDelete}>
                Delete All
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
