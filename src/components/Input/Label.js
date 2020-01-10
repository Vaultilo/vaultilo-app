import React from 'react';
import './index.css';

const Label = (props) => {
  const {
    className = '',
    htmlFor,
    text,
    ...attributes
  } = props;

  return (
    <label
      className={`custom-label ${className}`}
      htmlFor={htmlFor}
      {...attributes}
    >
      {text}
    </label>
  );

};

export default Label;
