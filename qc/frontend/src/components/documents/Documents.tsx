import react from 'react'
import './Documents.scss'
import Documentspopup from './Documentspopup';
import Editdocumentspopup from './Editdocumentspopup';
import Deletedocumentspopup from './Deletedocumentspopup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DocumentTable from './DocumentTable';
export const Documents = () => {
    const categories = [
        {
          value: 'Automation',
          label: 'Automation',
        },
        {
          value: 'HR',
          label: 'HR',
        },
        {
          value: 'ISO Certifications & Reports',
          label: 'ISO Certifications & Reports',
        }, 
        {
            value: 'BCP',
            label: 'BCP',
          }, 
      ];

    return (
        <div>
            <div className='card'>
                <div className='card-header p-3'>
                    <div className='d-flex justify-content-between border-bottom'>
                        <h5 className='mb-2 text-primary'>Documents</h5>
                        <Documentspopup/>
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
            <DocumentTable/>                

            </div>

        </div>

    )

}