import React from 'react';
import './index.css';

export default function NotesCard({ credential, onClick, onDeleteClick }) {
  const { noteTitle } = credential;
  return (
    <div className="notes-box">
      <div className="action-btn view-btn" onClick={() => onClick(credential)}>
        <i className="icon-eye" />
      </div>
      <div className="action-btn delete-btn" onClick={() => onDeleteClick(credential)}>
        <i className="icon-delete" />
      </div>
      <div className="note-img">
        <i className="icon-note" />
      </div>
      <div className="title">{noteTitle}</div>
    </div>
  );
}
