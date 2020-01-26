import React, { useState } from "react";
import "../Sidebar.css";
import { Link, withRouter } from "react-router-dom";
import { getFormattedTime } from '../../helper';

function ExtCryptoShow(props) {
  const credentials =
    props.credentials === null ? [] : JSON.parse(props.credentials);
  const cryptoTypes = [
    {
      label: "bitcoin",
      name: "Bitcoin",
    },
    {
      label: "ethereum",
      name: "Ethereum",
    },
    {
      label: "icon",
      name: "Icon",
    },
    {
      label: "ripple",
      name: "Ripple",
    },
    {
      label: "other",
      name: "Other",
    },
  ];

  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Crypto Wallet</div>
      </div>
      <div className="ext-content">
        {cryptoTypes.map(type => {
          const filteredItems = credentials.filter(
            item => item.subType === type.label
          );
          return filteredItems.length ? (
            <div key={`credential-${type.label}`}>
              <div className="title">{type.name}</div>
              <div className="content-list">
                {filteredItems.map(item => {
                  const { id, walletName, timeStamp } = item;
                  return (
                    <div className="item d-flex justify-content-start" key={id}>
                      <div className="item-img">
                        <img src={`/images/${type.label}-small.png`} />
                      </div>
                      <div className="item-detail">
                        <div className="text">{walletName}</div>
                        <div className="sub-text">{getFormattedTime(timeStamp)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default withRouter(ExtCryptoShow);
