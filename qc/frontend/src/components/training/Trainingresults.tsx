import react from 'react'
import './Training.scss'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TrainingresultsTable from './TrainingresultsTable';
export const Trainingresults = () => {

 
      const tainingnam = [
        {
          value: 'ISMS Training ',
          label: 'ISMS Training ',
        },
        {
          value: 'ISMS Training On 15-03-2019',
          label: 'ISMS Training On 15-03-2019',
        },
        {
            value: 'Test Training',
            label: 'Test Training',
          },

        
      ];


      const department = [
        {
          value: 'All Departments',
          label: 'All Departments',
        },
        {
          value: 'Access Control',
          label: 'Access Control',
        },
        {
            value: 'Access Control Documents',
            label: 'Access Control Documents',
          },
          {
            value: 'Accounts',
            label: 'Accounts',
          },
      ];

      

    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <h5 className='mb-2 text-primary'>Training Results</h5>
                    </div>
                </div>
                <div className='card-body'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1,},
                    }}
                    noValidate
                    autoComplete="off"
                    >

                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='d-flex'>
                            <h6 className='mb-0 pt-2 w-26'>Training Name : </h6>
                            <TextField
                                id="select-category"
                                select
                                label="Select Category"
                                size='small'
                                // helperText="Please select your categories"
                            >
                                {tainingnam.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>            
 
                            </div>

                        </div>
                        <div className='col-md-5'>
                            <div className='d-flex'>
                                <h6 className='mb-0 pt-2 w-25'>Department : </h6>
 
                                <TextField
                                id="select-documents-type"
                                select
                                label="Select Documents Type"
                                size='small'
                                // helperText="Please select your categories"
                            >
                                {department.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField> 
 
                            </div>

                        </div>
                        <div className='col-md-2'>
                            <div className='float-start'>
                                <Button size='small' className='py-0' variant="contained"><i className='font-size-20 mdi mdi-magnify'></i></Button>
                            </div>
                        </div>
                    </div>

                  </Box>
                </div>
            </div>

            <div className='row mt-3'>
                    <div className="customtbl table-responsive">
                     <TrainingresultsTable/>
                    </div>

            </div>

        </div>

    )

}