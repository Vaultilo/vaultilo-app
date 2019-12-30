import React, { useRef, useEffect, useState } from "react";

export default function NotesForm(props) {
  const { notes, setNotes, onModalClose, selectedItem } = props;
  const defaultValue = selectedItem ? {
        noteInput: selectedItem.noteInput,
        noteTitle: selectedItem.noteTitle
      } : {
        noteInput: "",
        noteTitle:""
      };

  const [noteInput, setNoteInput] = useState(defaultValue.noteInput);
  const [noteTitle,setNoteTitle] = useState (defaultValue.noteTitle)
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [notes]);

  const handleClick = () => {
    setNotes(null);
    if (noteInput.length) {
      const newCred = {
        id: Date.now(),
        type: "notes",
        subType: "",
        noteInput,
        noteTitle
      };
      const oldCred = notes ? JSON.parse(notes) : [];
      setClicked(true);
      setNotes(JSON.stringify([...oldCred, newCred]));
    }
  };

  const handleUpdate = () => {
    if (noteInput.length && noteTitle.length) {
      const updatedNotes = JSON.parse(notes).map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, noteInput,noteTitle };
        }
        return item;
      });
      setClicked(true);
      setNotes(JSON.stringify(updatedNotes));
    }
  };

  return (
    <>
      <div className="form-group row">
        <label htmlFor="noteTitleInput" className="col-4 col-form-label">
          Title
        </label>
        <div className="col-8">
          <textarea
            className="form-control"
            id="noteTitleInput"
            value={noteTitle}
            onChange={evt => setNoteTitle(evt.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="noteInput" className="col-4 col-form-label">
          Note
        </label>
        <div className="col-8">
          <textarea
            className="form-control"
            id="noteInput"
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={onModalClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
