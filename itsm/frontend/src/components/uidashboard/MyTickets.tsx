import React, { useEffect, useState } from "react";
import "./Alltickets.scss";
import DataTable, { createTheme } from "react-data-table-component";
import Select from "react-select";
import { TicketTypeService } from "../../services/TicketTypeService";
import { useTranslation } from "react-i18next";
import { handleDownload } from "../Utils/Export";
import { CustomExport } from "../molecules/Export/CustomExport";
import FilterComponent from "../molecules/FilterComponent/filterComponent";
import { MappedTicketsData } from "./MappedTicketsData";
import { ColumnsData } from "./ColumnsData";
import { ConfigurableColumns } from "./ConfigurableColumns";
import { conditionalRowStyles, customStyles, inputValidation } from "../Utils/Utils";
import CustomModal from "../molecules/ConfirmModal/CustomModal";
import { Button } from "react-bootstrap";
import { filterTableByText, filterTableRecord } from "../Utils/FilterTableRecord";
import AllticketsSelect from "./SelectTickets";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/config";

type Option = {
  label: string;
  value: string;
};
interface props {          // Required to show tile count data //
  list?: any;
  type?: any;
  ticketTypes?:any
}
const MyTickets: React.FC<props> = ({ list, type ,ticketTypes}) => {

  // let optionsFilter: any = [{ value: "null", lable: "NONE" }];
  const [optionsFilter, setOptionsFilter] = useState([]);
  const { t } = useTranslation();
  const [columns, setColumns] = useState<any[]>(ColumnsData(t));
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [filterText, setFilterText] = React.useState("");
  const [filterRecord, setfilterRecord]: any = useState([]);
  const [pending, setPending] = React.useState(true);
  const [showModal, setShowModal] = useState({show: false, message: ""});
  const [ticketTypesTitle, setTicketTypesTitle]:any= useState()
  const item:any = [
    { label: t("XLSX"), value: "xls" },
    { label: t("CSV"), value: "csv" },
  ];
  const handleSelectChange = (selectedOption: Option | null) => {
    setSelectedOption(selectedOption);
  };
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
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  useEffect(() => {
    setDataTableThem(theme ? 'solarized' : 'default');
  }, [theme]);
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
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    setColumns(ColumnsData(t))
  },[t])
  useEffect(() => {
    if(type) {
      setFilterText(type);
    }
  }, [type])
  let filteredData: any;
  useEffect(() => {
    filteredData = list || [];
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
    // console.log(`filteredData`, JSON.stringify(filteredData));
    const isSupportUnixFormat:boolean = false;
    const mappedData = MappedTicketsData(filteredData,isSupportUnixFormat);
    setData(mappedData);
    setfilterRecord(filteredData);
    // alert(JSON.stringify(mappedData))
  }, [list, selectedOption, filteredData, filterText,ticketTypesTitle]);
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
          <>
            <CustomExport
              options={item}
              // buttonLabel={""}
              handleExprtItem={handleExprtItem}
              icon="fa-solid fa-download"
              // defaultvalue="xls"
            />
            <ConfigurableColumns
              columns={columns}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
              handleColumnSelectionChange={handleColumnSelectionChange}
              t={t}
            />
          </>
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
        noDataComponent={t("There are no records to display")}
        paginationComponentOptions={paginationComponentOptions}
        pointerOnHover
        pagination
        conditionalRowStyles={conditionalRowStyles}
        paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
        theme={dataTableTheme}
      />
    </div>
  );
}
export default MyTickets;