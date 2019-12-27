import React, {useState} from "react";
import {Card} from "react-bootstrap";

const ITEM_TYPES = [{label: 'Crypto Wallets', value: 'crypto'}, {label: 'Passwords', value: 'passwords'}, {label: 'Notes', value: 'notes'}];

export default function FormOptions(props) {
  const { type } = props;
  const [modalType, setModalType] = useState(type);

  const renderFormOptions = () => {
    return ITEM_TYPES.map(type => {
      return(
        <div className="col-4 wallet-box mb-3" key={`item__${type}`}>
          <Card>
            <Card.Body>
              <Card.Text>{type.label}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )
    })
  }

  const renderForm = () => {

  }

  return (
    <div className="row">
      {modalType === 'items' ? renderFormOptions() : null}
    </div>
  );
}
