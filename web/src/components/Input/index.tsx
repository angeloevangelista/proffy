import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ id, label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input type="text" name={name} id={id} {...rest} />
    </div>
  );
};

export default Input;
