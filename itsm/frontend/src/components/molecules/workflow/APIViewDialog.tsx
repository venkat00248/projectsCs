import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TransitionProps } from '@mui/material/transitions';
import APIMetaData from './APIMetaData';
import './APIViewDialog.scss'
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function APIViewDialog({item}:any) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button style={{background:"none"}} onClick={handleClickOpen}>
        <VisibilityIcon/>
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
            style: {
              minWidth: '60%', // Adjust this value based on your needs
            },
          }}
      >
        <DialogTitle className='dialogTitle'>{"API Document"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <APIMetaData item={item}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
