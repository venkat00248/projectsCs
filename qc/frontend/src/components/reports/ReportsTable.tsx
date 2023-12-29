import React, { useState } from "react";
import DataTable from "../dataTable/DataTable";
import Tooltip from '@mui/material/Tooltip';
import Editdocumentspopup from "../documents/Editdocumentspopup";
import Deletedocumentspopup from "../documents/Deletedocumentspopup";

const ReportsTable: React.FC = () => {
  const headers = ["Name", "Category", "Type", "Action"];
  const [data, setData] = useState([
    {
        Name: "1000108976_certificate_high-res",
        Category: "Reports",
        Type: (
            <Tooltip title="Document" placement="top" arrow> 
            <button className="btn item"><i className="far fa-file-alt text-primary"></i></button>
          </Tooltip>
      ),
      Action: (
        <>
          <button className="btn btn-sm btn-primary"><i className="fas fa-check me-2"></i> Export</button>
        </>
      ),
    },
    {
        Name: "200 KVA 1,2,3,4 24042022 PPM Report",
        Category: "Reports",
        Type: (
            <Tooltip title="Video" placement="top" arrow> 
            <button className="btn item" data-bs-toggle="tooltip" data-bs-original-title="View Document"><i className="fas fa-video text-success"></i></button>
          </Tooltip>
      ),
      Action: (
        <>
          <button className="btn btn-sm btn-primary"><i className="fas fa-check me-2"></i> Export</button>
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

export default ReportsTable;
