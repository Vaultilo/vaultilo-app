import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

export default function ExtNftShow(props) {
  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Vaultilo</div>
      </div>
      <div className="ext-content">
        <div className="title">NFT</div>
        <div className="content-list">Coming Soon</div>
      </div>
      <Footer />
    </div>
  );
}
