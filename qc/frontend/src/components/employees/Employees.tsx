import react from 'react'
import './Employees.scss'
import Employeespopup from './Editemployeespopup';
import EmployeesTable from './EmployeesTable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
export const Employees = () => {
    const employeeslist = [
        {
          value: 'New Employees',
          label: 'New Employees',
        },
        {
          value: 'Employees',
          label: 'Employees',
        },
      ];

    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <h5 className='mb-2 text-primary'>Employees List</h5>
                         
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
                                            id="outlined-select-document"
                                            select
                                            label="Select Document"
                                            size='small'
                                            // helperText="Please select your Employees List"
                                        >
                                            {employeeslist.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                            ))}
                                        </TextField>
                               
                            </div>

                        </div>
                        <div className='col-md-7'></div>
                       
                    </div>

                    </Box>
                </div>
            </div>

            <div className='row mt-3'>
               <div className="customtbl table-responsive">
                  <EmployeesTable/>               
             </div>
            </div>
         
        </div>

    )

}