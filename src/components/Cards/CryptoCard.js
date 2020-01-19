import React from "react";
import { Card } from "react-bootstrap";

export default function CryptoCard({credential}) {
  const { walletName, walletAddress, type} = credential;
  return (
    <div className="col-4 wallet-box mb-3">
    <Card>
      <Card.Body>
        <Card.Title>{walletName}</Card.Title>
        <Card.Text>{walletAddress}</Card.Text>
        <Card.Text>{type}</Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}