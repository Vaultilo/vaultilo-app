import React from "react";
import './index.css';
import { getFormattedTime } from '../../helper';

export default function CryptoCard({credential, onClick, onDeleteClick}) {
  const { walletName, subType, timeStamp } = credential;
  // const imgSrc = subType === 'ethereum' ? '/images/ethereum.png' : '/images/icon.png';
  return (
    <div className={`wallet-box ${subType === 'ethereum' ? 'ethereum-box' : ''}`}>
      <div className="action-btn view-btn" onClick={() => onClick(credential)}><i className="icon-eye"/></div>
      <div className="action-btn delete-btn" onClick={() => onDeleteClick(credential)}><i className="icon-delete"/></div>
      <div className="top-img">
        <img src={`/images/${subType}.svg`} /> 
      </div>
      <div className="title">
        {walletName}
      </div>
      <div className="time-label">
        <i className="icon-clock" />
        {getFormattedTime(timeStamp)}
      </div>
    </div>
  )
}