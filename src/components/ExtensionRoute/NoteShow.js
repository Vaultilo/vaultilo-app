import React from "react";
import "../Sidebar.css";


export default function NoteShow(props) {
    const notes =
        props.notes === null ? [] : JSON.parse(props.notes);
    console.log(notes)
    return (
        <div classname="container" style={{width:"410px", height:"610px",borderRadius:"0px"}}>
            <div className="row">
                <div className="col-10">
                    Row 1 Col1
                </div>
                <div className="col-2">
                    Row 1 Col2
                </div>
            </div>
            <div className="row">
                Row 2
            </div>

        </div>
    );
}

