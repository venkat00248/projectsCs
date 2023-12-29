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

export default function Editvideopopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const videotype = [
    {
      value: 'Upload',
      label: 'Upload',
    },
    {
      value: 'You Tube',
      label: 'You Tube',
    },
  ]; 

  const statustype = [
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
      <Tooltip title="Edit Video" placement="top" arrow> 
         <Button className='btn editicon' data-bs-toggle="tooltip" title="Edit" variant="outlined" onClick={handleClickOpen}><i className="mdi mdi-account-edit text-primary"></i>
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
        <h6 className='pt-2'>{"Edit Video"}</h6> 
          <Button className='mdclose' onClick={handleClose}><i className="mdi mdi-close"></i></Button>
        </DialogTitle>
        <DialogContent>
          
          <div className="row mt-3">
				<div className="form-group col-md-6 mb-3">
             <TextField id="outlined-filename" label="Name" variant="outlined" size='small'/>
				  </div>
 
				  <div className="form-group col-md-6 mb-3">
          <TextField
            id="outlined-video-type"
            select
            label="Select Video Type"
            size='small'
            //helperText="Please select your categories"
          >
            {videotype.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
 
				  </div>
				  <div className="form-group col-md-6 mb-3">
            <TextField id="outlined-url" label="Url" variant="outlined" value="Information_Security_Training.mp4" size='small'/>
					</div>
								  
					<div className="form-group col-md-6 mb-3">
            <TextField id="displayorder" label="Display Order" variant="outlined" value="2" size='small'/>
					  </div>
					  
					<div className="form-group col-md-6 mb-3">
          <TextField id="displayorder" label="Description" variant="outlined" value="Information Security Training" size='small'/> 
					</div>
					<div className="form-group col-md-6 mb-3">
          <TextField id="displayorder" label="Pop Up Description" variant="outlined" value="Information Security Training" size='small'/> 
					  </div>
					  <div className="form-group col-md-6 mb-3">

            <TextField
            id="outlined-video-type"
            select
            label="Select Video Type"
            size='small'
            //helperText="Please select your categories"
          >
            {statustype.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
 
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