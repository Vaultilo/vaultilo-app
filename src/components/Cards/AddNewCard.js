import React from "react";
import './index.css';

export default function AddNewCard({ formType, onClick}) {
  return (
    <div className="new-card" onClick={() => onClick(formType)}>
      <div className="new-card-icon">+</div>
      <div className="title">Add New</div>
    </div>
  )
}