// DataTable.tsx
import React, { FC, useState } from "react";
import ColumnConfigPopup from "./ColumnConfigPopupProps"; // Adjust the path accordingly
import Checkbox from "@mui/material/Checkbox";
import Pagination from "./Pagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./DataTable.scss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
interface DataTableProps {
  headers: string[];
  data: Record<string, any>[];
  onSelectRow: (selectedRows: Record<string, any>[]) => void;
  rowsPerPage: number;
  itemsPerPageOptions: number[];
  setData: (data: any) => void;
}

const DataTable: FC<DataTableProps> = ({
  headers,
  data,
  onSelectRow,
  setData,
  rowsPerPage,
  itemsPerPageOptions,
}) => {
  const [allColumnsChecked, setAllColumnsChecked] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(headers);
  const handleCheckAll = (checked: boolean) => {
    setAllColumnsChecked(checked);
    setVisibleColumns(checked ? headers : []);
  };
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);
  // Inside your DataTable component
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState<Record<string, any>[]>([]);

  // const itemsPerPage = rowsPerPage; // Number of rows per page
  const [itemsPerPage, setItemsPerPage] = useState(rowsPerPage);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleColumnToggle = (columnName: string) => {
    if (visibleColumns.includes(columnName)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== columnName));
    } else {
      setVisibleColumns([...visibleColumns, columnName]);
    }
  };

  const handleItemsPerPageChange = (value: any) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset the current page when changing items per page
  };
  const [sortConfig, setSortConfig]: any = React.useState({
    key: null,
    direction: null,
  });

  const requestSort = (key: any) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const sortedData = () => {
    if (!sortConfig.key) {
      return currentData;
    }

    const sortedItems = [...currentData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedItems;
  };
  const selectAllRows = () => {
    if (selectedRows.length === currentData.length) {
      setSelectedRows([]);
      setRowsToDelete([]);
      setShowDeleteButton(false); // Clear the rows to delete as well
    } else {
      setSelectedRows([...currentData]);
      setRowsToDelete([...currentData]); // Select all rows for deletion

      setShowDeleteButton(true);
    }
  };

  const toggleRowSelection = (row: Record<string, any>) => {
    const isSelected = selectedRows.includes(row);
    let updatedSelectedRows;
    let updatedRowsToDelete;

    if (isSelected) {
      updatedSelectedRows = selectedRows.filter(
        (selectedRow) => selectedRow !== row
      );
      updatedRowsToDelete = rowsToDelete.filter(
        (deleteRow) => deleteRow !== row
      );
    } else {
      updatedSelectedRows = [...selectedRows, row];
      updatedRowsToDelete = [...rowsToDelete, row];
    }

    setSelectedRows(updatedSelectedRows);
    setRowsToDelete(updatedRowsToDelete);

    setShowDeleteButton(updatedSelectedRows.length > 0);
  };

  const handleDelete = () => {
    const updatedData = data.filter((row) => !rowsToDelete.includes(row));
    console.log("updated data", updatedData);
    setData(updatedData); // Update your data state (assuming it's controlled by the parent)
    setSelectedRows([]);
    setRowsToDelete([]);
    setShowDeleteButton(false);
  };

  return (
    <div className="dataTable">
      {showDeleteButton && (
        <Button
          variant="contained"
          size="small"
          style={{ float: "left"}}
          onClick={handleDelete}
        >
          <DeleteOutlineIcon />
        </Button>
      )}
      <div className="d-flex justify-content-end">
      <div className="dataTableActions my-2">
        <input
          type="text"
          className=""
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ColumnConfigPopup
          onCheckAll={handleCheckAll}
          headers={headers}
          visibleColumns={visibleColumns}
          onColumnToggle={handleColumnToggle}
        />
      </div>
      </div>
      <div className="tableWrapper rounded bg-white p-3">
        <table className="table-striped">
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selectedRows.length === currentData.length}
                  onChange={selectAllRows}
                />
              </th>
              {visibleColumns.map((header, index) => (
                <th key={index} onClick={() => requestSort(header)}>
                  {header}
                  {/* {sortConfig.key === header && ( */}
                  <span className="sortIcon">
                    {sortConfig.direction === "asc" ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </span>
                  {/* )} */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData()?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <Checkbox
                    // type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRowSelection(row)}
                  />
                </td>
                {visibleColumns.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
      <div className="dataTablePagination">
        <Pagination
          itemsPerPageOptions={itemsPerPageOptions}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          currentPage={currentPage}
          paginate={paginate}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
    </div>
  );
};

export default DataTable;
