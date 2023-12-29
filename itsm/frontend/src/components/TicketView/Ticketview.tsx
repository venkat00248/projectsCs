import React, { useEffect, useState } from "react";
import { Modal, Accordion,Form, Tab, Tabs,Button,OverlayTrigger, Tooltip} from "react-bootstrap";
import {Tabsview} from './Tabs';
import { useTranslation } from "react-i18next";
import EditTicket from "./EditTicket";
import "./TicketView.scss";
import { config } from "../../config/config";

// import "moment-timezone";
import { componentMap } from "./ComponentMapping";
import { View } from "./View";
import { useSelector } from "react-redux";

// interface MyMomentProps extends MomentProps {
//   formattedDate: boolean;
// }

// const timezone = 'Asia/Kolkata';
//   const formattedDate = moment(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
interface ticketView {
  ticket?: any;
  view?:boolean
  rfcno?:any
}

const Ticketview: React.FC<ticketView> = ({ticket, view = true, rfcno}) => {
  const { t } = useTranslation();
  const [show, setshow] = useState(false);
  const [edit, setedit] = useState(false);

  const handleOnclick = (e: any) => {
    setshow(false);
  };
    const [themeClassName, setThemeClassName] = useState('');
    const theme = useSelector((state: any) => state.allReducers.theme.theme);
   useEffect(() => {
      setThemeClassName(theme ? 'tableview' : '');
    }, [theme]);
  return (
    <div className=" container">
       {view ? (
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id={`tooltip`}>{t("View")}</Tooltip>}
        >
          <span
            className="bi bi-eye-fill"
            onClick={() => {
              setshow(true);
            }}
          />
        </OverlayTrigger>
      ) : (
          <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip`}>{t("Click to View")}</Tooltip>}
        >
          <span className="countPopOver" onClick={() => {
              setshow(true);
            }}>
            {rfcno}
          </span>
        </OverlayTrigger>
      )}

      <Modal
        show={show}
        size="xl"
        scrollable={true}
        onHide={() => setshow(false)}
        dialogClassName="modal-100w" 
        className={`custom-modal ${themeClassName}`}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <div
          className="modal fade bd-example-modal-lg"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        />
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {t("Ticket Details")} 
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body >
            <View ticket= {ticket} ticketID = {ticket?.rfcno}/>          
        </Modal.Body>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={handleOnclick}
          >
            {t("Close")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Ticketview;
