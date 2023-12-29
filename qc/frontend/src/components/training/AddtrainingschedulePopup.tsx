import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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

export default function AddtrainingschedulePopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

 
 
 return (
    <div>
        <Tooltip title="Add Roles" placement="top" arrow> 
          <Button className='btn btn-sm text-capitalize p-0 mb-2' variant="outlined" onClick={handleClickOpen}>
              <i  className="mdi mdi-plus me-1"></i> Add
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
        '& .MuiTextField-root': { m: 1, width: '900px' },
      }}
      noValidate
      autoComplete="off"
      style={{width:'900px'}}
    >
      
       
        <DialogTitle>
        <h6 className='pt-2'>{"Add Training Details"}</h6> 
          <Button className='mdclose' onClick={handleClose}><i className="mdi mdi-close"></i></Button>
        </DialogTitle>
        <DialogContent>
          
          <div className="row mt-3">
				     <div className="form-group col-md-6 mb-3">
             <TextField  size='small' id="training-name" label="Training Name" variant="outlined" />
				  </div>
 
				  <div className="form-group col-md-6 mb-3">
            <TextField  className='bg-light' size='small' id="training-date" label="Training Date" variant="outlined" />
				  </div>
          <div className="form-group col-md-6 mb-3">
            <TextField  className='bg-light' size='small' id="exam-date" label="Exam Date" variant="outlined" />
				  </div>
          <div className="form-group col-md-6 mb-3">
            <TextField  size='small' id="training-venue" label="Training Venue" variant="outlined" />
				  </div>
          <div className="form-group col-md-6 mb-3">
          <label className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1"></textarea>
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