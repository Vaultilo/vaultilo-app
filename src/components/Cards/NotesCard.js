import React from "react";
import './index.css';

export default function NotesCard({credential}) {
  const { noteTitle } = credential;
  return (
    <div className="notes-box">
      <div className="note-img">
        <i className="icon-note" />
      </div>
      <div className="title">
        {noteTitle}
      </div>
    </div>
  )
}