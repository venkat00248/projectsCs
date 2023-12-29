import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Editemployeespopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const department = [
    {
      value: 'Solution & Channel Sales',
      label: 'Solution & Channel Sales',
    },
    {
      value: 'Enterprise Sales',
      label: 'Enterprise Sales',
    },
    {
      value: 'Online Sales',
      label: 'Online Sales',
    },
    {
      value: 'Managed Services Sales',
      label: 'Managed Services Sales',
    },
    {
      value: 'Quality',
      label: 'Quality',
    },
  ];


  const role = [
    {
      value: 'Superuser',
      label: 'Superuser',
    },
    {
      value: 'Accounts Manager',
      label: 'Accounts Manager',
    },
    {
      value: 'Accounts Bill Register',
      label: 'Accounts Bill Register',
    },
    {
      value: 'Accounts Lead',
      label: 'Accounts Lead',
    },
    {
      value: 'Accounts Processor',
      label: 'Accounts Processor',
    },
  ];

  const download = [
    {
      value: 'Enable',
      label: 'Enable',
    },
    {
      value: 'Disable',
      label: 'Disable',
    },
  ];
 

  const status = [
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'In Active',
      label: 'In Active',
    },
  ];

  return (
    <div>

      <Tooltip title="Edit" placement="top" arrow> 
            <Button className="btn item me-2" variant="outlined" onClick={handleClickOpen}><i className="mdi mdi-account-edit text-primary"></i>
            </Button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description"
      >
           <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >  
        <DialogTitle>
            <h6 className='pt-2'>{"Edit Employee"} </h6>
          <Button className='mdclose' onClick={handleClose}><i className="mdi mdi-close"></i></Button>
        </DialogTitle>
        <DialogContent>
          
        <div className="row mt-2">
           <div className="form-group col-md-6 mb-2">
               <TextField id="employee_name" label="Employee Name" variant="outlined" size='small' />
            </div>
            <div className="form-group col-md-6 mb-2">
               <TextField id="employee_email" label="Employee Email" variant="outlined" size='small' />
            </div>

          <div className="form-group col-md-6 mb-3 mt-2">

      <TextField
            id="outlined-select-department "
            select
            label="Select Department "
            size='small'
            //helperText="Please select your department "
          >
            {department .map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
            </div>
            <div className="form-group col-md-6 mb-3 mt-2">
            <TextField
            id="outlined-select-role"
            select
            label="Select Role"
            size='small'
            //helperText="Please select your document view"
          >
            {role.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
            </div>
            <div className="form-group col-md-6 mb-3 mt-2">
            <TextField
            id="outlined-select-download"
            select
            label="Select Download"
            size='small'
            //helperText="Please select your document view"
          >
            {download.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
            </div>

            <div className="form-group col-md-6 mb-3 mt-2">
            <TextField
            id="outlined-select-status"
            select
            label="Select Status"
            size='small'
            //helperText="Please select your status"
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
            </div>
 
            <div className="form-group bg-light py-2 col-md-12">
            <label className="col-form-label d-block">Send Email <span className="required">*</span></label>
            <FormGroup className='d-flex flex-md-row'>
                <FormControlLabel control={<Checkbox />} label="Check to Send Email" />
            </FormGroup>
           </div>
 
          </div> 
 
        </DialogContent>
        <DialogActions>
        <Button className='text-danger' autoFocus onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
  </Box>
      </Dialog>
    </div>
  );
}