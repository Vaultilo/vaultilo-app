import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import PasswordStrength from "../PasswordsForm/PasswordStrength";
import OpenVaultilo from "./Icons/OpenVaultilo.png";
import {Overlay,Tooltip} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';



export default function NotesDetails(props){
    const id=props.location.state.id;
    const notes=props.notes;
    const notesItem=notes.find(item => item.id==id);
    const {noteInput,noteTitle}=notesItem;
    const [titleTooltip,setTitleTooltip]=useState(false)
    const titleRef=useRef(null);
    const handleTooltipClick = (type) => {
      if (type === 'title') {
        setTitleTooltip(true);
      }
     
      setTimeout(() => {
        setTitleTooltip(false)
      }, 1000);
    }

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
          <CopyToClipboard text={noteInput}>
                <span
                  ref={titleRef}
                  className="copy-btn copy-btn-input"
                  data-clipboard-target="#inputDomainUsername"
                  onClick={() => handleTooltipClick("title")}
                >
                  <img src="/images/copy.png" alt="copy" />
                </span>
              </CopyToClipboard>
              <Overlay
                target={titleRef.current}
                show={titleTooltip}
                placement="top"
              >
                {props => (
                  <Tooltip id="overlay-example" {...props}>
                    Copied
                  </Tooltip>
                )}
              </Overlay>
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