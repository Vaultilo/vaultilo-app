import React from 'react';
import './index.css';
import { getFormattedTime } from '../../helper';

export default function PasswordsCard({ credential, onClick, onDeleteClick }) {
  const { domainName, timeStamp } = credential;
  return (
    <div className="wallet-box password-box">
      <div className="action-btn view-btn" onClick={() => onClick(credential)}>
        <i className="icon-eye" />
      </div>
      <div className="action-btn delete-btn" onClick={() => onDeleteClick(credential)}>
        <i className="icon-delete" />
      </div>
      <div className="top-img">
        <img src="/images/password.svg" />
      </div>
      <div className="title">{domainName}</div>
      <div className="time-label">
        <i className="icon-clock" />
        {getFormattedTime(timeStamp)}
      </div>
    </div>
  );
}
