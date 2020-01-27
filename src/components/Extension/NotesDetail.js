import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrength from "../PasswordsForm/PasswordStrength";
import OpenVaultilo from "./Icons/OpenVaultilo.png";

export default function NotesDetails(props){
    const id=props.location.state.id;
    const notes=props.notes;
    const notesItem=notes.find(item => item.id==id);
    const {noteInput,noteTitle}=notesItem;

    return(
        <>
            <div className="list-header">
                 <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Passwords</div>
        </div>
        <div className="ext-content">
        <div className="col-12 form-content">
        <div className="form-group row">
        <label htmlFor="noteTitleInput" className="col-12 custom-label">
          Title
        </label>
        <div className="col-12">
          <input
            type="text"
            className="custom-input form-control"
            id="noteTitleInput"
            value={noteTitle}
            
          />
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
           
          />
        </div>
      </div>
            </div>
            </div>
            <Link 
         to="/items/all"
         target="_blank"  >
      <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
      </Link>
        </>
    )

}