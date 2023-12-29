import React from 'react'
import './OffRamp.scss'
export const OffRamp = () => {
  return (
    <center>
      <button type="button" className="btn btn-primary">
        <a className="btn" href="/">
          Back to home
        </a>
      </button>
      <h1>404</h1>
      <h2>The page you are looking for doesn't exist.</h2>

      <div>
        <img src="./not-found.svg" alt="not found"></img>
      </div>
    </center>
  );
};
