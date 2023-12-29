import React, { useState, useEffect } from "react";
import { Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import Tabsview from "./Tabs";
import { config } from "../../config/config";
import { componentMap } from "./ComponentMapping";
import tabs from "./Tabs.json";
import "./TicketView.scss";
import EditTicket from "./EditTicket";
import { useTranslation } from "react-i18next";
import { DateFormat, DateFormatView, DateLastActivity } from "../Utils/DateFormat";
import { TicketTypeService } from "../../services/TicketTypeService";
import { Index } from "../molecules/Loader";
import { useSelector } from "react-redux";
import HorizontalStepper from "../molecules/Stepper/HorizontalStepper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { WorkFlowService } from "../../services/WorkFlowService";
import { toast } from "react-toastify";
import InlineEdit from "./InLineEdit";
interface Props {
  ticket?: any;
  ticketID?: any;
  ticketLoading?: boolean
}
const steps = [
  "Open",
  "Activity",
  "Pending on Management",
  "Pending on Customer",
  "Resolved",
  "Closed"
];

export const View = ({ ticket, ticketID, ticketLoading = true }: Props) => {
  const [edit, setedit] = useState(false)
  const [wingsVal, setwingsVal]: any = useState(null);
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const [themeClassName, setThemeClassName] = useState('');
 useEffect(() => {
    setThemeClassName(theme ? 'tableview' : '');
  }, [theme]);
  const [data, setData]: any = useState(null);
  const [laoding, setloading] = useState(ticketLoading);
  const [workflow, setworkflow] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
   const [workFlowID,setWorkFlowID] = React.useState()
  const [status, setStatus] = React.useState('');

  const { t } = useTranslation();
  const colorMap: any = {
    'P3': 'green',
    'P1': 'red',
    'P2': 'grey'
  }
  sessionStorage.setItem("ticketId", `${ticketID ? ticketID : ticket?.rfcno}`);
  const [activekeys, setactivekeys]: any = useState("0");
  const handleSelect = (eventKey: any) => {
    if (activekeys == "0") {
      setactivekeys()
    }
    else {
      console.log("selected", eventKey)
      setactivekeys(eventKey.toString())
    }
  }
  const fetchData = async (rfcno: string) => {
    try {
      const response:any = await TicketTypeService.getSerachResultsByTicket(rfcno);
      if (response?.source == 'handleSuccess') {
        setloading(false);
        setData(response?.data?.data?.data[0] || []);
      } else {
        const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/searchbyticket"]);
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
      console.log("Error", error);
    }
  };

  //********* Workflow Related Functionality *********//
  const workflowDetail = async (id:any) => {
    setloading(true);
    try {
      const response:any = await TicketTypeService.getWorkFlowById(id)
      if(response?.source == "handleSuccess") {
        const modifyWorkFlow = response?.data?.message?.wf?.steps;
        const updatedData = modifyWorkFlow?.map((obj:any) => {
          obj.name = steps[obj.id - 1];
          return obj;
        });
        setworkflow(updatedData)
        setloading(false);
      } else {
        const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/getWorkFlowByID"]);
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
      console.log(error)
    }
  } 

  function getIdFromName(status:any) {
    const obj:any = workflow?.find((item:any) => item?.name === status);
    return obj ? obj.id : null;
  }
  useEffect(() => {
    if(workflow?.length !== 0) {
      if(data || ticket) {
        const id = getIdFromName(data ? data.statustitle : ticket.statustitle);
        setActiveStep(id-1);
    }
    }
  }, [data, ticket, workflow]);
  const totalSteps = () => {
    return workflow?.length;
  };
  const isLastStep = () => {
    console.log(activeStep <= totalSteps() - 1);
    return activeStep <= totalSteps() - 1;
  };
  // const handleNext = () => {
  //   const newActiveStep = isLastStep();
  //   if (newActiveStep) {
  //     setActiveStep(activeStep + 1);
  //   }
  // };
  const handleNext = async () => {
    try{
        const res:any = await TicketTypeService.updateTicket({
          id:"64a40a2208614b23c76e775f",
          ticketPayload:{
            serverInfo:status
          }
         
})
    if(res?.source == "handleSuccess"){
      toast.success(`Status Updated Successfully`);
    } else {
      const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/updateTicket"]);
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
    console.log("res",res)
    }
    catch(error){
      console.log("error",error)
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep:any) => prevActiveStep - 1);
  };

  useEffect(() => {
    if(ticketID) {
      fetchData(ticketID);
    }
    // workflowDetail(1);
  }, [ticketID]);


  useEffect(() => {
    if (data?.wingname == null || ticket?.wingname == null) {
      setwingsVal(null)
    } else {
      if (data?.wingname) {
        setwingsVal(data?.wingname)
      } else {
        setwingsVal(ticket?.wingname)
      }
    }
  }, [ticket?.wingname, data?.wingname])
  const [actions, setActions]= useState<any>([])
  const fetchWorkflowData  = async ()=>{

    try{
      const response:any = await TicketTypeService.getMappedWorkflow()
      if(response?.source == "handleSuccess") {
        setWorkFlowID(response?.data.data.find((item:any) => item.workFlowId)?.workFlowId)
        // console.log("res id",response, response?.data.data.find((item:any) => item.workFlowId)?.workFlowId)
        if(workFlowID){
        const res:any = await WorkFlowService.getWorkFlowById(workFlowID)
          if(res?.source == "handleSuccess") {
            const parseData = JSON.parse(res.data.data.result.wf)
            const labels = parseData.nodes.map((node:any) => node.data.label);
            const uniqueLabels = labels.filter((label:any, index:any) => labels.indexOf(label) === index);
            setActions(uniqueLabels)
            // console.log("labels",uniqueLabels);
            // console.log(" get work flow by ID",res.data.data.result.wf)
          } else {
            toast.error("Fetch one workflow service down please try after some time", {
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
        // setActions(res.data.data.result.wf)
      } else {
        const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmticket.cloud4c.com/ticket/getMappedWorkflow"]);
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
    catch(error){
      console.log("error",error)
    }
  }
  
  useEffect(()=>{
    fetchWorkflowData()
  },[workFlowID])


  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const handleSave = (updatedValue:any) => {
    console.log("updated",updatedValue)
    setStatus(updatedValue);
    console.log("d",status)
  };
  
  return (
    <>
      {
        (laoding) ?
          <div style={{ position: "relative", top: 20, paddingBottom: "15px" }}>
            <Index />
          </div> :
          <Accordion activeKey={activekeys} onSelect={() => handleSelect(0)}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h6 className="Accordion-header">{data ? data.rfcno : ticket?.rfcno}</h6>
              </Accordion.Header>
              <Accordion.Body>
                {(ticket?.typetittle || data?.typetittle) == "Task" && (
                  <div className={`stepperContainer ${themeClassName}`}> 
                     <HorizontalStepper 
                      workflow = {workflow} 
                      activeStep = {activeStep}
                      />
                  </div>
                )}
                <div className="Edit-buttons">
                  <OverlayTrigger
                    delay={{ hide: 0, show: 30 }}
                    overlay={(props) => <Tooltip {...props}>{edit ? t("Close") : t("Edit")}</Tooltip>}
                    placement="bottom"
                  >
                    <i
                      className={
                        !edit
                          ? "fa-solid fa-pen-to-square"
                          : "fa-solid fa-xmark border rounded-3 border-2 border  p-2"
                      }
                      style={edit ? {
                        fontSize: "21px",
                        color: "red",
                        cursor: "pointer",
                        float: "right",
                        backgroundColor: `rgba(128, 0, 0, 0.1)`
                      } : {
                        fontSize: "25px", cursor: "pointer"
                      }}
                      onClick={() => {
                        setedit(!edit);
                      }}
                    ></i>

                  </OverlayTrigger>

                </div>
                {edit && <EditTicket ticket={ticket} />}
                {!edit && (
                  <div className={`container1 ${theme?"darkLayout":""}`} style={{paddingTop: "1rem", borderBottom: "1px solid #dee2e6"}}>
                    <div className="row">
                      <div className="col">
                        <div className="ticketViewRows">
                          <div className="label">{t("Ticket type")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div>{data ? data.typetittle ? data?.typetittle : "---" : ticket?.typetittle ? ticket?.typetittle : "---"}</div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label">{t("Created Date")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div>{data ? data?.ticketcreatedon ? DateFormat(data?.ticketcreatedon, false) : "---" : ticket?.ticketcreatedon ? DateFormat(ticket?.ticketcreatedon, false) : "---"}</div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label">{t("Priority")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div>
                              <span className={data ? colorMap[data?.prioritytitle.substring(0, 2)] ? `bg-${colorMap[data?.prioritytitle.substring(0, 2)]}` : `bg-${colorMap['P3']}` : colorMap[ticket?.prioritytitle.substring(0, 2)] ? `bg-${colorMap[ticket?.prioritytitle.substring(0, 2)]}` : `bg-${colorMap['P3']}`}>
                                {data ? data?.prioritytitle ? data?.prioritytitle : "---" : ticket?.prioritytitle ? ticket?.prioritytitle : "---"}</span></div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("SOP ID")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div> {data ? data?.sop_id ? data?.sop_id : "NA" : ticket?.sop_id ? ticket?.sop_id : "NA"}</div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Last Activity")}</div>
                          <div className="values">
                            <span className="colon">:</span>
                            <div>{data ? data?.lastactivity ? DateFormat(data?.lastactivity, false) : "---" : ticket?.lastactivity ? DateLastActivity(ticket?.lastactivity) : "---"}
                            </div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Owner")}</div>
                          <div className="values">
                            <span className="colon">:</span>
                            <div>{data ? data?.ticketowner ? data?.ticketowner : "---" : ticket?.ticketowner ? ticket?.ticketowner : "---"}
                            </div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Resolved Hours")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div> {data ? data?.resolvedtathours ? data?.resolvedtathours : "---" : ticket?.resolvedtathours ? ticket?.resolvedtathours : "---"}</div>
                          </div>
                        </div>
                      </div>

                      <div className="col">
                        <div className="ticketViewRows">
                          <div className="label">{t("Total Hours")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div>{data ? data?.ticketcreatedon ? DateFormatView(data?.ticketcreatedon) : "---" : ticket?.ticketcreatedon ? DateFormatView(ticket?.ticketcreatedon) : "---"}</div>
                          </div>
                        </div>
                        {/* <div className="ticketViewRows">
                     <div className="label"> Project Start Date</div>
                     <div className="values">
                       <span className="colon">:</span>
                       <div>{ DateFormat(ticket.ticket.ticketcreatedon) || "NA"} </div>
                     </div>
                   </div> */}
                        <div className="ticketViewRows">
                          <div className="label"> {t("Wings")}</div>
                          <div className="value">
                            <span className="colon">:</span>
                            <div>
                              {(wingsVal) ?
                                (wingsVal).replace(/^\w/, (c: any) => c.toUpperCase())
                                : "---"
                              }
                            </div>
                          </div>
                        </div>
                        <div className="ticketViewRows" >
                          <div className="label"> {t("Status")}</div>
                          <div className="value" >
                            <span className="colon">:</span>
                            {data?.typetittle == "Task" ?
                            /* <div>{data ? data?.statustitle ? data?.statustitle : "---" : ticket?.statustitle ? ticket?.statustitle : "---"}</div> */
                         
                         ( <InlineEdit
                          initialValue={ data?.statustitle}
                          options={actions}
                          onChange={handleSave}
                          // onSave={(value) => handleSave(item.id, value)}
                        />):(<div>{data ? data?.statustitle ? data?.statustitle : "---" : ticket?.statustitle ? ticket?.statustitle : "---"}</div> )}
                        </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Subject")}</div>
                          <div className="value spacing-value">
                            <span style={{ whiteSpace: "pre-wrap" }} className="colon">
                              :
                            </span>
                            <div style={{ wordWrap: "break-word" }}>
                              {data ? data.subject ? data?.subject : "---" : ticket?.subject ? ticket?.subject : "---"}
                            </div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Group")}</div>
                          <div className="value spacing-value">
                            <span className="colon">:</span>
                            <div> {data ? data?.ownergroup ? data?.ownergroup : "---" : ticket?.ownergroup ? ticket?.ownergroup : "---"}</div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Department")} </div>
                          <div className="value spacing-value">
                            <span className="colon">:</span>
                            <div> {data ? data?.departmentname ? data?.departmentname : "---" : ticket?.departmentname ? ticket?.departmentname : "---"}</div>
                          </div>
                        </div>
                        <div className="ticketViewRows">
                          <div className="label"> {t("Line of Business")}</div>
                          <div className="value spacing-value">
                            <span className="colon">:</span>
                            <div> {data ? data?.lob ? data?.lob : "---" : ticket?.lob ? ticket?.lob : "---"}</div>
                          </div>
                        </div>
                        {/* <div className="detailedButton">
                   <Button
                     style={{ fontSize: "12px" }}
                     onClick={() => {
                       window.open(`${config.MYSHIFT_URL}${localStorage.token}`);
                     }}
                   >
                     Go to detailed
                   </Button>
                 </div> */}
                      </div>
                    </div>
                  </div>
                )}
                {(ticket?.typetittle || data?.typetittle) == "Task" && (
                  <div className="stepperContainer">
                    <React.Fragment>
                      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        {/* <Button
                          style={{height: "24px"}}
                          variant="contained"
                          size= "small"
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                            <i className="fa fa-caret-left me-1"></i>
                          Back
                        </Button> */}
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext} sx={{ mr: 1 }} 
                        variant="contained"
                        style={{height: "24px"}}
                        size= "small" 
                        >
                          Next
                          <i className="fa fa-caret-right ms-1"></i>
                        </Button>
                      </Box>
                    </React.Fragment>
                </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
      }
      {(ticket?.typetittle || data?.typetittle) !== "Change Request" && (
        <div className="Tabs-communication">
          <Tabsview ticket={ticket} componentMap={componentMap} tabs={tabs} />
        </div>
      )}

      <div></div>
    </>
  );
};
