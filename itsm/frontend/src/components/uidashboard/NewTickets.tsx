import React, { useEffect, useState } from "react";
import "./Alltickets.scss";
import {
  DataTable,
  Button,
  Select,
  TicketTypeService,
  useTranslation,
  useSelector,
  config,
  handleDownload,
  CustomExport,
  IndexedDbService,
  FilterComponent,
  MappedTicketsData,
  ColumnsData,
} from "./Imports";
import { useDispatch } from "react-redux";
import { ConfigurableColumns } from "./ConfigurableColumns";
import {
  conditionalRowStyles,
  customStyles,
  inputValidation,
} from "../Utils/Utils";
import CustomModal from "../molecules/ConfirmModal/CustomModal";
import { ActionTypes } from "../../redux/constants/action-types";
import {
  filterTableByText,
  filterTableRecord,
} from "../Utils/FilterTableRecord";
import AllticketsSelect from "./SelectTickets";
import DBS from "./DBS.json";
import { createTheme } from "react-data-table-component";
import { MappedTicketsData2 } from "./MappedTicketsData";
import { toast } from "react-toastify";
type Option = {
  label: string;
  value: string;
};
export default function NewTickets() {
  // let optionsFilter: any = [{ value: "null", lable: "NONE" }];
  const [data, setData] = useState<any[]>([]);
  const dateRanges = useSelector((state: any) => state.dateRangeReducer);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { t } = useTranslation();
  const [columns, setColumns] = useState<any[]>(ColumnsData(t));
  const [allTickets, setAllTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [optionsFilter, setOptionsFilter] = useState([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filterRecord, setfilterRecord]: any = useState([]);
  const [ticketTypes, setTicketTypes]: any = useState();
  const [pending, setPending] = React.useState(true);
  const indexedDb = new IndexedDbService("TicketsDataList");
  const [showModal, setShowModal] = useState({ show: false, message: "" });
  const [ticketTypesTitle, setTicketTypesTitle]: any = useState();
  const [dataTableTheme, setDataTableThem] = useState("");
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  createTheme(
    "solarized",
    {
      background: {
        default: "#181a1b",
      },
    },
    "dark"
  );
  useEffect(() => {
    setDataTableThem(theme ? "solarized" : "default");
  }, [theme]);
  const item: any = [
    { label: t("XLSX"), value: "xls" },
    { label: t("CSV"), value: "csv" },
  ];
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = React.useState();
  const [merge, setMerge] = useState(0);
  const handleRowSelected = React.useCallback(
    (state: any) => {
      setSelectedRows(state.selectedRows);
      setMerge(state.selectedCount);
    },
    [selectedRows]
  );

  const paginationComponentOptions = {
    rowsPerPageText: t("Pages"),
    rangeSeparatorText: t("of"),
    selectAllRowsItem: true,
    selectAllRowsItemText: t("All"),
  };

  useEffect(() => {
    setColumns(ColumnsData(t));
  }, [t]);

  const fetchTickets = async () => {
    try {
      const res:any = await TicketTypeService.getAllTickets();
      if(res?.source == 'handleSuccess') {
        setAllTickets(res?.data.data)
        console.log("res new",res.data.data)
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/getAllTickets"]);
        toast.error(filteredErrors[0]['errorMsg'], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
useEffect(()=>{
fetchTickets()
},[])
  let filteredData: any;
  useEffect(() => {
    filteredData = allTickets || [];

    const mappedData = MappedTicketsData2(filteredData);
    setData(mappedData);
    setfilterRecord(filteredData);
  }, [allTickets, selectedOption, filterText, ticketTypesTitle]);

  return (
    <div className="allTickets ticketTypesWrapper">
      <div className="filterSelect">
        <div className="filterItems"></div>
        <div className="ticketTypes"></div>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={data}
        defaultSortAsc={false}
        customStyles={customStyles}
        subHeader
        persistTableHead
        highlightOnHover
        pointerOnHover
        pagination
        noDataComponent={t("There are no records to display")}
        // progressPending={pending}
        paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        selectableRowsVisibleOnly={true}
        // paginationServer
        // paginationTotalRows={totalPages * 1000}
        // onChangePage={(page) => handlePageChange(page)}
        conditionalRowStyles={conditionalRowStyles}
        paginationComponentOptions={paginationComponentOptions}
        theme={dataTableTheme}
      />
    </div>
  );
}
