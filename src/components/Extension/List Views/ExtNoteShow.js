import React from 'react';
import '../../Sidebar.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
export default function ExNoteShow(props) {
  const notes = props.notes;
  return (
    <div className="extension-container">
      <div className="list-header">
        <Link to="/extension/view">
          <span className="nav-icon nav-back">
            <i className="fa fa-angle-left"></i>
          </span>
        </Link>
        <div className="title">Vaultilo</div>
      </div>
      <div className="ext-content">
        <div className="title">Notes</div>
        <div className="content-list">
          {notes.map(item => {
            const { id, noteTitle } = item;
            return (
              <Link
                to={{
                  pathname: '/extension/notes/view',
                  state: {
                    id: id,
                  },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div className="item d-flex justify-content-start" key={id}>
                  <div className="item-img">
                    <i className="icon-note" />
                  </div>
                  <div className="item-detail">
                    <div className="text">{noteTitle}</div>
                  </div>
                  <div className="view-details">
                    <i className="icon-eye" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
