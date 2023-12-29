import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function Deletedocumentspopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  return (
    <div>
      <Tooltip title="Delete" placement="top" arrow> 
        <Button className="btn item me-2" data-bs-toggle="tooltip" title="Edit" variant="outlined" onClick={handleClickOpen}><i className="mdi mdi-delete-sweep-outline text-danger"></i>
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
                    '& .MuiTextField-root': { m: 1,},
                }}
            noValidate
            autoComplete="off"
            style={{width:'600px'}}
       >  
        <DialogTitle>
            <h6 className='pt-2'>{"Delete Iteam"} </h6>
          <Button className='mdclose' onClick={handleClose}><i className="mdi mdi-close"></i></Button>
        </DialogTitle>
        <DialogContent>
          
        <div className="row">
          <div className='col-md-12 pt-5 text-center'>
            <p className='fw-bold'>Are you sure to delete this item?</p>
          </div>
 
          </div> 
 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
          <Button className='text-danger' autoFocus onClick={handleClose}>Cancel</Button>
        </DialogActions>
  </Box>
      </Dialog>
    </div>
  );
}