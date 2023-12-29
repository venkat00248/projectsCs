import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Alert, AlertTitle, FormHelperText, TextField } from "@mui/material";
import { WorkFlowService } from "../../../services/WorkFlowService";
import { TicketTypeService } from "../../uidashboard/Imports";
import "./index.scss";
export const Mapping = () => {
  const [selectedWorkFlow, setSelectedWorkFlow] = React.useState("");
  const [typeOfTicket, setTypeOfTicket] = React.useState("");
  const [newtypeOfTicket, setnewTypeOfTicket] = React.useState("");
  const [ticketTypeId, setTicketTypeId] = React.useState("");
  // const [mongoticketTypeId, setMongoTicketTypeId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [newFiled, setNewFiled] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [length, setLength] = React.useState("");
  const [allTicketTypes, setAllTickettypes] = React.useState([]);
  const getAllWorkFlows = async () => {
    const res = await WorkFlowService.getAllWorkFlows();
    setList(res?.data.data.result);
    // console.log("all workflows", res.data.data.result);
  };

  const listAllTicketTypes = async () => {
    const res = await TicketTypeService.listAllTicketTypes();
    setAllTickettypes(res?.data.data);
    setLength(res?.data.data.length+1)
    // console.log("all ticket types", res.data.data);
  };
  React.useEffect(() => {
    getAllWorkFlows();
    listAllTicketTypes();
  }, []);
  const onWorkFlowChange = (event: any) => {
    setSelectedWorkFlow(event.target.value);
  };
  const onTickettypeChange = (event: any) => {
    // console.log("event", event.target.value)
    setTypeOfTicket(event.target.value);
  };
  const [errors, setErrors] = React.useState({
    typeOfTicket: "",
    selectedWorkFlow: "",
    description:"",
    newtypeOfTicket:""
  });
  const validateForm = () => {
    let isValid = true;
    const errorsCopy = { ...errors };
   
    if (  newFiled && newtypeOfTicket === "") {
      errorsCopy.newtypeOfTicket = "  New Ticket Type is required";
      isValid = false;
    } else {
      errorsCopy.newtypeOfTicket = "";
    }

    if (selectedWorkFlow === "") {
      errorsCopy.selectedWorkFlow = "Work Flow is required";
      isValid = false;
    } else {
      errorsCopy.selectedWorkFlow = "";
    }
    if (description === "") {
      errorsCopy.description = "Description is required";
      isValid = false;
    } else {
      errorsCopy.description = "";
    }

    setErrors(errorsCopy);
    return isValid;
  };
  const data = JSON.parse(sessionStorage.userDetails);
  const fullname = data.fullname;
  const submitHandler = async () => {
    // console.log("req", typeOfTicket, selectedWorkFlow);
    if (!validateForm()) {
      return;
    }
    try {
    let mongoId = ""
      if(typeOfTicket==="new"){
      const response = await TicketTypeService.createTicketType({type:newtypeOfTicket ,id:ticketTypeId, createdBy:fullname})
       mongoId =response.data.data._id
      
      }
      else{
        mongoId=typeOfTicket
        console.log("type",typeOfTicket)
      }
      const res = await TicketTypeService.mapTicketType({
        ticketTypeId: mongoId,
        workFlowId: selectedWorkFlow,
        createdBy:fullname
      });
      setStatus(true);
      setTicketTypeId("")
      setDescription("")
      setSelectedWorkFlow("")
      setTypeOfTicket("")
    } catch (error) {
      console.log("error While Mapping WorkFlow with ticket Type", error);
    }
  };
  const onBlurValidation = (fieldName:any) => (event:any) => {
    const value = event.target.value.trim();
    const errorsCopy :any= { ...errors };

    if (value === "") {
      errorsCopy[fieldName] = `${fieldName} is required`;
    } else {
      errorsCopy[fieldName] = "";
    }

    setErrors(errorsCopy);
  };
  return (
    <div className="mapping">
      <>
        {status && (
          <div className="alertWrapper">
            <Alert
              severity="success"
              onClose={() => {
                setStatus(false);
              }}
            >
              {/* <AlertTitle>Success</AlertTitle> */}
              <AlertTitle>
                WorkFlow is Mapping with Ticket type is Sucessfully
              </AlertTitle>
            </Alert>
          </div>
        )}
        {/* <FormControl sx={{ m: 1, width: "100%" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Ticket Type"
            variant="outlined"
            value={typeOfTicket}
            onChange={(evt) => setTypeOfTicket(evt.target.value)}
            size="small"
          />
        </FormControl> */}
        {/* <FormControl sx={{ m: 1, width: "100%" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Ticket Type ID"
            variant="outlined"
            value={ticketTypeId}
              InputProps={{
    readOnly: true,
  }}

            onChange={(evt) => setTicketTypeId(evt.target.value)}
            size="small"
          />
        </FormControl> */}
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-label selectActions">
            Ticket Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeOfTicket}
            label="Ticket Type"
            onChange={onTickettypeChange}
            size="small"
            error={!!errors.typeOfTicket}
            onBlur={onBlurValidation("typeOfTicket")}
          >
            {allTicketTypes.map((item: any) => (
              <MenuItem key={item._id} value={item._id}>
                {item.type}
              </MenuItem>
            ))}
            <MenuItem value="new">
              {newFiled ? "New Ticket Types is added below":(<button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setNewFiled(true);
                  setTicketTypeId(length)
                }}
              >
                
                add new
              </button>)}
            </MenuItem>
          </Select>
          {errors.typeOfTicket && (
            <FormHelperText error>{errors.typeOfTicket}</FormHelperText>
          )}
        </FormControl>
        {newFiled && (
          <FormControl sx={{ m: 1, width: "100%" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Add new Ticket Type"
              variant="outlined"
              value={newtypeOfTicket}
              onChange={(evt) => setnewTypeOfTicket(evt.target.value)}
              size="small"
              error={!!errors.newtypeOfTicket}
              onBlur={onBlurValidation("newtypeOfTicket")}
              helperText={errors.newtypeOfTicket}
            />
          </FormControl>
        )}
        <FormControl sx={{ m: 1, width: "100%" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Ticket Type ID"
            variant="outlined"
            value={ticketTypeId}
            InputProps={{
              readOnly: true,
            }}
            onChange={(evt) => setTicketTypeId(evt.target.value)}
            size="small"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-label selectActions">
            Work Flow
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedWorkFlow}
            label="Work Flow"
            onChange={onWorkFlowChange}
            size="small"
            error={!!errors.selectedWorkFlow}
            onBlur={onBlurValidation("selectedWorkFlow")}
          >
            {list.map((item: any) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {errors.selectedWorkFlow && (
            <FormHelperText error>{errors.selectedWorkFlow}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
            size="small"
            error={!!errors.description}
            helperText={errors.description}
            onBlur={onBlurValidation("description")}
          />
        </FormControl>
        <div style={{ width: "15%", paddingLeft: "10px" }}>
          <button className="btn btn-primary btn-sm" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </>
    </div>
  );
};
