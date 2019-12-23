import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="row py-3">
      <Link to='/icon'>
        <div className="col-3">
          <Card style={{ width: "17rem" }} className="mr-2">
            <Card.Body>
              <Card.Title>{"ICON"}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Link>
      <Link to='/ethereum'>
        <div className="col-3">
          <Card style={{ width: "17rem" }} className="mr-2">
            <Card.Body>
              <Card.Title>{"ETHEREUM"}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Link>
    </div>
  );
}
