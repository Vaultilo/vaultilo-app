import React, { useEffect, useState } from "react";
import "../CryptoForms/index.css";

export default function NotesForm(props) {
  const { notes, setNotes, onModalClose, selectedItem } = props;
  const notesString = JSON.stringify(notes);
  const defaultValue = selectedItem
    ? {
        noteInput: selectedItem.noteInput,
        noteTitle: selectedItem.noteTitle
      }
    : {
        noteInput: "",
        noteTitle: ""
      };

  const [noteInput, setNoteInput] = useState(defaultValue.noteInput);
  const [noteTitle, setNoteTitle] = useState(defaultValue.noteTitle);
  const [clicked, setClicked] = useState(false);
  const [emptyNoteTitle, setEmptyNoteTitle] = useState(null);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [notesString]);

  const handleClick = () => {
    if (noteTitle.length) {
      const newCred = {
        id: Date.now(),
        type: "notes",
        subType: "",
        noteInput,
        noteTitle
      };
      setClicked(true);
      setNotes(JSON.stringify([...notes, newCred]));
    } else {
      setEmptyNoteTitle(true);
    }
  };

  const handleUpdate = () => {
    if (noteTitle.length) {
      const updatedNotes = notes.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, noteInput, noteTitle };
        }
        return item;
      });
      setClicked(true);
      setNotes(JSON.stringify(updatedNotes));
    } else {
      setEmptyNoteTitle(true);
    }
  };

  return (
    <div className="form-container">
      <div className="form-group row">
        <label htmlFor="noteTitleInput" className="col-12 custom-label">
          Name
        </label>
        <div className="col-12">
          <input
            type="text"
            className={`custom-input form-control ${
              emptyNoteTitle ? "invalid" : ""
            }`}
            id="noteTitleInput"
            value={noteTitle}
            onChange={evt => setNoteTitle(evt.target.value)}
          />
          {emptyNoteTitle ? (
            <span className="validation-text">Required</span>
          ) : null}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="noteInput" className="col-12 custom-label">
          Note
        </label>
        <div className="col-12">
          <textarea
            className="custom-textarea form-control"
            id="noteInput"
            rows="3"
            value={noteInput}
            onChange={evt => setNoteInput(evt.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        {selectedItem ? (
          <button
            disabled={clicked}
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            disabled={clicked}
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClick}
          >
            Save
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={onModalClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
