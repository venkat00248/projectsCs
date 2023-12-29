import React, { useState, useEffect } from "react";
import { Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import Tabsview from "./Tabs";
import { config } from "../../config/config";
import { componentMap } from "./ComponentMapping";
import tabs from "./Tabs.json";
import "./TicketView.scss";
import EditTicket from "./EditTicket";
import { useTranslation } from "react-i18next";
import {
  DateFormat,
  DateFormatForWF,
  DateFormatView,
  DateLastActivity,
} from "../Utils/DateFormat";
import { TicketTypeService } from "../../services/TicketTypeService";
import { Index } from "../molecules/Loader";
import { useSelector } from "react-redux";
import HorizontalStepper from "../molecules/Stepper/HorizontalStepper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { WorkFlowService } from "../../services/WorkFlowService";
import { toast } from "react-toastify";
import InlineEdit from "./InLineEdit";
interface Props {
  ticket?: any;
  ticketID?: any;
}

export const NewView = ({ ticket, ticketID }: any) => {
  const [wingsVal, setwingsVal]: any = useState(null);
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  // const [data, setData]: any = useState(null);
  const [workflow, setworkflow] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [workFlowID, setWorkFlowID] = React.useState();
  const [initialValue, setInitialValue] = React.useState("")
  // let  initialValue :any;
  let defaultValue:any;
  const [status, setStatus] = React.useState("");
  const [source, setSource] = React.useState("");
  const [target, setTarget] = React.useState("");
  console.log("ticket view " ,ticket)
  const { t } = useTranslation();
  const colorMap: any = {
    P3: "green",
    P1: "red",
    P2: "grey",
  };

  const handleNext = async () => {
    try {
      const res:any = await TicketTypeService.updateTicket({
        id: ticketID,
        ticketPayload: {
          status:{
          name: status,
          statusId:target
          }
        },
      });
      if(res?.source == "handleSuccess") {
        console.log("nexttt", target )
        const response:any = await WorkFlowService.mapWorkFlow({
          ticketId:ticketID,
          workFlowId:workFlowID,
          transitionNodes:{
            source:ticket.status.statusId,
            target:target
          }
        })
        if(response?.source == 'handleSuccess') {
          setSource(target)
          setInitialValue(status)
          console.log("response", response)
          if (res) {
            toast.success(`Status Updated Successfully`);
          }
          console.log("res", res);
        } else {
          const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/workflow/published/map-workflow"]);
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
      
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  const [actions, setActions] = useState<any>([]);
 console.log("initial Value", initialValue)
  const fetchWorkflowData = async () => {
    try {
      const response:any = await TicketTypeService.getMappedWorkflow();
      if(response?.source == 'handleSuccess') {
        setWorkFlowID(
          response?.data.data.find((item: any) => item.workFlowId)?.workFlowId
        );
        // console.log("res id",response, response?.data.data.find((item:any) => item.workFlowId)?.workFlowId)
        if (workFlowID) {
          const res: any = await WorkFlowService.getWorkFlowById(workFlowID);
          if(res?.source == 'handleSuccess') {
            const parseData = JSON.parse(res.data.data.result.wf);
            console.log("labels",parseData);
            const nodes = parseData.nodes;        
            const newNode = nodes.map((node:any) => {
              return {
                target: node._id,
                label: node.data.label
              };
            });
            console.log("new Node", newNode)
            const startNode = nodes.find((node:any) => node.isStart);
            //  initialValue = startNode ? startNode.data.label : '';
             setInitialValue(startNode.data.label)
             setSource(startNode._id) 
             console.log("is start", startNode)
             console.log("def",defaultValue)
            
            const edges = parseData.edges
            // const output = edges.map((edge:any) => {
            //   const sourceNode = nodes.find((node:any) => node.id === edge.source);
            //   const targetNode = nodes.find((node:any) => node.id === edge.target);
            // // console.log("nodesssss", sourceNode)
            //   return {
            //     label: sourceNode.data.label,
            //     source: sourceNode._id,
            //     target: targetNode._id 
            //   };
            // });
            // const lastNodeLabel = "outputnode";
            // const lastNode = nodes.find((node:any) => node.type === lastNodeLabel);
            // const lastEdge = {
            //   label: lastNode.data.label,
            //   source: lastNode._id,
            //   target: "",
            // };
            
            // output.push(lastEdge);
            
            // console.log("output=================", output);
            
            const labels = parseData.nodes.map((node: any) => node.data.label);
            const uniqueLabels = labels.filter(
              (label: any, index: any) => labels.indexOf(label) === index
            );
            setActions(newNode);
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
      
    } catch (error) {
      console.log("error", error);
    }
  };
  // useEffect(() => {
  //   setSource(defaultValue); 
  // }, [defaultValue]);
  useEffect(() => {
    fetchWorkflowData();
  }, [workFlowID]);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };
  const handleSave = (updatedValue: any) => {
    console.log("updated", updatedValue);
    setStatus(updatedValue.label);
    console.log("default", defaultValue)
    // setSource(defaultValue);
    setTarget(updatedValue.target);
    console.log("d", status);
  };

  return (
    <>
      <div
        className={`container1 ${theme ? "darkLayout" : ""}`}
        style={{ paddingTop: "1rem", borderBottom: "1px solid #dee2e6" }}
      >
        <div className="row">
          <div className="col">
            <div className="ticketViewRows">
              <div className="label">{t("Ticket type")}</div>
              <div className="value">
                <span className="colon">:</span>
                <div>
                  { ticket?.typetittle
                    ? ticket?.typetittle
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label">{t("Created Date")}</div>
              <div className="value">
                <span className="colon">:</span>
                <div>
                  { ticket?.ticketcreatedon
                    ? DateFormat(ticket?.ticketcreatedon, false)
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label">{t("Priority")}</div>
              <div className="value">
                <span className="colon">:</span>
                <div>
                  <span
                   
                  >
                    { ticket?.prioritytitle
                      ? ticket?.prioritytitle
                      : "---"}
                  </span>
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("SOP ID")}</div>
              <div className="value">
                <span className="colon">:</span>
                <div>
                  {" "}
                  { ticket?.sop_id
                    ? ticket?.sop_id
                    : "NA"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Last Activity")}</div>
              <div className="values">
                <span className="colon">:</span>
                <div>
                  { ticket?.createdAt
                    ? DateFormatForWF(ticket?.createdAt)
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Owner")}</div>
              <div className="values">
                <span className="colon">:</span>
                <div>
                  { ticket?.ticketowner
                    ? ticket?.ticketowner
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Resolved Hours")}</div>
              <div className="value">
                <span className="colon">:</span>
                <div>
                  {" "}
                  { ticket?.createdAt
                    ? DateFormatView(ticket?.createdAt)
                    : "---"}
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="ticketViewRows">
              <div className="label">{t("Total Hours")}</div>
              <div className="value">
                <span className="colon">:</span>
                <div>
                  {ticket?.createdAt
                    ? DateFormatView(ticket?.createdAt)
                    : "---"}
                </div>
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
                  {wingsVal
                    ? wingsVal.replace(/^\w/, (c: any) => c.toUpperCase())
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Status")}</div>
              <div className="value">
                <span className="colon">:</span>
               
                  <InlineEdit
                    initialValue={ticket?.status.name}
                    options={actions}
                    onChange={handleSave}
                    // onSave={(value) => handleSave(item.id, value)}
                  />
               
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Subject")}</div>
              <div className="value spacing-value">
                <span style={{ whiteSpace: "pre-wrap" }} className="colon">
                  :
                </span>
                <div style={{ wordWrap: "break-word" }}>
                  { ticket?.subject
                    ? ticket?.subject
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Group")}</div>
              <div className="value spacing-value">
                <span className="colon">:</span>
                <div>
                  {" "}
                  { ticket?.ownergroup
                    ? ticket?.ownergroup
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Department")} </div>
              <div className="value spacing-value">
                <span className="colon">:</span>
                <div>
                  {" "}
                  {ticket?.departmentname
                    ? ticket?.departmentname
                    : "---"}
                </div>
              </div>
            </div>
            <div className="ticketViewRows">
              <div className="label"> {t("Line of Business")}</div>
              <div className="value spacing-value">
                <span className="colon">:</span>
                <div>
                  {" "}
                  {ticket?.lob
                    ? ticket?.lob
                    : "---"}
                </div>
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
              <Button
                onClick={handleNext}
                sx={{ mr: 1 }}
                variant="contained"
                style={{ height: "24px" }}
                size="small"
              >
                Next
                <i className="fa fa-caret-right ms-1"></i>
              </Button>
            </Box>
          </React.Fragment>
        </div>
      <div></div>
    </>
  );
};
