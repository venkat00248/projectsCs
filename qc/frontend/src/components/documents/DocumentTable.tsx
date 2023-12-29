import React, { useState } from "react";
import DataTable from "../dataTable/DataTable";
import Editdocumentspopup from "./Editdocumentspopup";
import Deletedocumentspopup from "./Deletedocumentspopup";
import Tooltip from '@mui/material/Tooltip';

const DocumentTable: React.FC = () => {
  const headers = ["Document_Name", "Created_Date", "View", "Action"];
  const [data, setData] = useState([
    {
      Document_Name: "John",
      Created_Date: 25,
      View: (
        <Tooltip title="View PDF" placement="top" arrow>  
        <button className="btn item" data-bs-toggle="tooltip" title="View PDF">
          <i className="mdi mdi-file-pdf-outline text-success"></i>
        </button>
        </Tooltip>
      ),
      Action: (
        <>
          <Editdocumentspopup />
          <Deletedocumentspopup/> 
        </>
      ),
    },
    {
      Document_Name: "Janevf",
      Created_Date: 30,
      View: (
        <Tooltip title="View PDF" placement="top" arrow>  
        <button className="btn item" data-bs-toggle="tooltip" title="View PDF">
          <i className="mdi mdi-file-pdf-outline text-success"></i>
        </button>
        </Tooltip>
      ),
      Action: (
        <>
          <Editdocumentspopup />
          <Deletedocumentspopup/> 
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
