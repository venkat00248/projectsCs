import react from 'react'
import './Reports.scss'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DataTableWrapper from '../dataTable/DataTableWrapper';
import ReportsTable from './ReportsTable';
export const Reports = () => {

 
      const reports = [
        {
          value: 'Document Name',
          label: 'Document Name',
        },
        {
          value: 'Video Name',
          label: 'Video Name',
        },
      ];


      const types = [
        {
          value: 'Documents Report',
          label: 'Documents Report',
        },
        {
          value: 'Videos Report',
          label: 'Videos Report',
        },
      ];

      

    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <h5 className='mb-2 text-primary'>Reports</h5>
                    </div>
                </div>
                <div className='card-body'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >

                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='d-flex'>
                            <h6 className='me-3 mb-0 pt-2 w-20'>Category : </h6>
                            <TextField
                                id="select-category"
                                select
                                label="Select Category"
                                size='small'
                                // helperText="Please select your categories"
                            >
                                {reports.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>            
 
                            </div>

                        </div>
                        <div className='col-md-3'></div>
                        <div className='col-md-4'>
                            <div className='d-flex'>
                                <h6 className='me-3 mb-0 pt-2 w-13'>Type : </h6>
 
                                <TextField
                                id="select-documents-type"
                                select
                                label="Select Documents Type"
                                size='small'
                                // helperText="Please select your categories"
                            >
                                {types.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField> 
 
                            </div>

                        </div>
                        <div className='col-md-12'>
                            <div className='float-end mt-4'>
                                <Button variant="contained">Select</Button>
                            </div>
                        </div>
                    </div>

                  </Box>
                </div>
            </div>

            <div className='card customtbl mt-3'>
                <div className='card-body'>
                    <div className="table-responsive">
                     <ReportsTable/>
                    </div>

                </div>

            </div>

        </div>

    )

}