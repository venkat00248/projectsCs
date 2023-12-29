import React, { useEffect, useState } from "react";
import "./Alltickets.scss";
import DataTable, { createTheme } from "react-data-table-component";
import Select from "react-select";
import { TicketTypeService } from "../../services/TicketTypeService";
import { useTranslation } from "react-i18next";
import { handleDownload } from "../Utils/Export";
import { CustomExport } from "../molecules/Export/CustomExport";
import FilterComponent from "../molecules/FilterComponent/filterComponent";
import { customStyles, inputValidation } from "../Utils/Utils";
import { MappedTicketsData } from "./MappedTicketsData";
import { ColumnsData } from "./ColumnsData";
import { ConfigurableColumns } from "./ConfigurableColumns";
import CustomModal from "../molecules/ConfirmModal/CustomModal";
import { Button } from "react-bootstrap";
import { filterTableByText, filterTableRecord } from "../Utils/FilterTableRecord";
import AllticketsSelect from "./SelectTickets";
import DBS from './DBS.json'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/config";

type Option = {
  label: string;
  value: string;
};
export default function CloseTickets() {
  // let optionsFilter: any = [{ value: "null", lable: "NONE" }];
  const [optionsFilter, setOptionsFilter] = useState([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [filterText, setFilterText] = React.useState("");
  const [filterRecord, setfilterRecord]: any = useState([]);
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  const [pending, setPending] = React.useState(true);
  const [showModal, setShowModal] = useState({show: false, message: ""});
  const item:any = [
    { label: t("XLSX"), value: "xls" },
    { label: t("CSV"), value: "csv" },
  ];
  const [closedTickets, setClosedTickets] = useState([]);
  const [ticketTypes, setTicketTypes] :any = useState();
  const [ticketTypesTitle, setTicketTypesTitle]:any= useState()
  const handleSelectChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
  };
  const [dataTableTheme, setDataTableThem] = useState('');
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  useEffect(() => {
    setDataTableThem(theme ? 'solarized': 'default');
  }, [theme]);
  const [columns, setColumns] = useState<any[]>(ColumnsData(t));
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col: any) => col.selector)
  );
  const ticketTypeCounts:any = {};

  for (const ticketType of DBS.list) {
    ticketTypeCounts[ticketType.typetittle] = 0;
  }
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
  const fetchCloseTicket = async (id = 20648) => {
    try {
      const res:any = await TicketTypeService.getcloseTicketByOwnerId(sessionStorage.staffId);
      if(res?.source == 'handleSuccess') {
        const lists = res?.data?.data?.list || [];
        setClosedTickets(lists);
        for (const [key, value] of Object.entries(res?.data?.typeTitleCounts ?? {})) {
          ticketTypeCounts[key] = value; 
        }
        setTicketTypes(ticketTypeCounts)
        // setTicketTypes(res?.data?.typeTitleCounts)
        setPending(false);
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/closetickets"]);
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
      
    } catch(error) {
      console.log("CloseTicket", error)
    }
  }
  useEffect(()=>{
    setColumns(ColumnsData(t, false))
  },[t])
  useEffect(() => {
    fetchData();
    fetchCloseTicket(sessionStorage.staffId);

  }, []);
  let filteredData: any;
  useEffect(() => {
    filteredData = closedTickets || [];
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
    filteredData.sort(
      (a: any, b: any) =>
        new Date(a.createdon).getTime() - new Date(b.createdon).getTime()
    );
    const mappedData = MappedTicketsData(filteredData,false);
    setData(mappedData);
    setfilterRecord(filteredData);
    // alert(JSON.stringify(mappedData))
  }, [closedTickets, selectedOption, filterText,ticketTypesTitle]);

  const paginationComponentOptions = {
    rowsPerPageText: t("Pages"),
    rangeSeparatorText: t("of"),
    selectAllRowsItem: true,
    selectAllRowsItemText: t("All"),
  };
  const handleExprtItem = (Option: any) => {
    if (filterRecord.length > 0) {
      handleDownload(Option, filterRecord);
    } else {
      setShowModal({show: true, message: "No records in table !!"});
    }
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    // const handleClear = () => {
    // 	if (filterText) {
    // 		setFilterText('');
    // 	}
    // };

    return (
      <FilterComponent
        onFilter={(e: any) => {
          setFilterText(inputValidation(e.target.value, /[^\w]/g));
        }}
        filterText={filterText}
      />
    );
  }, [filterText]);
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
  createTheme(
    'solarized',
  {
      background: {
        default: '#181a1b',
      },
    },
    'dark',
  );
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
          handleExprtItem={handleExprtItem}
          icon="fa-solid fa-download"
        />
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
        progressPending={pending}
        highlightOnHover
        noDataComponent={t("There are no records to display")}
        paginationComponentOptions={paginationComponentOptions}
        pointerOnHover
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
        theme={dataTableTheme}
      />
    </div>
  );
}
