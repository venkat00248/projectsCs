import React, { useState } from "react";
import DataTable from "../dataTable/DataTable";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import EdittrainingschedulePopup from "./EdittrainingschedulePopup";
import AddtraningresultsPopup from "./AddtraningresultsPopup";
//import { Button } from "react-bootstrap";


const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const longText = `
Security Awareness on 
Information security Policies
Acceptable Use Policy
Access Control Policy
Password Policy
Physical Security Policy
Clear Desk Clear Screen Policy
Electronic Mail Policy
Disciplinary Policy
Data Classification...etc
`;

const TrainingscheduleTable: React.FC = () => {
  const headers = ["Name", "TraningDate", "ExamDate", "Venue", "Agenda", "Status", "Action"];
  const [data, setData] = useState([
    {
        Name: "ISMS Training",
        TraningDate: "04-03-2019",
        ExamDate: "04-03-2019",
        Venue: "Hyderabad",
        Agenda: (
          <>
           <Tooltip title={longText} placement="top" arrow>
           <Button className="btn item"><i className="mdi mdi-information-outline text-success font-size-18"></i></Button>
          </Tooltip>
          </>
        ),
        Status: (
          <>
          <span className="badge bg-primary">Active</span>
          </>
        ),
     
      Action: (
        <>
          <Tooltip title="Edit" placement="top" arrow> 
             <EdittrainingschedulePopup/>
          </Tooltip>

          <Tooltip title="Add Traning Results" placement="top" arrow> 
             <AddtraningresultsPopup/>
          </Tooltip>

          
        </>
      ),
    },
    {
      Name: "test training",
      TraningDate: "01-01-2019",
      ExamDate: "28-04-2019",
      Venue: "in house",
      Agenda: (
        <>
         <Tooltip title={longText} placement="top" arrow>
         <Button className="btn item"><i className="mdi mdi-information-outline text-success font-size-18"></i></Button>
        </Tooltip>
        </>
      ),
      Status: (
        <>
        <span className="badge bg-danger">In Active</span>
        </>
      ),
   
      Action: (
        <>
          <Tooltip title="Edit" placement="top" arrow> 
             <EdittrainingschedulePopup/>
          </Tooltip>

          <Tooltip title="Add Traning Results" placement="top" arrow> 
             <AddtraningresultsPopup/>
          </Tooltip>

          
        </>
      ),
  },
    // Add more data rows...
  ]);

  const handleSelectRow = (selectedRows: Record<string, any>[]) => {
    // Handle selected rows here
    console.log("Selected Rows:", selectedRows);
  };

  return (
    <div style={{ background: "#f5f5f9" }}>
      <DataTable
        headers={headers}
        data={data}
        setData={setData}
        onSelectRow={handleSelectRow}
        rowsPerPage={10}
        itemsPerPageOptions={[10, 20, 30, 40]}
      />
    </div>
  );
};

export default TrainingscheduleTable;
