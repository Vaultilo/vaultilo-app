import React, { useState } from 'react';
import '../extension.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

export default function Extension(props) {
  const [activeNav, setActiveNav] = useState('items');
  const handleNavClick = path => {
    setActiveNav(path);
  };
  return (
    <div className="extension-container">
      <div className="ext-header">
        <img src="/images/logo-green.svg" />
      </div>
      <div className="ext-content">
        <Link
          className={`extension-link ${activeNav === 'crypto' ? 'active' : ''}`}
          onClick={() => handleNavClick('crypto')}
          to="/extension/crypto"
        >
          <div className="link-item">
            <i className="icon-wallet" />
            <span className="nav-title">Crypto Wallets</span>
            <span className="nav-icon nav-right-angle">
              <i className="fa fa-angle-right"></i>
            </span>

            <div
              className={`dropdown-container ${activeNav === 'crypto' ? 'd-block' : 'd-none'}`}
            ></div>
          </div>
        </Link>
        <Link
          className={`extension-link ${activeNav === 'passwords' ? 'active' : ''}`}
          to="/extension/passwords"
          onClick={() => handleNavClick('passwords')}
        >
          <div className="link-item password">
            <i className="fa fa-lock" />
            <span className="nav-title">Passwords</span>
            <span className="nav-icon nav-right-angle">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </Link>
        <Link
          className={`extension-link ${activeNav === 'notes' ? 'active' : ''}`}
          to="/extension/notes"
          onClick={() => handleNavClick('notes')}
        >
          <div className="link-item note">
            <i className="icon-note" />
            <span className="nav-title">Notes</span>

            <span className="nav-icon nav-right-angle">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </Link>
        <Link
          className={`extension-link ${activeNav === 'notes' ? 'active' : ''}`}
          to="/extension/nft"
          onClick={() => handleNavClick('NFT')}
        >
          <div className="link-item">
            <i className="icon-ntf" />
            <span className="nav-title">NFT</span>

            <span className="nav-icon nav-right-angle">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
