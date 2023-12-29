import './Employees.scss'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function UserProfile() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

<div className='light-bg'>
<div className="d-flex align-items-center px-2 pt-4 ">
<div className="image">
    <img src="assets/img/profile-picture.jpg" className="img-fluid" width="155" />
</div>

<div className="ms-3 w-100 pb-2">
    <h6 className="mb-0 mt-0">Sainath Behara</h6>
    <span>Employee Name</span>
</div>
</div>
<div className="p-2 m-2 mt-0 bg-white stats">
<div className='row'>
    <div className='col-md-12'>
<div className="d-flex flex-column border-bottom pb-2">
    <span className="articles">Employee Code</span>
    <strong>60559</strong>
</div>
</div>
<div className='col-md-12'>
<div className="d-flex flex-column border-bottom py-2">
    <span className="followers">Email ID</span>
    <strong>sainath.behara@cloud4c.com</strong>

</div>
</div>
<div className='col-md-12'>
<div className="d-flex flex-column border-bottom pt-2">
    <span className="rating">Department</span>
    <strong>SOC</strong>
</div>
</div>
<div className='col-md-12'>
<div className="d-flex flex-column pt-2">
    <span className="rating">Role</span>
    <strong>User Awaiting for Role Assing....</strong>
</div>
</div>
</div>
</div>
</div> 
    </Box>
  );

  return (
    <div >
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Tooltip title="Edit" placement="top" arrow> 
            <Button className="btn item me-2" onClick={toggleDrawer(anchor, true)}><i
                 className="mdi mdi-eye text-success"></i>
             </Button>
           </Tooltip>  
          {/* <Button >{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}