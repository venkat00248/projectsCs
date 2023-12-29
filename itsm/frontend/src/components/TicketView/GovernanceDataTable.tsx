import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { DateFormat } from "../Utils/DateFormat";
import FilterComponent from "../molecules/FilterComponent/filterComponent";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
export const GovernanceDataTable = ({ data }: any) => {
  const { t } = useTranslation();
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  createTheme(
    'solarized',
  {
      background: {
        default: '#181a1b',
      },
    },
    'dark',
  );
  const [dataTableTheme, setDataTableThem] = useState('');
  useEffect(() => {

    setDataTableThem(theme ? 'solarized': 'default');
  }, [theme]);
  const paginationComponentOptions = {
    rowsPerPageText: t("Pages"),
    rangeSeparatorText: t("of"),
    selectAllRowsItem: true,
    selectAllRowsItemText: t("All"),

  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "50px", // override the row height
        cursor: "default"
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "rgb(144, 144, 144)",
        color: "white",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const columns: any = [
    {
      name: t("Updated By"),
      selector: (row: any) => row.fullname,
      style: { width: "50px", cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,

    },

    {
      name: t("Remarks"),
      selector: (row: any) => row.remarks,
      sortable: true,
      sortIcon: <i className="faSort" />,
      cell: (row: any) => (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-${row.itilticketid}`}>
              {row.remarks}
            </Tooltip>
          }
        >
          <span className="organization">{row.remarks}</span>
        </OverlayTrigger>
      ),
       style: { width: "400px", fontSize: "12px", wordWrap: "break-word" },

    },

    {

      name: t("Created On"),
      selector: (row: any) => row.createdon,
      cell: (row: any) => moment(row.createdon, "YYYY-MM-DD HH:mm:ss").format(
        "Do MMMM YYYY h:mm A"
      ),
      style: { width: "100px", cursor: "default" },
      sortable: true,
      sortIcon: <i className="faSort" />,
    },
  ];
  const [filterText, setFilterText] = useState("");
  let filteredData = data || [];
  
  if (filterText) {
    filteredData = filteredData.filter((ticket: any) => {
      const createdOnString = moment(ticket.createdon).format( "Do MMMM YYYY h:mm A");
      const searchData = `${ticket.fullname} ${ticket.remarks} ${ticket.itilticketid}${createdOnString}`.toUpperCase();
      const filterData = filterText.toUpperCase();
      return searchData.includes(filterData);
    });
  }
  
  const subHeaderComponentMemo = React.useMemo(() => {

    return (
      <FilterComponent
        onFilter={(e: any) => {
          setFilterText(e.target.value);
        }}
        filterText={filterText}
      />
    );
  }, [filterText]);


  return (
    <DataTable
      columns={columns}
      data={filteredData}
      highlightOnHover
      pointerOnHover
      pagination
      subHeader
      // persistTableHead
      customStyles={customStyles}
      noDataComponent={t("There are no records to display")}
      paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
      subHeaderComponent={subHeaderComponentMemo}
      paginationComponentOptions={paginationComponentOptions}
      theme={dataTableTheme}
    />
  );
};
export default GovernanceDataTable;

