import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ id, label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={id}>{label}</label>
      <textarea name={name} id={id} {...rest} />
    </div>
  );
};

export default TextArea;
