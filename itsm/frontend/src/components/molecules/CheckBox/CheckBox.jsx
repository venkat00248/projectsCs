import React from "react";
import './CheckBox.scss'

export const CheckBox = () => {
  return (
    <div className="checkBox">
    <div>
    <label className="container">Yes
      <input type="checkbox" />
      <span className="checkmark"></span>
    </label>
    </div>
    <div>
    <label className="container">No
      <input type="checkbox" />
      <span className="checkmark"></span>
    </label>
    </div>
    </div>
  );
};
