import React, { useState } from "react";
import "../../Sidebar.css";
import { Link, withRouter } from "react-router-dom";
import { getFormattedTime } from '../../../helper';
import Footer from "../Footer";

const cryptoTypes = [
  {
    label: "bitcoin",
    name: "Bitcoin",
    shown: false,
  },
  {
    label: "ethereum",
    name: "Ethereum",
    shown: false,
  },
  {
    label: "icon",
    name: "Icon",
    shown: false,
  },
  {
    label: "ripple",
    name: "Ripple",
    shown: false,
  },
  {
    label: "other",
    name: "Other",
    shown: false,
  },
];
function ExtCryptoShow(props) {
  const credentials = props.credentials;
  const [cryptoList, setCryptoList] = useState(cryptoTypes);
  
  const handleDropdownClick = (label) => {
    const updatedList = cryptoList.map( type => {
      if( type.label === label) {
        type.shown = !type.shown
      }
      return type;
    });
    setCryptoList(updatedList);
  }

  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Crypto Wallets</div>
      </div>
      <div className="ext-content">
        {cryptoList.map(type => {
          const filteredItems = credentials.filter(
            item => item.subType === type.label
          );
          return filteredItems.length ? (
            <div key={`credential-${type.label}`} className={`crypto-dropdown`}>
              <div className="title" onClick={() => handleDropdownClick(type.label)}>{type.name}
                <i className={`fa ${type.shown ? 'fa-angle-up' : 'fa-angle-down'}`} />
              </div>
              <div className={`content-list ${type.shown ? 'shown' : ''}`}>
                {filteredItems.map(item => {
                  const { id, walletName, timeStamp } = item;
                  return (
                    <Link to={{
                      pathname: '/extension/crypto/view',
                      state: {
                        id: id
                      }
                    }}
                    style={{textDecoration:"none"}}>
                    <div className="item d-flex justify-content-start position-relative" key={id}>
                      <div className="item-img">
                        <img src={`/images/${type.label}-small.svg`} />
                      </div>
                      <div className="item-detail">
                        <div className="text">{walletName}</div>
                        <div className="sub-text">{getFormattedTime(timeStamp)}</div>
                      </div>
                      {/* btn to view */}
                      <div className="view-details">
                        <i className="icon-eye"/>
                      </div>
                    </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(ExtCryptoShow);
