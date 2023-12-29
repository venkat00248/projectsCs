import { useContext, useEffect, useState } from 'react';


import { Box, Typography, Table, TableHead, TableBody, TableCell, TableRow, IconButton, TextField } from '@mui/material';
import './CreateTable.scss'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormData } from './context/FormDataProvider';


const CreateTable = (props: any) => {
  let obj = {}
  let arr = []
  const [bulkOpt, setbulkOpt] = useState(true)
  const { h1, rows, setRows } = props
  // console.log("props", h1)
  const { url, setQuery, queryParams, bulkEdit, setBulkEdit, setQueryParams, setUrl } = useFormData();
  // const [rows, setRows] = useState([{ id: 0, isVisible: true, key: '', value: '' }]);
  const maxRows = 5;
  const toggleRow = (rowId: any) => {
    const updatedRows = [...rows];
    updatedRows[rowId].isVisible = !updatedRows[rowId].isVisible;
    if (!updatedRows[rowId].isVisible) {
      updatedRows[rowId].key = '';
      updatedRows[rowId].value = '';
    }
    setRows(updatedRows);
    // constructUrl();
  };

  const addRow = () => {
    if (rows.length < maxRows) {
      const newRowId = rows.length;
      setRows([...rows, { id: newRowId, isVisible: true, key: '', value: '' }]);
    }
  };

  const handleKeyChange = (rowId: any, value: any) => {
    const updatedRows = [...rows];
    updatedRows[rowId].key = value;
    setRows(updatedRows);
    // constructUrl()
  };

  // console.log("rows", rows)
  const handleValueChange = (rowId: any, value: any) => {
    const updatedRows = [...rows];
    updatedRows[rowId].value = value;
    setRows(updatedRows);
    // constructUrl()
  };

  const constructUrl = () => {
    let bulkParamString = ""
    if (bulkEdit) {
      // if (bulkEdit.length === 0) {
      //   bulkParamString = "?";
      // } else {
      //   if (bulkEdit === "\n") {
      //     bulkParamString += "&"
      //     // setBulkEdit("&")
      //   }
      //   if (bulkEdit.includes(":")) {
      //     bulkParamString += "=";
      //   }
      //   bulkParamString += bulkEdit;
      // }
    }
    // else {
      //   console.log("no val")
      // }
      // console.log(bulkParamString += bulkEdit, "bulkString")
      setUrl(bulkEdit)
      let queryString = '';
      rows.forEach((row: any, index: any) => {
        if (row.key && row.value) {
          queryString += `${index === 0 ? '?' : '&'}${(row.key)}=${(row.value)}`;
        }
      });
      // const urls = '' + queryString; 
      setQuery(queryString);
      // console.log(url);
    };


    const handleBulkEditChange = (e: any) => {
      let res = []
      let value = e.target.value
      if (e.code === "Enter" || value === " ") {
        console.log(value, "after enter")
        value.replace(" ", "&")
        console.log(bulkEdit, "enter code")
      } else if (value === ":") {
        value.replace(":", "=")
      }
      setBulkEdit(value)


      // let allparams = [...bulkEdit]
      // if (e.code === "Enter" || allparams.length === 1) {
      //   let newParamId = bulkEdit.length
      //   console.log(allparams[newParamId], "newasssss")
      //   if (allparams[newParamId]) {
      //     console.log("hihihihihihihihihi")
      //     if (value.includes(":")) {
      //       res = value.split(":")
      //       setBulkEdit([...bulkEdit, { id: newParamId, isVisible: true, key: res[0], value: res[1] }])
      //     } else {
      //       setBulkEdit([...bulkEdit, { id: newParamId, isVisible: true, key: value }])
      //     }
      //     console.log(bulkEdit, "bulkeditsssssszzzzzzzzzzzzzzzzzzzzzzzzzzz")
      //   }
      //   else {
      //     console.log("consoling here")
      //     setBulkEdit([...bulkEdit, { id: newParamId, isVisible: true, key: value ,value:""}])
      //     console.log(bulkEdit, "bulkeditssssss")
      //   }
      // }

      ///second one



      // if (e.code === "Enter" || bulkEdit.length === 1) {
      //   let newParamId = bulkEdit.length
      //   let abc = JSON.stringify(value)
      // }
    };

    useEffect(() => {
      constructUrl()
    }, [queryParams, bulkEdit]);




    return (
      <Box>
        {h1 && <Typography mt={2} mb={2} className='pname'>{h1}</Typography>}
        <Table sx={{ minWidth: '10%', border: '1px solid rgba(224, 224, 224, 1)' }} aria-label="simple table" className='tabsTable'>
          <TableHead>
            <TableRow>
              <TableCell className='tablecell col-5'>KEY</TableCell>
              <TableCell className='tablecell col-5'>VALUE</TableCell>
              {/* <TableCell className='tablecell col-2'>
                <button onClick={() => setbulkOpt(!bulkOpt)} className='btn'>
                  Bulk Edit
                </button>
              </TableCell> */}
              <TableCell className='additionTableCell'>
                <IconButton onClick={addRow} disabled={rows.length >= maxRows}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {!bulkOpt && rows.map((row: any, index: any) => (
              <TableRow key={row.id} style={{ display: row.isVisible ? 'table-row' : 'none' }}>
                <TableCell className='tablecell'>
                  <TextField id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={row.key}
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell className='tablecell'>
                  <TextField id="outlined-basic" variant="outlined" size="small" fullWidth value={row.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell className='additionTableCell'>
                  <IconButton onClick={() => toggleRow(index)}>
                    {row.isVisible ? <RemoveIcon /> : <AddIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {/* {
              bulkOpt && (
                <TableRow className=''>
                  <div className='form-group editBulkCell'>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Rows are separated by new lines
Keys and Values are separated by : 
Pretend // to add any row you want but keep disabled"
                      onKeyDown={handleBulkEditChange}
                      // rows={queryParams} 
                      // setRows={setQueryParams}
                      rows={5}
                      cols={0}>
                    </textarea>
                  </div>
                </TableRow>
              )
            } */}
          </TableBody>
        </Table>
      </Box>
    )
  }

  export default CreateTable;