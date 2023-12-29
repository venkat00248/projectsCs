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

export default function AddtraningresultsPopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

 
 
 return (
    <div>
         <Tooltip title="Add Traning Results" placement="top" arrow> 
            <Button className="btn item me-2" data-bs-toggle="tooltip" title="Edit" variant="outlined" onClick={handleClickOpen}><i className="mdi mdi-clipboard-check-outline text-primary"></i>
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
        '& .MuiTextField-root': { m: 1, width: '600px' },
      }}
      noValidate
      autoComplete="off"
      style={{width:'600px'}}
    >
      
       
        <DialogTitle>
        <h6 className='pt-2'>{"Add Traning Results"}</h6> 
          <Button className='mdclose' onClick={handleClose}><i className="mdi mdi-close"></i></Button>
        </DialogTitle>
        <DialogContent>
          
          <div className="row mt-3">
				     <div className="form-group col-md-12 mb-3">
             <TextField className='bg-light'  size='small' id="training-name" label="Traning Name" variant="outlined" defaultValue="ISMS Training" />
				  </div>
           </div>
           <div className="row mt-3">
            <div className="form-group col-md-9 mb-2">
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
          <div className="form-group col-md-3 pt-4">
          <a href="#" className="btn btn-sm border btnhover ml-2" type="button"><i className="far fa-file-excel me-1"></i> Sample Excel</a>
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