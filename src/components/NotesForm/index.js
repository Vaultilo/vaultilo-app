import React, { useRef, useEffect, useState } from "react";

export default function NotesForm(props) {
  const { notes, setNotes, onModalClose } = props;
  const note = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
      onModalClose(false);
    }
  }, [notes]);

  const handleClick = () => {
    if (note.current.value.length) {
      const newCred = {
        id: Date.now(),
        type: 'notes',
        subType: '',
        note: note.current.value,
      };
      const oldCred = notes ? JSON.parse(notes) : [];
      setClicked(true);
      setNotes(JSON.stringify([...oldCred, newCred]));
    }
  };

  return (
    <>
      <div className="form-group row">
        <label htmlFor="noteInput" className="col-4 col-form-label">
          Note
        </label>
        <div className="col-8">
          <input
            type="text"
            ref={note}
            className="form-control"
            id="noteInput"
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          disabled={clicked}
          type="button"
          className="btn btn-primary mr-2"
          onClick={handleClick}
        >
          Save
        </button>
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
