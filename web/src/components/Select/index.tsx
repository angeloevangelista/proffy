import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  name: string;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  name,
  options,
  children,
  ...rest
}) => {
  return (
    <div className="select-block">
      <label htmlFor={id}>{label}</label>
      <select defaultValue="" name={name} id={id} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
