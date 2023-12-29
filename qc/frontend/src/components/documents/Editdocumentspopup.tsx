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

export default function Editdocumentspopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const categories = [
    {
      value: 'Procurement',
      label: 'Procurement',
    },
    {
      value: 'HR',
      label: 'HR',
    },
    {
      value: 'Marketing',
      label: 'Marketing',
    },
    {
      value: 'Operations',
      label: 'Operations',
    },
    {
      value: 'Service Delivery',
      label: 'Service Delivery',
    },
  ];


  const documentview = [
    {
      value: 'Web View',
      label: 'Web View',
    },
    {
      value: 'Tool View',
      label: 'Tool View',
    }
  ];

  


  return (
    <div>

      <Tooltip title="Edit" placement="top" arrow> 
            <Button className="btn item me-2" data-bs-toggle="tooltip" title="Edit" variant="outlined" onClick={handleClickOpen}><i className="mdi mdi-account-edit text-primary"></i>
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
            <h6 className='pt-2'>{"Edit Document"} </h6>
          <Button className='mdclose' onClick={handleClose}><i className="mdi mdi-close"></i></Button>
        </DialogTitle>
        <DialogContent>
          
        <div className="row">
          <div className="form-group col-md-6 mb-3 mt-2">

      <TextField
            id="outlined-select-categories"
            select
            label="Select Categories"
            size='small'
            //helperText="Please select your categories"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
            </div>

            <div className="form-group col-md-6 mb-3 mt-2">

            <TextField
            id="outlined-select-Documentview"
            select
            label="Select Document View"
            size='small'
            //helperText="Please select your document view"
          >
            {documentview.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
            </div>
          <div className="form-group col-md-12 mb-2">
          <TextField id="outlined-filename" label="File Name" variant="outlined" size='small' />
            </div>

            <div className="form-group col-md-12 mb-2">
              <label className="col-form-label">File Upload <span className="required">*</span></label>
              <div className="fileselect">
              <input type="file" id="file-input" required/>
              <label className="d-flex btn btn-sm btn-light border float-start">
                <i className="fa fa-paperclip pe-0"></i>
                <h6>Choose File</h6>
                <span className="rounded-end"></span>
              </label>
              <i className="fa fa-times-circle remove"></i>
              <div className="invalid-feedback float-start">Please upload document.</div>
              </div>
            </div>
              
            <div className="form-group bg-light py-2 col-md-12 mb-2">
            <label className="col-form-label d-block">User Previllages <span className="required">*</span></label>
            <FormGroup className='d-flex flex-md-row'>
                <FormControlLabel control={<Checkbox />} label="Select ALL" />
                <FormControlLabel control={<Checkbox />} label="Superuser" />
                <FormControlLabel control={<Checkbox />} label="Employee" />
                <FormControlLabel control={<Checkbox />} label="MD" />
                <FormControlLabel control={<Checkbox />} label="Internal IT" />
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