import React, { useState } from "react";
import DataTable from "../dataTable/DataTable";
import Tooltip from '@mui/material/Tooltip';

const TrainingscheduleTable: React.FC = () => {
  const headers = ["Name", "EmpCode", "TraningStatus", "ExamStatus", "Marks"];
  const [data, setData] = useState([
    {
        Name: "V. Sateesh",
        EmpCode: 40025,
        TraningStatus: (
 
          <span className="badge bg-danger">Incompleted</span>
      
      ),
      ExamStatus: (
        <>
          <span className="badge bg-danger">Incompleted</span>
        </>
      ),
      Marks:  "", 
    },
    {
      Name: "Srikanth Y",
      EmpCode: 40064,
      TraningStatus: (

        <span className="badge bg-primary">Completed</span>
    
    ),
    ExamStatus: (
      <>
        <span className="badge bg-primary">Completed</span>
      </>
    ),
    Marks: 14, 
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
