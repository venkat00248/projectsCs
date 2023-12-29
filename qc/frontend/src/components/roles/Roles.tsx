import react from 'react'
import './Roles.scss'
import Button from '@mui/material/Button';
import DataTableWrapper from '../dataTable/DataTableWrapper';
import Rolespopup from './Rolespopup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
export const Roles = ()=>{

    const categories = [
        {
          value: 'Roles Master',
          label: 'Roles Master',
        },
        {
          value: 'Department Master',
          label: 'Department Master',
        },
      ];

    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <h5 className='mb-2 text-primary'>Roles / Department Master</h5>
                        <Rolespopup/>
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
                                            id="select-Roles"
                                            select
                                            label="Select Roles"
                                            size='small'
                                            // helperText="Please select your categories"
                                        >
                                            {categories.map((option) => (
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

        <div className='card customtbl mt-3'>
        <div className='card-header p-3'>
                <div className='d-flex justify-content-between border-bottom'>
                  <h5 className='mb-2 text-primary'>Roles</h5>
               
                </div>
 
                 </div>
        <div className='card-body'>
                    <div className="table-responsive">
                    <div className='d-flex justify-content-end'>
                     <form className="app-search d-lg-block"><div className="position-relative"><input type="text" className="form-control" placeholder="Search..."/><a href="#" className="fa fa-search" aria-hidden="true"></a></div></form>
                     <button className="btn "><i className="far fa-trash-alt text-danger"></i> </button>
                     {/* <button className="btn "><i className="fas fa-user-plus text-primary"></i> </button> */}
                    </div>

                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>XYZ</td>
                                    <td>XYZ</td>
                                    <td>
                                     <Tooltip title="Active" placement="top" arrow>   
                                        <button className="btn item" data-bs-toggle="tooltip" data-bs-original-title="View Document"><i className="far fa-check-circle text-primary"></i></button>
                                      </Tooltip>
                                    </td>
                                    <td>
                                      <Tooltip title="No Access" placement="top" arrow>   
                                        <button className="btn item" data-bs-toggle="tooltip" data-bs-original-title="View Document"><i className="far fa-times-circle text-danger"></i></button>
                                       </Tooltip>
                                    </td>

                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>XYZ</td>
                                    <td>XYZ</td>
                                    <td>
                                    <Tooltip title="In Active" placement="top" arrow>   
                                        <button className="btn item" data-bs-toggle="tooltip" data-bs-original-title="View Document"><i className="far fa-times-circle text-danger"></i></button>
                                     </Tooltip>
                                    </td>
                                    <td>
                                    <Tooltip title="Yes Access" placement="top" arrow>   
                                        <button className="btn item" data-bs-toggle="tooltip" data-bs-original-title="View Document"><i className="far fa-check-circle text-primary"></i></button>
                                     </Tooltip>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

        </div>

        </div>

        </div>
        
    )

}