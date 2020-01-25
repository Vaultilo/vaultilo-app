import React, {Card} from "react";
import "../Sidebar.css";
import {Link } from 'react-router-dom';

export default function ExNoteShow(props) {
  const notes =
    props.notes === null ? [] : JSON.parse(props.notes);
  console.log(notes)
  return (

      <div classname="ui segment">
          <Link to="/extension/view">
              <button>
                  <i className="fa fa-arrow-left"></i>
                    Back
                    </button>
                    </Link>
    <div className="ui list">
        {notes.map(notes =>{
            const {noteInput,noteTitle}=notes
            return(
                <div class="item"  >
                    <img class="ui tiny image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrl86QMbQjbN8agpUBhwXq5RmIDAlbU9F61KF44MjY9U4Yr1jx&s" />
                    <div class="content">
                     <a class='header'>{noteTitle}</a>
                        

                </div>
                <div class="ui fitted divider"></div>
                </div>
            )
        })}
        
        
    </div>
    </div>
  );
}

