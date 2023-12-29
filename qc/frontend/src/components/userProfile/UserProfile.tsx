import './UserProfile.scss'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './UserProfile.scss'
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
    <h6 className="mb-0 mt-0">Suresh Kumar Vattepu</h6>
    <span>Employee Name</span>
</div>
</div>
<div className="p-2 m-2 mt-0 bg-white stats">
<div className='row'>
    <div className='col-md-12'>
<div className="d-flex flex-column border-bottom pb-2">
    <span className="articles">Employee Code</span>
    <strong>990352</strong>
</div>
</div>
<div className='col-md-12'>
<div className="d-flex flex-column border-bottom py-2">
    <span className="followers">Email ID</span>
    <strong>suresh.v@cloud4c.com</strong>

</div>
</div>
<div className='col-md-12'>
<div className="d-flex flex-column pt-2">
    <span className="rating">Department</span>
    <strong>CDN</strong>
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
            <button className="dropdown-item text-muted"  onClick={toggleDrawer(anchor, true)}><i
                            className="mdi mdi-account-circle font-size-17 align-middle me-1"></i> profile </button>
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