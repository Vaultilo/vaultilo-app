import React, { useEffect } from "react";
import { useBlockstack } from "react-blockstack";
import Dropdown from "react-bootstrap/Dropdown";
import "./TopBar.css";

export default function TopBar({ avatarUrl, name, searchText, setSearchText }) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      className="custom-toggle"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <i className="icon-option py-1" />
    </a>
  ));
  const { signOut } = useBlockstack();
  const handleSignOut = async() => {
    signOut();
  }
  return (
    <div className="top-bar">
      <div className="form-group mb-0 search-bar-form">
        <input
          autoComplete={"off"}
          type="text"
          className="custom-input form-control search-bar"
          id="inputName"
          placeholder="Search by name"
          value={searchText}
          onChange={evt => setSearchText(evt.target.value)}
        />
        <span><i className="icon-search"/></span>
      </div>
      <div className="d-flex justify-content-end pt-1">
        <div className="avatar-cont">
          <img className="avatar" alt="" src={avatarUrl} />
        </div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} variant="link" id="dropdown-basic" />
          <Dropdown.Menu alignRight>
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
