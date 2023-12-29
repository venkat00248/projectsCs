import React from "react";
import "./DataTable.scss";
export const DataTable = () => {
  return (
    <div className="DataTable">
      <div className="DataTable-col1">
        <div className="list-check-wrap">
          <input type="checkbox"></input>
          <figure className="avatar-icon">
            <img
              className="profilepic__img"
              alt="Mpicture"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
            />
          </figure>
        </div>
        <div className="list-content-wrap">
          <div className="content1">
            <span className="overDue">over due</span>
          </div>
          <div className="content2">Received a broken TV</div>
          <div className="content3">
            Matt Rogers (Acme Inc.) Created: 6 days ago Overdue by: 2 days
          </div>
        </div>
      </div>
      <div className="DataTable-col2">
        <div className="content12">
          {" "}
          <span className="medium "></span> <span>Medium</span>
          <span className="table_dropDown"></span>
        </div>
        <div className="content22">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="app-icon--small"
          >
            <path d="M23.922 23.085h2.638a1.203 1.203 0 110 2.406h-2.638v2.638a1.203 1.203 0 11-2.406 0v-2.638h-2.638a1.203 1.203 0 110-2.406h2.638v-2.638a1.203 1.203 0 112.406 0v2.638zm-8.209-5.961c-3.822 0-6.92-3.117-6.92-6.962S11.891 3.2 15.713 3.2s6.92 3.117 6.92 6.962-3.098 6.962-6.92 6.962zm0-2.421c2.492 0 4.513-2.033 4.513-4.541s-2.02-4.541-4.513-4.541c-2.492 0-4.513 2.033-4.513 4.541s2.02 4.541 4.513 4.541zm-9.04 12.612c0 .669-.539 1.211-1.203 1.211s-1.203-.542-1.203-1.211c0-4.589 3.924-8.274 8.725-8.274h5.014c.665 0 1.203.542 1.203 1.211s-.539 1.211-1.203 1.211h-5.014c-3.507 0-6.318 2.64-6.318 5.852z"></path>
          </svg>
          <span>Escaltion</span>
          <span className="table_dropDown"></span>
        </div>
        <div className="content32">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="app-icon--small"
          >
            <path d="M19.167 26.693a1.168 1.168 0 002.173.019l3.854-9.248h4.963c.65 0 1.176-.536 1.176-1.197s-.527-1.197-1.176-1.197h-5.742c-.472 0-.898.287-1.083.73l-3.049 7.316-6.856-17.275a1.168 1.168 0 00-2.149-.074L6.847 15.07H1.842c-.65 0-1.176.536-1.176 1.197s.527 1.197 1.176 1.197h5.742c.451 0 .862-.262 1.058-.675l3.596-7.55 6.927 17.454z"></path>
          </svg>
          <span>Open</span>
          <span className="table_dropDown"></span>
        </div>
      </div>
    </div>
  );
};
