import React, { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import DataTable from 'react-data-table-component';
import "./popOver.scss";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Ticketview from '../TicketView/Ticketview';
import { useTranslation } from "react-i18next";

interface PopOverProps {
  title?: string;
  counts?: any;
  ticketstatus?:any
}

const PopOver: React.FC<PopOverProps> = ({...props}) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [data, setData]:any = useState([])
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const handleClick = (event:any) => {
    setShow(!show);
    setTarget(event.target);
  };

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    setShow(false);
  }
  };
  document.addEventListener("click", handleClickOutside);
  return () => {
  document.removeEventListener("click", handleClickOutside);
  };
}, [ref]);

const handleModal = (event:any) => {
  event.stopPropagation()
}
useEffect(() => {
const mappedData = props.ticketstatus?.map((ticket: any) => ({
  Ref_id:  <Ticketview ticket={ticket} view = {false} rfcno = {ticket.rfcno}/>,
  subject: ticket.subject,
}));
setData(mappedData);
}, [props.ticketstatus])

const columns = [
{
  name: t("#Ref. Id"),
  selector: (row: any) => row.Ref_id,
  style: { cursor: "default", whiteSpace:"break-spaces", width: "20px"},
},
{
  name: t("Subject"),
  selector: (row: any) => row.subject,
  style: { cursor: "default", whiteSpace:"break-spaces", width: "20px"},
  cell: (row: any) => (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${row.subject}`}>
          {row.subject}
        </Tooltip>
      }
    >
      <span className="organization">{row.subject}</span>
    </OverlayTrigger>
  ),
},
]
const customStyles = {
  rows: {
    style: {
      minHeight: "50px", // override the row height
      whiteSpace: "break-spaces",
    },
  },
  headCells: {
    style: { // override the cell padding for head cells
      backgroundColor:"rgb(144, 144, 144)",
      color:"white",
      height: "35px",
      whiteSpace: "break-spaces",
    },
  },
  cells: {
    style: {
      paddingLeft: "4px", // override the cell padding for data cells
      paddingRight: "4px",
      whiteSpace: "break-spaces !important",
    },
  },
};

  // console.log(data)
  return (
    <div ref={ref}>
      <button 
        onClick={handleClick}
        className='popOverButton'
      >
        <OverlayTrigger
          delay={{ hide: 0, show: 30 }}
          overlay={(props) => <Tooltip {...props}>{t("View Details")}</Tooltip>}
          placement="bottom"
        >
          <span>{props.counts}</span>
        </OverlayTrigger>
      </button>
      <Overlay
        show={show}
        target={target}
        placement="right"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained" className='popMain' onClick={handleModal}>
          {/* <Popover.Header as="h3" className='text-black'>{props.title}</Popover.Header> */}
          <Popover.Body style={{maxHeight: "200px", overflowY: 'auto', padding: "6px" }}>
            <div>
              <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                className="my-data-table"
                highlightOnHover
              />
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default PopOver;
