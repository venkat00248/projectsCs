import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ticketsdashboard.scss";
import { Breadcrumb, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { i18n } from "../../Translations/i18n";
import Select from "react-select";
import IndexedDbService from "../../services/IndexedDBService";
import { Index } from "../molecules/Loader/index";
import { Errors } from "./Errors";
import "./Ticketstile.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { DashboardStatsService } from "../../services/DashboardStatService";
import { DashboardTile } from "./DashboardTile";
import { pieOptions } from "../molecules/Charts/Options";
import { Charts } from "../molecules/Charts/Charts";
import { DateRange } from "../molecules/DateRangePicker/DateRange";
import { TicketTypeService } from "../../services/TicketTypeService";
import MyTickets from "./MyTickets";
import AllTickets from "./AllTickets";
import CloseTickets from "./CloseTickets";
import { filterRecord } from "../Utils/FilterRecord";
import UnAssignedTickets from "./UnAssignedTickets";
import { TabPanel, a11yProps } from "./TabPanel";
import { inputValidation } from "../Utils/Utils";
import { useSelector } from "react-redux";
import StatusCount from "./StatusCount";
import DBS from './DBS.json'
import CustomCanvas from "../molecules/Offcanvas.tsx/CustomCanvas";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/constants/action-types";
import { config } from "../../config/config";
import NewTickets from "./NewTickets";
import { FallbackComponent } from "../sampleException/FallbackComponent";
import { toast } from "react-toastify";

interface TicketstileProps {
  isValidToken: boolean;
  userDetails?: { staffid?: number };
}

//import { Error_service } from "../../services/ErrorHandler";
export const Ticketstile = ({
  isValidToken,
  userDetails,
}: TicketstileProps) => {
  const [value, setValue] = React.useState(0);
  const [ countTab, setCountTab] = useState(true);
  let [staffId, setStaffId] = useState(0);
  let [dashboardData, setDashboardData] = useState([]);
  const [myOwnTickets, setMyOwnTickets] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const [selectedOption, setSelectedOption] = useState(null);
  const [ticketTypes, setTicketTypes] :any = useState();
  const [key, setKey] = useState("myTickets");
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dateRanges = useSelector((state: any) => state.dateRangeReducer);
  const statusCount = useSelector((state:any) => state.ticketStatusCount);
  const unassignflag = useSelector((state: any) => state.ticketUnassingFlag);
  const [allDetailsErr, setallDetailsErr] = useState([]);
  const [getOwnerIdErr, setgetOwnerIdErr] = useState([]);
  const [openbyDateErr, setopenbyDateErr] = useState([]);
  const [ unAssignedErr, setunAssignedErr] = useState([]);
  // const [error, seterror]:any = useState([]);
  const flag = useSelector((state:any) => state.setTileFlg);
  const convasVal = useSelector((state:any) => state.convasFlag);
  const isThreeColumns = dashboardData.length === 3;
  let lconfig = config;
  const languageOptions = [  { value: "en", label: "English" }, 
   { value: "hindi", label: "Hindi" },];
   const ticketTypeCounts:any = {};
  //  if(sessionStorage.tenant_data){
  //     lconfig = JSON.parse(sessionStorage.tenant_data)['config.json'];
  //  }
   for (const ticketType of DBS.list) {
     ticketTypeCounts[ticketType.typetittle] = 0;
   }
  if(!sessionStorage.langOption){
    sessionStorage.langOption = "en";
  }
  const dispatch = useDispatch();
  const getDefaultLanguageOption = () => {
    const langOption = sessionStorage.getItem("langOption");
    if(langOption == 'en') {
      return languageOptions.find((option) => option.value === langOption) || languageOptions[0];
    } else {
      return languageOptions.find((option) => option.value === langOption) || languageOptions[1];
    }
  };
  
  useEffect(() => {
    const defaultOption:any = getDefaultLanguageOption();
    setSelectedOption(defaultOption);
    i18n.changeLanguage(defaultOption.value);
  }, []);
  
  function handleSelectChange(selectedOption: any) {
    setSelectedOption(selectedOption);
    sessionStorage.langOption = selectedOption.value;
    i18n.changeLanguage(selectedOption.value);
  }
  
  // Set default language to English
  // sessionStorage.langOption = "en";
  
  const data: any = [];
  const [slaDetails, setSlaDetails] = useState(data);;
  const [filterPendCust, setFilterPendCust] = useState([])
  const [filterUnassign, setFilterUnassing] = useState([])
  const [ErrorDashboardData, setErrorDashboardData] = useState([
    {title: 'Open', p1: [], p2: [], p3: []},
    {title: 'SLA Breaches', p1: [], p2: [], p3: []}
  ])
  const [styleChart] = useState({
    width: "100%",
    height: 271,
    border: "1px solid #5d5dd3",
  });
  const fetchSLA = async (list: any = []) => {
    const weekAgo = new Date();
    const result: any = [
      { name: "About to breach", value: 0 },
      { name: "With-in SLA", value: 0 },
    ];
    if (list.length === 0) {
      const id = sessionStorage.staffId || 0;
      const res:any = await TicketTypeService.getSLADetailsByStaffId(id);
      if(res?.source == 'handleSuccess') {
        list = res?.data?.data?.list || [];
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/ticketsByStaffid"]);
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
    const pastWeek = list.filter((item: any) => {
      const itemDate = new Date(item.createdon);
      weekAgo.setDate(weekAgo.getDate() - 7); // subtract 7 days from the current date
      return itemDate >= weekAgo;
    });
    // console.log("past", pastWeek);
    pastWeek.map((obj: any) => {
      if (obj.sla_aboutto_breach == "YES") {
        result[0].value++;
      } else if (obj.sla_aboutto_breach == "NULL") {
        result[1].value++;
      }
    });
    slaDetails["xaxis"] = result;
    slaDetails["pieSeries"] = result;
    const dates = new Date();
    const lastWeek = new Date(dates.getTime() - 7 * 24 * 60 * 60 * 1000);
    slaDetails[
      "text"
    ] = `Last week data from ${lastWeek.toLocaleDateString()} to ${dates.toLocaleDateString()}`;
    setSlaDetails(slaDetails);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch({ type: ActionTypes.SET_STATUS_COUNT, payload: null});
    setCountTab(false);
    setValue(newValue);
  };
  const indexedDb = new IndexedDbService("myshiftData");
  const fetchData = async (id = 195923, type = "Open") => {
      setIsLoading(true);
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: true});
      await indexedDb.createObjectStore(["alltickets"]);
      // console.log(`Fetching Data :: ${type} :: ---`);
      let res: any = {};
      if (type === "Open") {
        res = await DashboardStatsService.getAllTicketsStats(id);
        if(res?.source == 'handleSuccess') {
          fetchSLA(res.data.openTickets);
          setDashboardData(res.data.data);
          fetchData(sessionStorage.staffId, "mytickets");
        } else {
          const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/allTicketDetails"]);
          setallDetailsErr(filteredErrors);
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
          setIsLoading(false);
        }
       
      } else if (type === "mytickets") {
        if (sessionStorage.staffId) {
            res = await DashboardStatsService.getTicketsDataByOwnerId(
              sessionStorage.staffId
            );
            if(res?.source == 'handleSuccess') {
              for (const [key, value] of Object.entries(res?.data?.typeTitleCounts ?? {})) {
                ticketTypeCounts[key] = value; 
              }
              setTicketTypes(ticketTypeCounts)
              // setTicketTypes(res?.data?.typeTitleCounts)
              setMyOwnTickets(res?.data?.data?.list);
              await indexedDb.putValue("alltickets", res.data.data.list || []);
            } else {
              const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/mytickets"]);
              setgetOwnerIdErr(filteredErrors);
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
              setIsLoading(false);
            }
        } else {
          console.log(`Staff id not exist...`);
        }
      }
      setIsLoading(false);
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: false});
  };
  useEffect(() => {
    if (isValidToken && userDetails && userDetails?.staffid) {
      fetchData(userDetails.staffid, "Open");
      setStaffId(userDetails.staffid);
      // setMyOwnTickets(myOwnTickets);
    }
  }, [isValidToken, userDetails?.staffid]);
  
  // Un assigned Details //
  const fetchUnassign = async (limit: number = lconfig.API.LIMIT, offset: number = 1) => {
      const res:any = await TicketTypeService.getUnAssignedTickets(limit, offset);
      if(res?.source == 'handleSuccess') {
        const response = res?.data?.data?.list || [];
        const record = filterRecord(response)
        setFilterUnassing(record);
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/unAssignedTickets"]);
        setunAssignedErr(filteredErrors);
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
  // Open ticket by date range //
  const fetchTicketsByDate = async (
    limit: number = lconfig.API.LIMIT,
    offset: number = 0
  ) => {
      const res:any = await TicketTypeService.getOpenTicketsByDateRange(
        limit,
        offset,
        dateRanges.epochDateRange1,
        dateRanges.epochDateRange2
      );
      if(res?.source == 'handleSuccess') {
        const apiResponse = res?.data?.data?.list || [];
        if (apiResponse.length > 0) {
          const record = filterRecord(apiResponse, "Activity")
          if(record) {
            setFilterPendCust(record);
          }
        } else {
          const record = filterRecord(apiResponse, "Activity");
          setFilterPendCust(record);
        }
      } else {
        const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/openticketsbyDate"]);
        setopenbyDateErr(filteredErrors);
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
     
  };

  useEffect(() => {
    if (
      dateRanges.epochDateRange1 !== undefined &&
      dateRanges.epochDateRange2 !== undefined
    ) {
      fetchTicketsByDate(1000, 0);
    }
  }, [dateRanges, flag]);
  
  useEffect(() => {
    fetchUnassign();
  }, [isLoading, unassignflag.flag]);
  

  // SLA details for pie chart //
  
  // useEffect(() => {
  //   fetchSLA();
  // }, []);
    const options = pieOptions(slaDetails, selectedOption);
  // const options = React.useMemo(() => pieOptions(slaDetails, selectedOption), [slaDetails, selectedOption]);
  const handleInputChange = (inputValue:string) => {
    setInputValue(inputValidation(inputValue , /[^a-zA-Z]/g))
  };
  const handleTabDyn = () => {
    if(statusCount?.ticketCount?.title == 'Activity' ||
      statusCount?.ticketCount?.title == 'SLA Breaches') {
      setCountTab(true);
      setValue(4)
    } else if(statusCount?.ticketCount?.title == 'Un Assigned') {
      setValue(2)
    } else {
      setValue(0)
    }
  }
  useEffect(() => {
    if(statusCount.ticketCount !== null) {
      handleTabDyn()
    }
  }, [statusCount])
  const tileColorMap: any = {
    '0': 'tile-green tile-box',
    '1': 'tile-red tile-box',
    '2': 'tile-grey tile-box',
    '3': 'tile-yellow tile-box',
    // add more possible values and their colors here
  }
  return (
    <div>
      {isLoading ? (
        <div style={{ position: "relative", top: 250 }}>
          <Index />
        </div>
      ) : (
        <React.Fragment>
          <div className="header-tickets">
            <Breadcrumb className="breadcrumbs">
              <Breadcrumb.Item href="#">{t("Home")}</Breadcrumb.Item>
              <Breadcrumb.Item>{t("Dashboard")}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="dateAndLang">
              <DateRange />
              <Select
                  className="languageSelect"
                  value={selectedOption}
                  options={languageOptions}
                  onChange={handleSelectChange}
                  onInputChange={handleInputChange}
                  inputValue={inputValue}
                />
            </div>
          </div>
          <div>
            <Errors />
          </div>
          <div className="tile_wrapper">
            {/* <Col md={3} style={{paddingRight: "0px"}}> */}
              <>
                {
                  (allDetailsErr?.length !== 0 && allDetailsErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/allTicketDetails"]).length !==0)?
                  (<>
                    {
                      // allDetailsErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/allTicketDetails"]).map((err:any) => (
                      //   <FallbackComponent error={err?.errorMsg}/>
                      // )
                      // )
                      ErrorDashboardData.map((ticketstatus: any, key) => {
                        if (ticketstatus.title != "Closed") {
                          // Changes to stop card for close //
                          return (
                            <DashboardTile
                             className={key === 0 ? `${tileColorMap["1"]}` : `${tileColorMap["0"]}`}
                              key={key}
                              title={ticketstatus.title}
                              p1={ticketstatus.p1}
                              p2={ticketstatus.p2}
                              p3={ticketstatus.p3}
                              isThreeColumns={isThreeColumns}
                            />
                          );
                        }
                      })
                    }
                  </>):
                  (<>
                    {dashboardData.length > 0 &&
                dashboardData.map((ticketstatus: any, key) => {
                  if (ticketstatus.title != "Closed") {
                    // Changes to stop card for close //
                    return (
                      <DashboardTile
                       className={key === 0 ? `${tileColorMap["1"]}` : `${tileColorMap["0"]}`}
                        key={key}
                        title={ticketstatus.title}
                        p1={ticketstatus.p1}
                        p2={ticketstatus.p2}
                        p3={ticketstatus.p3}
                        isThreeColumns={isThreeColumns}
                      />
                    );
                  }
                })}
                  </>)
                }
              </>
            {/* </Col>
            <Col md={3} style={{paddingRight: "0px"}}> */}
              <>
                {
                  (unAssignedErr?.length !== 0 && unAssignedErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/unAssignedTickets"]).length !== 0)?
                  (<>
                    {/* {
                      unAssignedErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/unAssignedTickets"]).map((err:any) => (
                        <FallbackComponent error={err?.errorMsg}/>
                      )
                      )
                    } */}
                    <DashboardTile 
                      title="Un Assigned"
                      className={`${tileColorMap["2"]}`}
                    />
                  </>):
                  (<>
                    {
                    filterUnassign.length > 0 && dashboardData &&
                    filterUnassign?.map((ticketstatus: any, key) => {
                        return (
                          <DashboardTile
                            className={`${tileColorMap["2"]}`}
                            key={key}
                            title={ticketstatus.title}
                            p1={ticketstatus.p1}
                            p2={ticketstatus.p2}
                            p3={ticketstatus.p3}
                            isThreeColumns={isThreeColumns}
                          />
                        );
                    })
                    }
                  </>)
                }
              </>
              <>
                {
                  (openbyDateErr?.length !== 0 && openbyDateErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/openticketsbyDate"]).length !== 0)?
                  <>
                    {/* {
                      openbyDateErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/openticketsbyDate"]).map((err:any) => (
                        <FallbackComponent error={err?.errorMsg}/>
                      )
                      )
                    } */}
                    <DashboardTile
                      title="Pending On Activity"
                      className={`${tileColorMap["3"]}`}
                    />
                  </>:
                  <>
                  {
                  filterPendCust.length > 0 && dashboardData &&
                  filterPendCust?.map((ticketstatus: any, key) => {
                      return (
                        <DashboardTile
                          className={`${tileColorMap["3"]}`}
                          key={key}
                          title={ticketstatus.title}
                          p1={ticketstatus.p1}
                          p2={ticketstatus.p2}
                          p3={ticketstatus.p3}
                          isThreeColumns={isThreeColumns}
                        />
                      );
                  })
                  }
                  </>
                }
              </>
          </div>
            {/* </Col> */}
            <>
             { 
              (allDetailsErr?.length !== 0 && allDetailsErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/allTicketDetails"]).length !==0)?
              (<div>
                {/* {
                  allDetailsErr?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/allTicketDetails"]).map((err:any) => (
                    <FallbackComponent error={err?.errorMsg}/>
                  )
                  )
                } */}
                <Col className="chart_col">
                  <Charts options={options} id="pieId" styleData={styleChart} />
                </Col>
              </div>):(
                <>
                  {dashboardData ? (
                    <Col className="chart_col">
                      <Charts options={options} id="pieId" styleData={styleChart} />
                    </Col>
                  ) : null}
                </>
              )
              }
            </>
            
         
          <div id="relatedItem">
            <br></br>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example tabContainer"
                >
                  <Tab label={t("My Tickets")} {...a11yProps(0)} />
                  <Tab label={t("All Tickets")} {...a11yProps(1)} />
                  <Tab label={t("Un Assigned Tickets")} {...a11yProps(2)} />
                  <Tab label={t("Closed Tickets")} {...a11yProps(3)} />
                  {
                   ((statusCount?.ticketCount?.title === 'Activity' ||
                      statusCount?.ticketCount?.title === 'SLA Breaches') && countTab)?
                   <Tab 
                    label={
                    statusCount?.ticketCount?.title === 'Activity'
                      ? t(`Pending on Activity-${statusCount?.ticketCount?.type}`)
                      : t(`${t(statusCount?.ticketCount?.title)}-${t(statusCount?.ticketCount?.type)}`)
                    } {...a11yProps(4)} 
                    />:null
                  }
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {
                  (statusCount?.ticketCount?.title == 'Open')?
                    <MyTickets list={myOwnTickets} type={statusCount?.ticketCount?.type} ticketTypes={ticketTypes} />:
                    (myOwnTickets) ? <MyTickets list={myOwnTickets} ticketTypes={ticketTypes} /> : null
                }
              </TabPanel>
              <TabPanel value={value} index={1}>
                <NewTickets />
              </TabPanel>
              <TabPanel value={value} index={2}>
                {   
                  (statusCount?.ticketCount?.title == 'Un Assigned')?
                    <UnAssignedTickets type={statusCount?.ticketCount?.type} />:
                    <UnAssignedTickets/>
                }
              </TabPanel>
              <TabPanel value={value} index={3}>
                {myOwnTickets ? <CloseTickets /> : null}
              </TabPanel>
              <TabPanel value={value} index={4}>
                <StatusCount list={statusCount?.ticketCount?.props} type={statusCount?.ticketCount?.type}/>
              </TabPanel>
            </Box>
          </div>
        </React.Fragment>
      )}
      {
        (convasVal)?
          <CustomCanvas placement='bottom' name='bottom' convasVal = {convasVal}/>:null
      }
    </div>
  );
};
