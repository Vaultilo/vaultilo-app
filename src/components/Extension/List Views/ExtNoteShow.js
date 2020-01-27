import React, {Card} from "react";
import "../../Sidebar.css";
import {Link } from 'react-router-dom';
import OpenVaultilo from "../Icons/OpenVaultilo.png";
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
                                      <div className="text">{noteTitle}</div>
                                      
                                  </div>
                                  <div className="view-details">
                        <Link to={{
                          pathname: '/extension/notes/view',
                          state: {
                            id: id
                          }
                        }}><i className="icon-eye"/></Link>
                      </div>
                              </div>
                          )
                      })
                  }
              </div>
          </div>
          <Link 
         to="/items/all"
         target="_blank"  >
      <div className="ext-footer">
        <img src={OpenVaultilo} />
      </div>
      </Link>
      </div>
  );
}

