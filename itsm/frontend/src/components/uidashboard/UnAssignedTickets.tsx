import React, { useEffect, useState } from "react";
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
import { ConfigurableColumns } from "./ConfigurableColumns";
import { conditionalRowStyles, customStyles, inputValidation } from "../Utils/Utils";
import CustomModal from "../molecules/ConfirmModal/CustomModal";
import { filterTableByText, filterTableRecord } from "../Utils/FilterTableRecord";
import AllticketsSelect from "./SelectTickets";
import DBS from './DBS.json'
import { createTheme } from "react-data-table-component";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/constants/action-types";
import { toast } from "react-toastify";

type Option = {
  label: string;
  value: string;
};
interface props {
  type?: any
}
const UnAssignedTickets: React.FC<props> = ({ type }) => {
  // let optionsFilter: any = [{ value: "null", lable: "NONE" }];
  const [data, setData] = useState<any[]>([]);
  const dateRanges = useSelector((state: any) => state.dateRangeReducer);
  const { t } = useTranslation();
  const [columns, setColumns] = useState<any[]>(ColumnsData(t));
  const [allTickets, setAllTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [optionsFilter, setOptionsFilter] = useState([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filterRecord, setfilterRecord]: any = useState([]);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [pending, setPending] = React.useState(true);
  const indexedDb = new IndexedDbService("TicketsDataList");
  const [showModal, setShowModal] = useState({show: false, message: ""});
  const [ticketTypes, setTicketTypes] :any = useState();
  const [ticketTypesTitle, setTicketTypesTitle]:any= useState()
  const unassignflag = useSelector((state: any) => state.ticketUnassingFlag);
  const dispatch = useDispatch();
  const item: any = [
    { label: t("XLSX"), value: "xls" },
    { label: t("CSV"), value: "csv" },
  ];
  const ticketTypeCounts:any = {};

  for (const ticketType of DBS.list) {
    ticketTypeCounts[ticketType.typetittle] = 0;
  }
  const [selectedRows, setSelectedRows] = React.useState();
  const [merge, setMerge] = useState(0);
  const handleRowSelected = React.useCallback(
    (state: any) => {
      setSelectedRows(state.selectedRows);
      setMerge(state.selectedCount);
    },
    [selectedRows]
  );
  const [dataTableTheme, setDataTableThem] = useState('');
  createTheme(
    'solarized',
  {
      background: {
        default: '#181a1b',
      },
    },
    'dark',
  );
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  useEffect(() => {
    setDataTableThem(theme ? 'solarized': 'default');
  }, [theme]);
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col: any) => col.selector)
  );
  const handleSelectChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
  };
  const fetchUnAssignedTickets = async (
    limit: number = config.API.LIMIT,
    offset: number = 1
  ) => {
    try {
      if(unassignflag.flag) {
        dispatch({ type: ActionTypes.SET_UNASSIGN_FLAG, payload: false});
      } else {
        dispatch({ type: ActionTypes.SET_UNASSIGN_FLAG, payload: true});
      }
      const res:any = await TicketTypeService.getUnAssignedTickets(limit, offset);
      if(res?.source == 'handleSuccess') {
        setAllTickets(res?.data?.data?.list || []);
        // setTicketTypes(res?.data?.typeTitleCounts)
        for (const [key, value] of Object.entries(res?.data?.typeTitleCounts ?? {})) {
          ticketTypeCounts[key] = value; 
        }
        setTicketTypes(ticketTypeCounts)
        // setTotalPages(Math.ceil(res?.data?.data?.totalCount / limit));
        setTotalPages(2);
        setPending(false);
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/unAssignedTickets"]);
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
      //return Error_service.errorHandle(error);
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
    const limit = config.API.UN_ASSIGNED_TICKETS.LIMIT;
    const offset = (page - 1) * limit;
    fetchUnAssignedTickets(limit, offset);
  };
  const fetchData = async () => {
    try {
      const res:any = await TicketTypeService.getDeptOpenTicket();
      if(res?.source == 'handleSuccess') {
        const lists = res?.data?.data?.list || [];
        const filteredList = lists.filter((item: any) => item.title != null);
        const mappedLists = filteredList
          .map((item: any) => ({
            label: item.title.trim(),
            value: item.departmentid,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));
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
      //return Error_service.errorHandle(error);
    }
  };
  useEffect(()=>{
    setColumns(ColumnsData(t))
  },[t])
  useEffect(() => {
    fetchData();
    fetchUnAssignedTickets();
  }, []);
  useEffect(() => {
    if(type) {
      setFilterText(type);
    }
  }, [type])
  let filteredData: any;
  useEffect(() => {
    filteredData = allTickets || [];
    // alert(JSON.stringify(list))
    if (selectedOption) {
      filteredData = filterTableRecord(filteredData, selectedOption);
    }
    if (filterText) {
      filteredData = filterTableByText(filteredData, filterText);
    }
    if(ticketTypesTitle){
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
  }, [allTickets, selectedOption, filterText,ticketTypesTitle]);
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
      setShowModal({show: true, message: "No records in table !!"});
    }
  };

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
    setShowModal({show: false, message: ""});
  };
  function changedata(ev:any){
    setTicketTypesTitle(ev)
    }
  return (
    <div className="allTickets ticketTypesWrapper">
    <CustomModal
        show={showModal.show}
        onHide={handleCloseModal}
        title = {t("No Records")}
        footer={
          <>
            <Button variant="danger" onClick={handleCloseModal} style= {{padding: "2px", width: "50px"}}>
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
            // className="w-100"
            value={selectedOption}
            onChange={handleSelectChange}
            options={optionsFilter}
            placeholder={t("Filter by department")}
            isClearable={true}
          />
        </div>
        <div className="ticketTypes">
      <AllticketsSelect ticketTypes={ticketTypes} changedata={changedata}/>
      </div>
        <CustomExport
          options={item}
          // buttonLabel={""}
          handleExprtItem={handleExprtItem}
          icon="fa-solid fa-download"
          // defaultvalue="xls"
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
export default UnAssignedTickets;