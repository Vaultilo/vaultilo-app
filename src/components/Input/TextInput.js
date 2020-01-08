import React from 'react';
import './index.css';

const TextInput = (props) => {
  const {
    type = 'text',
    isValid = true,
    id,
    className = '',
    ...attributes
  } = props;

  if (type === 'textarea') {
    return (
      <textarea
        className={`custom-input form-control ${className} ${isValid ? 'valid' : 'invalid'}`}
        id={id}
        {...attributes}
      />
    );
  }

  return (
    <input
      className={`custom-input form-control ${className} ${isValid ? 'valid' : 'invalid'}`}
      type={type}
      id={id}
      {...attributes}
    />
  );

};
TextInput.defaultProps = {
  isValid: true,
  type: 'text',
};

export default TextInput;
