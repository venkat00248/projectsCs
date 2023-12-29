import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const ColumnsData = (t: any, isSort:boolean = true) => {
  const colorMap: any = {
    'P3': 'green',
    'P1': 'red',
    'P2': 'grey',
    // add more possible values and their colors here
  }


  return [
    {
      name: t("#Ref.Number"),
      selector: "itilticketid",
      style: { cursor: "default" },
      sortable: true,
      sortIcon: <i className="fa-arrows-up-down" />,
    },

    {
      name: t("Owner"),
      selector: "username",
      style: { cursor: "default", width: "112px" },
      sortable: true,
      sortIcon: <i className="faSort" />,
      cell: (row: any) => {
        const name = row.username;
        if (name.length > 18) {
          return (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${row.itilticketid}`}>
                  {row.username}
                </Tooltip>
              }
            >
              <span className="organization">{name.substring(0, 18)}...</span>
            </OverlayTrigger>
          );
        } else {
          return <span className="organization">{name}</span>;
        }
      }

    },
    {
      name: t("Dept Name"),
      selector: "deptName",
      style: { cursor: "default", width: "112px" },
      sortable: true,
      sortIcon: <i className="fa-sort" />,

    },
    {
      name: t("Org. Name"),
      selector: "organization",
      sortable: true,
      sortIcon: <i className="faSort" />,
      cell: (row: any) => {
        const name = row.organization;
        if (name.length > 18) {
          return (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${row.itilticketid}`}>
                  {row.organization}
                </Tooltip>
              }
            >
              <span className="organization">{name.substring(0, 18)}...</span>
            </OverlayTrigger>
          );
        } else {
          return <span className="organization">{name}</span>;
        }
      }
    },
    {
      name: t("Status"),
      selector: "statustitle",
      style: { cursor: "default" },
      sortable: isSort,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Priority"),
      selector: "prioritytitle",
      style: { cursor: "default" },
      cell: (row: any) => <span className={colorMap[row.prioritytitle.substring(0, 2)] ? `bg-${colorMap[row.prioritytitle.substring(0, 2)]}` : `bg-${colorMap["P3"]}`}>{row.prioritytitle}</span>,

      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Org. Type"),
      selector: "orgtype",
      style: { cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Created By"),
      selector: "createdname",
      style: { cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Line of Business"),
      selector: "lob_name",
      style: { cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Wing"),
      selector: "wingname",
      style: { cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Created Date"),
      selector: "createdon",
      cell: (row: any) => row.createdon,
      style: { cursor: "default", fontSize: "12px", width: "350px" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Last Activity"),
      selector: "lastactivity",
      style: { cursor: "default", fontSize: "12px", width: "350px" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Last Replier"),
      selector: "lastreplier",
      style: { cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
    {
      name: t("Action"),
      selector: "action",
      cell: (row: any) => <span className="organization">{row.action}</span>,
    },
  ];
}
