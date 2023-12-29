import * as React from "react";
import './WorkFlowList.scss'
import { Link } from 'react-router-dom';
import { Drawer } from '@mui/material';
import Box from "@mui/material/Box";
import WorkFlow from "./WorkFlow";
import { WorkFlowService } from "../../../services/WorkFlowService";
import { DateFormatForWF } from "../../Utils/DateFormat";
import CloseIcon from "@mui/icons-material/Close";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WorkFlowView from "./WorkFlowView";
import { Mapping } from "./Mapping";
import { TicketTypeService } from "../../uidashboard/Imports";
type Anchor = "bottom";
export  const MappingList = () =>{
  const [listOfMappings, setListOfMappings]= React.useState([])
  const [selectedWorkFlow, setSelectedWorkFlow] = React.useState(null);
    const [state, setState] = React.useState({
        bottom: false
      });
    
      const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
      ) => {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
        if (open) {
          const selectedIndex:any = event.currentTarget.getAttribute("data-index");
          setSelectedWorkFlow(listOfMappings[selectedIndex]);
        }
      };
   
    const listAllTicketTypes = async () => {
        const res = await TicketTypeService.getMappedWorkflow()
        setListOfMappings(res?.data.data)
        console.log("all ticket types", res);
      };
      React.useEffect(() => {
        listAllTicketTypes();
      }, []);
      const drawerContent = (
        <Box
          sx={{
            width: "100%",
            height: "87vh",
            display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center"
          }}
          role="presentation"
          // onClick={toggleDrawer("bottom", false)}
          // onKeyDown={toggleDrawer("bottom", false)}
        > <button
        style={{
          position: "absolute",
          padding:"8px",
          top: 0,
          right: 2,
          zIndex: 1,
        }}
        onClick={toggleDrawer("bottom", false)}
      >
        <CloseIcon />
      </button>
       <Mapping/>
         {/* <WorkFlowView /> */}
        </Box>
      );
      const [open, setOpen] = React.useState(false);
      const [mappedId, setmappedId] = React.useState("")
      const handleClickOpen = (item:any, index:any) => {
        setOpen(true);
        setmappedId(item._id)
        console.log("item", item , index)
      };
    const deleteRecord = async  ()=>{
     const res = await TicketTypeService.deleteTicketTypeMapping({id:mappedId})
     console.log("res", res)
     setOpen(false)
    }
      const handleClose = () => {
        setOpen(false);
      }; 
