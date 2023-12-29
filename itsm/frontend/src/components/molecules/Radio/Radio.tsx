import React from "react";
import "./Radio.scss";
export const Radio = () => {
  return (
    <div className="radio-button">
      <div className="container">
        <div className="radios">
          <input type="radio" id="small" name="size" />
          <label htmlFor="small">Yes</label>
        </div>
        <div className="radios">
          <input type="radio" id="large" name="sizee" />
          <label htmlFor="large">No</label>
        </div>
      </div>
    </div>
  );
};
