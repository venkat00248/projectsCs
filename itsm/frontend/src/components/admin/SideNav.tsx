import React,{useState} from 'react'
import { Sidenav, Nav } from 'rsuite';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Link,Outlet, useLocation } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Priority} from './../ManagePriority/Priority'
import "./sidenav.scss"
import FileExtension from '../FileExtensions/FileExtension';
import WorkFlow from '../molecules/workflow/WorkFlow';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
export const SideNav = () => {
    const location = useLocation();
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
      
    const data=JSON.parse(sessionStorage.userDetails);
      const fullname=data.fullname;
      const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));
      
      const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          }),
        }),
      );
      const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      });
      const { t } = useTranslation();
      const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
      });
      const theme = useTheme();
      const [open, setOpen] = React.useState(false);
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
const drawerWidth = 240;
const [menus,setmenus]=useState([
    { item: "Dashboard", url: "/admin/dashboard", target: "fa-solid fa-desktop" },
    { item: "Priorities", url: "/admin/Priorities", target: "fa-solid fa-circle-exclamation" },
    { item: "File extensions", url: "/admin/filextensions", target:"fa-solid fa-file-export" },
    { item: "Workflow", url: "/admin/workflow", target: "fa-solid fa-network-wired" },
    { item: "Restrictform", url: "/admin/restrictform", target: "fa-solid fa-user-group" },
    { item: "mapping", url: "/admin/mapping", target: "fa-solid fa-code-merge" },
])
const [component,setComponent]:any=useState("");
  return (
    <div  className='sideNav' >
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{background:"grey" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          <div className="navbar-brand-box pe-2">
                <a href="#/dashboard" className="logo logo-light">
                  <span className="logo-sm">
                  <img src="./img/cloud4c_0.png" alt="hi" height="30" />
                  </span>
                  <span className="logo-lg">
                  <img className="w-100" src="./img/cloud4c_0.png" alt="" />
                  </span>
                </a>
              </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          
           <h5 className=' px-2'>{fullname}</h5>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}

        <List>
          {menus.map((text, index) => (
                  <Link key={index} to={text.url}>
            <ListItem onClick={()=>{setComponent(text?.item);console.log(component)}} key={text.item} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
               <i className={text.target}></i>
                </ListItemIcon>
          
                <ListItemText  sx={{ opacity: open ? 1 : 0 }} >
                    {t(text.item)}
                </ListItemText>
                
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      {/* sx={{ flexGrow: 1, p: 3 }} */}
      <Box component="main"  sx={{ flexGrow: 1}}>
       <Outlet/>
        </Box>
    </Box>
 
    
      </div>
    )
    
  
}

export default SideNav