return (
    <div>
    <div className='wfstablemain'>
       <div className='wfstitle'>
          <h3>Manage Ticket Types</h3>
        </div> 
        <div className="wfsheader mb-0">
                        <div>
                       <h5 className="subtitle"><i className="fa fa-angles-right me-1"></i> List of all Ticket Types</h5>
                        </div>
                        <div className="d-flex">
                            <div className="justify-content-center">
                             <button type="button" className="btn btn-primary shadow-sm my-2 btn-sm btn-icon-text"  onClick={toggleDrawer("bottom", true)}> <i className="far fa-plus-square me-2"></i> New </button>
                             <Drawer
                                                        anchor="bottom"
                                                        open={state["bottom"]}
                                                        onClose={toggleDrawer("bottom", false)}
                                                        >
                                                        {drawerContent}
                                                        </Drawer>
                            </div>
                        </div>
          </div> 
          {listOfMappings.length>0 ? (
          <div className="row wfs-table">
                        <div className="col-12">
                                    <div className="table-responsive px-1">
                                        <table id="example2" className="table table-striped" style={{width:'100%'}}>
                                            <thead>
                                                <tr>
                                                    <th style={{width:'15%'}}>Ticket Type</th>
                                                    <th style={{width:'12%'}}>Mapped Ticket Type</th>
                                                    <th style={{width:'13%'}}>Created By</th>
                                                    <th style={{width:'8%'}}>Status</th>
                                                    <th style={{width:'10%'}}>Created Date</th>
                                                    <th style={{width:'10%'}}>Updated Date</th>
                                                    <th style={{width:'10%'}}>IS Published</th>
                                                    <th style={{width:'12%'}}>Updated By</th>
                                                    <th style={{width:'10%'}}>Action</th>

                                                </tr>      
                                            </thead> 
                                            <tbody>
                                              {listOfMappings.length>=0 && 
                                               listOfMappings.map ((item:any, index) =>  (
                                                <tr key={index}>
                                                    <td>{item.type}</td>
                                                    <td>Ticket Type</td>
                                                    <td>{item.createdBy}</td>
                                                    <td><span className="border py-0 px-2 border-primary text-primary">{item.isActive ?"Active":"Not Active"}</span></td>
                                                    <td>{DateFormatForWF(item.createdAt)}</td>
                                                    <td> {DateFormatForWF(item.updatedAt)}</td>
                                                    <td>{item.is_published ?<i className="fa-regular fa-circle-check text-success"></i>: <i className="fa-regular fa-circle-xmark text-danger"></i>}</td>
                                                    <td>XYZ</td>
                                                    
                                                     <td>
                                                        <button type="button"   data-index={index} className="btn btn-primary shadow btn-xs sharp me-1" onClick={toggleDrawer("bottom", true)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                        <button
                                                        type="button"
                                                        data-index={index}
                                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                                        onClick={()=>handleClickOpen(item,index)}
                                                        // onClick={() => openConfirmationPopup(item, index)}
                                                      >
                                                        <i className="fa-solid fa-trash"></i>
                                                      </button>
                                                        <Drawer
                                                        anchor="bottom"
                                                        open={state["bottom"]}
                                                        onClose={toggleDrawer("bottom", false)}
                                                        >
                                                        {drawerContent}
                                                        </Drawer>
                                                    </td> 
                                                </tr>
                                                
                                               ))}
                                              
                                                {/* <tr>
                                                    <td>Sample WF</td>
                                                    <td>Ticket Type</td>
                                                    <td>ABC </td>
                                                    <td><span className="border py-0 px-2 border-primary text-primary">Active</span></td>
                                                    <td>26/06/23</td>
                                                    <td> </td>
                                                    <td><i className="fa-regular fa-circle-check text-success"></i></td>
                                                    <td>XYZ</td>
                                                    
                                                     <td>
                                                        <button type="button" className="btn btn-primary shadow btn-xs sharp" onClick={toggleDrawer("bottom", true)}><i className="fa-regular fa-eye"></i></button>
                                                        <Drawer
                                                        anchor="bottom"
                                                        open={state["bottom"]}
                                                        onClose={toggleDrawer("bottom", false)}
                                                        >
                                                        {drawerContent}
                                                        </Drawer>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td>Sample WF2</td>
                                                    <td>Service request</td>
                                                    <td>XYZ</td>
                                                    <td><span className="border py-0 px-2 border-primary text-primary">Active</span></td>
                                                    <td>25/06/23</td>
                                                    <td>26/06/23</td>
                                                    <td><i className="fa-regular fa-circle-xmark text-danger"></i></td>
                                                    <td>ABC</td>
                                                     
                                                     <td>
                                                        <button type="button" className="btn btn-primary shadow btn-xs sharp me-1"><i className="fa-regular fa-eye"></i></button>
                                                        <button type="button" className="btn btn-warning shadow btn-xs sharp me-1"><i className="fa-regular fa-pen-to-square"></i></button>
                                                        <button type="button" className="btn btn-danger shadow btn-xs sharp me-1"><i className="fa fa-trash"></i></button>
                                                        <button type="button" className="btn btn-success shadow btn-xs sharp me-1"><i className="fa-regular fa-circle-check"></i></button>
                                                    </td> 
                                                </tr> */}
                                 
                                                 </tbody>
                                        </table>
                             
                                    </div>
                                             
                            
                        </div>

                     
                    </div>
):<div>No Mappings</div>}

    </div>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"In Active Ticket Type Mapping with Work Flow"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteRecord}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
)
}

