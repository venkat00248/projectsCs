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
import { conditionalRowStyles, customStyles, inputValidation } from "../Utils/Utils";
import CustomModal from "../molecules/ConfirmModal/CustomModal";
import { ActionTypes } from '../../redux/constants/action-types';
import { filterTableByText, filterTableRecord } from "../Utils/FilterTableRecord";
import AllticketsSelect from "./SelectTickets";
import DBS from './DBS.json'
import { createTheme } from "react-data-table-component";
import { toast } from "react-toastify";
type Option = {
  label: string;
  value: string;
};
export default function AllTickets() {
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
  const [showModal, setShowModal] = useState({show: false, message: ""});
  const [ticketTypesTitle, setTicketTypesTitle]:any= useState()
  const [dataTableTheme, setDataTableThem] = useState('');
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
  useEffect(() => {
    setDataTableThem(theme ? 'solarized' : 'default');
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
  const ticketTypeCounts: any = {};

  for (const ticketType of DBS.list) {
    ticketTypeCounts[ticketType.typetittle] = 0;
  }
  const handleSelectChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
  };
  const fetchTicketsByDate = async (
    limit: number = config.API.LIMIT,
    offset: number = 0
  ) => {
    const result = await indexedDb.createObjectStore(["ticketsList"]);
    if(result == undefined) {
      setPending(true);
      await indexedDb.deleteAll("ticketsList");
      const ticketIndexedDB = await indexedDb.getAllValue("ticketsList");
      if (ticketIndexedDB.length === 0) {
        dispatch({ type: ActionTypes.SET_TILE_FLAG, payload: {flag: false}})
        const res:any = await TicketTypeService.getOpenTicketsByDateRange(
          limit,
          offset,
          dateRanges.epochDateRange1,
          dateRanges.epochDateRange2
        );
        if(res?.source == 'handleSuccess') {
          const apiResponse = res?.data?.data?.list || [];
          // setTicketTypes(res?.data?.typeTitleCounts)
          for (const [key, value] of Object.entries(res?.data?.typeTitleCounts ?? {})) {
            ticketTypeCounts[key] = value; 
          }
          setTicketTypes(ticketTypeCounts)
          if (apiResponse.length > 0) {
            const checkIndexedDB = await indexedDb.getAllValue("ticketsList");
            if (checkIndexedDB.length > 0) {
              await indexedDb.deleteAll("ticketsList");
            }
            await indexedDb.putValue("ticketsList", res?.data?.data?.list || []);
            const ticketIndexedDB = await indexedDb.getAllValue("ticketsList");
            setAllTickets(apiResponse);
            // setTotalPages(Math.ceil(res?.data?.data?.totalCount / limit));
            setPending(false);
          } else {
            setPending(false);
            setAllTickets(apiResponse);
          }
        } else {
          const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/openticketsbyDate"]);
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
      }
    } else {
      setPending(true);
      dispatch({ type: ActionTypes.SET_TILE_FLAG, payload: {flag: false}})
      const res:any = await TicketTypeService.getOpenTicketsByDateRange(
        limit,
        offset,
        dateRanges.epochDateRange1,
        dateRanges.epochDateRange2
      );
      if(res?.source == 'handleSuccess') {
        const apiResponse = res?.data?.data?.list || [];
        if(apiResponse.length > 0) {
          setPending(false);
          setAllTickets(apiResponse);
        } else {
          setPending(false);
          setAllTickets(apiResponse);
        }
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/openticketsbyDate"]);
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
     
    }
  };
  const paginationComponentOptions = {
    rowsPerPageText: t("Pages"),
    rangeSeparatorText: t("of"),
    selectAllRowsItem: true,
    selectAllRowsItemText: t("All"),
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const limit = config.API.OPEN_TICKETS_BY_DATE.LIMIT;
    const offset = (page - 1) * limit;
    fetchTicketsByDate(limit, offset);
  };
  const fetchData = async () => {
    try {
      const res:any = await TicketTypeService.getDeptOpenTicket();
      if(res?.source == 'handleSuccess') {
        const lists = res?.data?.data?.list || [];
        const filteredList = lists.filter((item: any) => item.title != null)
        const mappedLists = filteredList.map((item: any) => ({
          label: item.title.trim(),
          value: item.departmentid,
        })).sort((a: any, b: any) => a.label.localeCompare(b.label));
        setOptionsFilter(mappedLists);
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/getdepartmentwise"]);
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
     
    } catch (error: any) {
      console.log("errrrrrr", error);
    }
  };
  useEffect(() => {
    setColumns(ColumnsData(t))
  }, [t])
  useEffect(() => {
    fetchData();
  }, []);

  const indexedDBfunction = async (
    limit: number = config.API.LIMIT,
    offset: number = 0
  ) => {
    if (dateRanges.epochDateRange1 && dateRanges.epochDateRange2) {
      fetchTicketsByDate(config.API.LIMIT, 0);
    }
  };

  useEffect(() => {
    // Call the function once when the component mounts
    if (
      dateRanges.epochDateRange1 !== undefined &&
      dateRanges.epochDateRange2 !== undefined
    ) {
      fetchTicketsByDate(config.API.LIMIT, 0);
    }
    // Set up an interval to call the function every 15 minutes
    const intervalId = setInterval(() => {
      indexedDBfunction(config.API.LIMIT, 0);
    }, 15 * 60 * config.API.LIMIT);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dateRanges]);

  let filteredData: any;
  useEffect(() => {
    filteredData = allTickets || [];
    if (selectedOption) {
      filteredData = filterTableRecord(filteredData, selectedOption);
      setResetPaginationToggle(!resetPaginationToggle);
    }
    if (filterText) {
      filteredData = filterTableByText(filteredData, filterText);
    }
    if (ticketTypesTitle) {
      filteredData = filteredData.filter(
        (ticket: any) =>
          ticketTypesTitle.value && ticket.typetittle == ticketTypesTitle.value
      );
    }
    setResetPaginationToggle(!resetPaginationToggle);
    filteredData.sort(
      (a: any, b: any) =>
        new Date(a.createdon).getTime() - new Date(b.createdon).getTime()
    );
    const mappedData = MappedTicketsData(filteredData);
    setData(mappedData);
    setfilterRecord(filteredData);
  }, [allTickets, selectedOption, filterText, ticketTypesTitle]);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => {
          setFilterText(inputValidation(e.target.value, /[^\w]/g));
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const handleExprtItem = (Option: any) => {
    if (filterRecord.length > 0) {
      handleDownload(Option, filterRecord);
    } else {
      setShowModal({ show: true, message: "No records in table !!" });
    }
  };
  const [selectedColumns, setSelectedColumns] = useState<any[]>(
    columns.map((col: any) => col.selector)
  );
  const handleColumnSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedColumns((prevSelectedColumns: any) => [
        ...prevSelectedColumns,
        name,
      ]);
    } else {
      setSelectedColumns((prevSelectedColumns: any) =>
        prevSelectedColumns.filter((col: any) => col !== name)
      );
    }
  };
  const handleCloseModal = () => {
    setShowModal({ show: false, message: "" });
  };
  function changedata(ev: any) {
    setTicketTypesTitle(ev)
  }
  return (
    <div className="allTickets ticketTypesWrapper">
      <CustomModal
        show={showModal.show}
        onHide={handleCloseModal}
        title={t("No Records")}
        footer={
          <>
            <Button variant="danger" onClick={handleCloseModal} style={{ padding: "2px", width: "50px" }}>
              {t("Ok")}
            </Button>
          </>
        }
      >
        <p>{t(showModal.message)}</p>
      </CustomModal>
      <div className="filterSelect">
        <div className="filterItems">
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={optionsFilter}
            placeholder={t("Filter by department")}
            isClearable={true}
          />
        </div>
        <div className="ticketTypes">
          <AllticketsSelect ticketTypes={ticketTypes} changedata={changedata} />
        </div>
        <CustomExport
          options={item}
          handleExprtItem={handleExprtItem}
          icon="fa-solid fa-download"
        />
        {merge > 1 && (
          <div className="merge-button">
            <Button disabled>{t("Merge")}</Button>
          </div>
        )}
        <ConfigurableColumns
          columns={columns}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          handleColumnSelectionChange={handleColumnSelectionChange}
          t={t}
        />
      </div>
      <DataTable
        title=""
        columns={columns.filter((col: any) =>
          selectedColumns.includes(col.selector)

        )}
        data={data}
        defaultSortAsc={false}
        customStyles={customStyles}
        subHeader
        persistTableHead
        subHeaderComponent={subHeaderComponentMemo}
        highlightOnHover
        pointerOnHover
        pagination
        noDataComponent={t("There are no records to display")}
        progressPending={pending}
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
