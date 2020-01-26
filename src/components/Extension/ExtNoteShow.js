import React, {Card} from "react";
import "../Sidebar.css";
import {Link } from 'react-router-dom';
import LockImg from "./Icons/lock.png";
import OpenVaultilo from "./Icons/OpenVaultilo.png";

export default function ExNoteShow(props) {
  const notes = props.notes;
  console.log(notes)
  return (

      <div className="extension-container">
          <div className="list-header">
              <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
              </Link>
              <div className="title">Notes</div>
          </div>
          <div className="ext-content">
              <div className="title">
                 Notes
              </div>
              <div className="content-list">

                  {
                      notes.map(item => {
                          const {
                              id,
                              noteInput,
                              noteTitle
                          } = item;
                          return (
                              <div className="item d-flex justify-content-start" key={id}>
                                  <div className="item-img">
                                      <i className="icon-note" />
                                  </div>
                                  <div className="item-detail">
                                      <div className="text">{noteInput}</div>
                                      <div className="sub-text">{noteTitle}</div>
                                  </div>
                              </div>
                          )
                      })
                  }
              </div>
          </div>
          <div className="ext-footer">
              <img src={OpenVaultilo} />
          </div>
      </div>
  );
}

