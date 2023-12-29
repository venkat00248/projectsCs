import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Documentspopup() {
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
     <Tooltip title="Add Documents" placement="top" arrow>  
        <Button className='btn btn-sm text-capitalize p-0 mb-2' variant="outlined" onClick={handleClickOpen}>
        <i  className="mdi mdi-plus me-1"></i> Add
        </Button>
       </Tooltip>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle  id="customized-dialog-title" onClose={handleClose}>
          <h6>Add Document</h6>
        </BootstrapDialogTitle>
        <DialogContent>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
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
            size='small'
            id="outlined-select-Documentview"
            select
            label="Select Document View"
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
          
</Box>
                    
        </DialogContent>
        <DialogActions>
          <Button className='text-danger' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}