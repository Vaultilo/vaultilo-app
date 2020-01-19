import React from "react";
import './index.css';

export default function CryptoCard({credential, onClick}) {
  const { walletName, subType } = credential;
  const imgSrc = subType === 'ethereum' ? '/images/ethereum.png' : '/images/icon-logo.png';
  return (
    <div className="wallet-box">
      <div className="action-btn view-btn" onClick={() => onClick(credential)} ><i className="icon-eye"/></div>
      <div className="action-btn delete-btn"><i className="icon-delete"/></div>
      <div className="top-img">
        <img src={imgSrc} /> 
      </div>
      <div className="title">
        {walletName}
      </div>
    </div>
  )
}