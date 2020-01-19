import React from "react";
import './index.css';

export default function PasswordsCard({credential}) {
  const { domainName } = credential;
  return (
    <div className="notes-box">
      <div className="note-img">
        <i className="icon-password" />
      </div>
      <div className="title">
        {domainName}
      </div>
    </div>
  )
}