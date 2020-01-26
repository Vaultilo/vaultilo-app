import React, { useState } from "react";
import "./extension.css";
import { Link } from "react-router-dom";
import OpenVaultilo from ".//Icons/OpenVaultilo.png";
import LockImg from ".//Icons/lock.png";

export default function ExPwShow(props) {
  const passwords = props.passwords === null ? [] : JSON.parse(props.passwords);
  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Password</div>
      </div>
      <div className="ext-content">
        <div className="title">
          Password
        </div>
        <div className="content-list">
          <div className="item d-flex justify-content-start">
            <div className="item-img">
              <img src={LockImg} />
            </div>
            <div className="item-detail">
              <div className="text">Facebook</div>
              <div className="sub-text">hello@gmail.com</div>
            </div>
          </div>
          {
            passwords.map(item => {
              const {
                id,
                domainName,
                domainAddress
              } = item;
              return (
                <div className="item d-flex justify-content-start" key={id}>
                  <div className="item-img">
                    <img src={LockImg} />
                  </div>
                  <div className="item-detail">
                    <div className="text">{domainName}</div>
                    <div className="sub-text">{domainAddress}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
    </div>
  );
}
