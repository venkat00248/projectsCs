import React, { useState } from "react";
import DataTable from "../dataTable/DataTable";
import Tooltip from '@mui/material/Tooltip';
import Editemployeespopup from "./Editemployeespopup";
import Viewemployees from "./Viewemployees";

const DocumentTable: React.FC = () => {
  const headers = ["Emp_ID", "Emp_Name", "Role", "Created_Date", "Status", "Action"];
  const [data, setData] = useState([
    {
      Emp_ID: 13006,
      Emp_Name: "Deekshitha Palki",
      Role: "Superuser" ,
      Created_Date: "2023-03-28" ,
      Status: "Active" ,
      Action: (
        <>
          <Editemployeespopup /> 
          <Viewemployees/>
        </>
      ),
    },
    {
      Emp_ID: 13006,
      Emp_Name: "Deekshitha Palki",
      Role: "Superuser" ,
      Created_Date: "2023-03-28" ,
      Status: "Active" ,
      Action: (
        <>
          <Editemployeespopup /> 
          <Viewemployees/>
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

export default DocumentTable;
