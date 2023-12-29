import React  from "react";
import "./Input.scss";

interface InputProps {
  label: string;
  value: string;
  errorMessage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export const Input = (props: InputProps) => {
  const { label, value, errorMessage, onChange, onBlur } = props;
  return (
    <div className="customInput">
      <div className="wrapper">
        <div className="input-data">
          <input type="text" required value={value} onChange={onChange} onBlur={onBlur} />
          <div className="underline"></div>
          <label>{label}</label>
          {errorMessage && <span className="errorMessage">{errorMessage}</span> }
        </div>
      </div>
    </div>
  );
};
