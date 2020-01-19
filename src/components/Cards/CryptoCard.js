import React from "react";
import './index.css';

export default function CryptoCard({credential}) {
  const { walletName, subType } = credential;
  const imgSrc = subType === 'ethereum' ? '/images/ethereum.png' : '/images/icon-logo.png';
  return (
    <div className="wallet-box">
      <div className="top-img">
        <img src={imgSrc} /> 
      </div>
      <div className="title">
        {walletName}
      </div>
    </div>
  )
}