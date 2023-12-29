import React, { useState } from "react";
import DataTable from "./DataTable"; // Adjust the path according to your project structure

const DataTableWrapper: React.FC = () => {
  const headers = ["Name", "Age", "Location"];
  const [data, setData] = useState([
    { Name: "John", Age: 25, Location: "New York" },
    { Name: "Janevf", Age: 30, Location: "San Francisco" },
    { Name: "John123", Age: 25, Location: "New York" },
    { Name: "Janeewyuw", Age: 30, Location: "San Francisco" },
    { Name: "one John ", Age: 25, Location: "New York" },
    { Name: " twoJane", Age: 30, Location: "San Francisco" },
    { Name: "John", Age: 25, Location: "New York" },
    { Name: "Janevf", Age: 30, Location: "San Francisco" },
    { Name: "John123", Age: 25, Location: "New York" },
    { Name: "Janeewyuw", Age: 30, Location: "San Francisco" },
    { Name: "one John ", Age: 25, Location: "New York" },
    { Name: " twoJane", Age: 30, Location: "San Francisco" },
    { Name: "John", Age: 25, Location: "New York" },
    { Name: "Janevf", Age: 30, Location: "San Francisco" },
    { Name: "John123", Age: 25, Location: "New York" },
    { Name: "Janeewyuw", Age: 30, Location: "San Francisco" },
    { Name: "one John ", Age: 25, Location: "New York" },
    { Name: " twoJane", Age: 30, Location: "San Francisco" },
    // Add more data rows...
  ])

  const handleSelectRow = (selectedRows: Record<string, any>[]) => {
    // Handle selected rows here
    console.log("Selected Rows:", selectedRows);
  };

  return (
    <div style={{ background:"#f5f5f9"}}>
      <DataTable
        headers={headers}
        data={data}
        setData ={setData}
        onSelectRow={handleSelectRow}
        rowsPerPage={10}
        itemsPerPageOptions={[10, 20 , 30 , 40]}
      />
    </div>
  );
};

export default DataTableWrapper;
