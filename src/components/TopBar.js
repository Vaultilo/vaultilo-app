import React from "react";
import { useBlockstack } from 'react-blockstack';
import Dropdown from "react-bootstrap/Dropdown";

export default function TopBar({ avatarUrl, name }) {
  const { signOut } = useBlockstack();
  return (
    <div className="row top-bar d-flex justify-content-end border-bottom">
      <div className="avatar-cont py-2">
        <img className="avatar" alt="" src={avatarUrl} />
      </div>
      <Dropdown className="py-2">
        <Dropdown.Toggle variant="link" id="dropdown-basic">{name}</Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
