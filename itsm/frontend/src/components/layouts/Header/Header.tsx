import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OverlayTrigger, Tooltip, Modal, Button, Col } from "react-bootstrap";
import UserProfile from "../../molecules/UserProfile/UserProfile";
import { CreateTicket } from "../../createTicket/createTicket";
import Menus from "./Menus.json";
import DropDrown from "../../molecules/ConfirmModal/DropDrown";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { ActionTypes } from "../../../redux/constants/action-types";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import { getColorForLetter } from "../../Utils/GetColorNotification";
import { config } from "../../../config/config";
import { isAdminUser } from "../../Utils/isAdminUser";
interface MenuItem {
  name: string;
  isFavoriteMenu: boolean;
  isActive: boolean;
  item_no: number;
}
const socket = io(config.ENV.PROXY_API_URL);

export const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex]: any = useState(-1);
  const [dark, setDark] = useState(false)
  const [menuItems, setMenuItems] = useState(Menus);
  const [favoriteMenuItems, setFavoriteMenuItems] = useState<MenuItem[]>([]);
  const [showprofile, setshowprofile] = useState(false);
  const menuItemRef = useRef(null);
  const [markRead, setmarkRead]:any = useState({});
  const navigate=useNavigate();
  const [mainMenu, setMainMenu] = useState([
    { item: "Dashboard", url: "#/dashboard", target: "" },
    { item: "MyShift", url: "https://myshift.cloud4c.com/itil/allticketManager", target: "_blank" },
    // { item: "SOD/EOD", url: "" },
    // { item: "License", url: "" },
    // { item: "Status Board", url: "" },
    // { item: "SAP Board", url: "" },
    // { item: "Roster Management", url: "" },
  ]);
  const [notifications, setNotifications]:any = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const flag = useSelector((state: any) => state.setIsLoading);
  const fallBackError = useSelector((state: any) => state.setFallbackError);
  let isEmptyFavourite = false;
  const favoriteHandler = (index: number) => {
    //logic 1
    // setMenuItems ([ ...menuItems.slice(0, index),
    // ...menuItems.slice(index + 1)])

    //logic 2
    // const newMenuItems = [...menuItems];
    // newMenuItems.splice(index, 1);
    // setMenuItems(newMenuItems);
    const newMenuItems = [...menuItems];
    const removedItem = newMenuItems.splice(index, 1);
    const newFavorites = [...favoriteMenuItems, ...removedItem];
    setMenuItems(newMenuItems);
    setFavoriteMenuItems(newFavorites);
  };
  const [show, setshow] = useState(false);
  const [admin,setadmin]=useState(true);
  const [toogleVal, settoogleVal] = useState(true)
  const removeFavoriteHandler = (index: number) => {
    const newMenuItems = [...favoriteMenuItems];
    const removedItem = newMenuItems.splice(index, 1);
    const newFavorites = [...menuItems, ...removedItem];
    setFavoriteMenuItems(newMenuItems);
    setMenuItems(newFavorites);
    isEmptyFavourite = newMenuItems.length === 0;
    // alert(newMenuItems.length)
    // if(newMenuItems.length)
  };

  const handleChange = () => {
    setDark(!dark)
    dispatch({ type: ActionTypes.SET_THEME, payload: { theme: !dark } })
  }
  const handleClick = (index: number) => {
    setshow(true);
    setSelectedIndex(index);
  };
  const handleadmin=()=>{
if(admin===true){
  navigate('/admin/dashboard')
}
  }
  useEffect(() => {
    handleClick(0);
  }, []);
  const handleClose = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "https://shop.cloud4c.com/";
  };
  function handleKeyDown(event: any, key: string, modifier: string) {
    if (event[modifier] && event.key.toLowerCase() === key.toLowerCase()) {
      window.location.href = '#/search';
      setSelectedIndex(-1)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', (event) => handleKeyDown(event, '/', 'ctrlKey'));
    return () => {
      document.removeEventListener('keydown', (event) => handleKeyDown(event, '/', 'ctrlKey'));
    };
  }, [handleKeyDown]);

  useEffect(() => {
    // Listen for 'notificationCount' event from the server
    socket.on('notificationCount', (count:any) => {
      // Update the count if needed
      setNotificationCount(count);
    });

    // Listen for 'notifications' event from the server
    socket.on('notifications', (newNotifications:any) => {
      setNotifications(newNotifications);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleRead = (id:any, ticketID:any) => {
    sessionStorage.setItem("ticketId", ticketID);
    socket.emit('markNotification', { type: 'single', notificationId: id });
    dispatch({ type: ActionTypes.SET_CANVAS_FLAG, payload: {flag: true}})
    dispatch({ type: ActionTypes.SET_TOOGLE_NOTIFICATION, payload: {flag: false}});
  }
  const handleMarkAllAsRead = () => {
    if(notificationCount > 0) {
      socket.emit('markNotification', { type: 'all'});
    }
  };
  const handleToogle = () => {
    settoogleVal(!toogleVal)
  }
  const handleOffcanvas = () => {
    sessionStorage.removeItem('ticketId');
    dispatch({ type: ActionTypes.SET_CANVAS_FLAG, payload: {flag: true}})
  }

  return (
    <>
      <header>
        <div id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
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
              {/* <h6 className="text-white tthreetext pt-4" id="tthreetextMobile">
                T3
              </h6> */}
              <button
                type="button"
                className="btn btn-sm me-2 font-size-24 d-lg-none header-item"
                data-bs-toggle="collapse"
                data-bs-target="#topnav-menu-content"
              >
                <i className="mdi mdi-menu"></i>
              </button>
            </div>

            <div className="topnav w-100">
              <div className="container-fluid">
                <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                  <div
                    className="collapse navbar-collapse"
                    id="topnav-menu-content"
                  >
                    <Col>

                      <ul className="navbar-nav">
                        {mainMenu.map((item, index) => (
                          <li

                            key={index}
                            className={`${index === selectedIndex ? "selected" : ""
                              } nav-item `}
                            onClick={() => handleClick(index)}

                          >
                            <a className="nav-link" href={item.url} target={item.target}>
                              {t(item.item)}
                            </a>
                          </li>
                        ))}
                        {/* <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle arrow-none "
                            data-bs-toggle="dropdown"
                            href="!#"
                            id="topnav-emailtemplates"
                            role="button"
                          >
                            {t("More")}
                          </a>
                          {menuItems.length > 0 ? (
                            <div
                              className="dropdown-menu "
                              aria-labelledby="topnav-emailtemplates"
                            >
                              <div className="scrollable-container">
                                {menuItems.map((items, index) => (
                                  <a key={index} className="dropdown-item">
                                    <div className="moreMenu">
                                      <div className="moreMenu-items">
                                        {t(items.name)}
                                      </div>
                                      <div className="addTofavorite-icon">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip
                                              id={`tooltip-addToFavorites`}
                                            >
                                              {t("Add to Favorites")}
                                            </Tooltip>
                                          }
                                        >
                                          <i
                                            className="mdi mdi-plus rounded-circle favoriteIcon"
                                            onClick={() => favoriteHandler(index)}
                                          ></i>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="dropdown-menu "
                              aria-labelledby="topnav-emailtemplates"
                            >
                              <div className="scrollable-container">
                                <a className="dropdown-item">
                                  <div className="moreMenu">
                                    <div className="moreMenu-items">
                                      {t("No More Menu's")}
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          )}
                        </li> */}
                      </ul>
                    </Col>
                  </div>
                </nav>
              </div>
            </div>

            <div className="d-flex headerButtons">

              {/* <FormGroup style={{marginTop: "3px"}}>
      <FormControlLabel control={<Switch  value ={dark} onChange={handleChange} />} label={dark ?"dark ":"light"}  color="primary"/>
    </FormGroup> */}

              {/* <div className="dropdown iconhover d-inline-block">
                <button
                  type="button"
                  className="btn header-item favorite-icon icon-link"
                  id="#"
                  data-bs-toggle={"dropdown"}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip id={`tooltip-addToFavorites`}>
                        {t("Favorites")}
                      </Tooltip>
                    }
                  >
                    <i className="mdi mdi-star-outline"></i>
                  </OverlayTrigger>
                </button>
                <div className="dropdown-menu dropdown-menu-end p-0">
                  <div className="" style={{ paddingTop: "12px" }}>        
                    <div
                      className="scrollable-container"
                      data-simplebar
                      style={{ maxHeight: "230px" }}
                    >
                      {favoriteMenuItems.length > 0 ? (<div>
                        {favoriteMenuItems.map((items, index) => (
                          <a
                            key={index}
                            // href={items.name}
                            className="dropdown-item"
                          >
                            <div className="moreMenu">
                              <div className="moreMenu-items">{t(items.name)}</div>
                              <div>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id={`tooltip-addToFavorites`}>
                                      {t("Remove Item")}
                                    </Tooltip>
                                  }
                                >
                                  <i
                                    className="mdi mdi-minus rounded-circle favoriteIcon"
                                    onClick={() => removeFavoriteHandler(index)}
                                  ></i>
                                </OverlayTrigger>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>) : <a
                        className="dropdown-item"
                      >
                        <div className="moreMenu">
                          <div className="moreMenu-items">  {t("No favorites")}</div>
                        </div>
                      </a>
                      }
                    </div>
                  </div>
                </div>
              </div> */}
              {
                (fallBackError.flag == false) &&
                <>
                  <CreateTicket />
              <Link to="/search">
                <button
                  type="button"
                  // data-bs-toggle="modal"
                  data-bs-target="#adddocumentModal"
                  className="btn header-item search-icon icon-link"
                  onClick={() => { setSelectedIndex(-1) }}
                >
                  <OverlayTrigger
                    delay={{ hide: 0, show: 30 }}
                    overlay={(props) => (
                      <Tooltip {...props}>
                        {t("Search Tickets")}
                      </Tooltip>
                    )}
                    placement="bottom"
                  >
                    <i className="mdi mdi-magnify"></i>
                  </OverlayTrigger>
                </button>
              </Link>
              <div className="dropdown iconhover d-inline-block notifications-mbl">
                <button
                  type="button"
                  className="btn header-item noti-icon icon-link"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-bell-outline bell-shake"></i>
                  {
                    (notificationCount > 0)?
                    <span className="badge bg-danger rounded-pill">{notificationCount}</span>:null
                  }
                </button>
                <div>
                  {
                    toogleVal? 
                    <div
                      className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                      aria-labelledby="page-header-notifications-dropdown"
                      style={{width: "25rem"}}
                      >
                      <div className="p-3 border-bottom">
                        <div className="row align-items-center">
                          <div className="col d-flex justify-content-between">
                              <div className="m-0 font-size-17">
                                {t("Notifications")}
                              </div>
                                <div className="float-end mt-1">
                              <div className="m-1 text-primary d-inline" onClick={handleMarkAllAsRead} style={{cursor: "pointer"}}>
                                {t("Mark as all read")}
                              </div>
                            <div className="ms-3 text-primary d-inline noti-set pointer" onClick={handleToogle}>
                            <span><i className="fa-solid fa-gear"></i></span>
                            {/* <DropDrown/> */}
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-simplebar
                        style={{ maxHeight: "500px" }}
                        className="overflow-hidden"
                      > 
                          <div className="scrollable-container">
                          {notifications?.slice(0, 5).map((item:any, index:any) => (
                            <div
                              key={index}
                              // href="newemployees.html"
                              className="text-reset notification-item"
                              onClick={() => handleRead(item?.id, item?.ticketID)}
                            >
                              {/* <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar-xs">
                                    <span className="avatar-title bg-warning rounded-circle font-size-16">
                                      <i className="mdi mdi-account-outline"></i>
                                    </span>
                                  </div>
                                </div>

                                <div className="flex-grow-1">
                                  <span className="mb-1"> {item?.ticketID}  - <span className="ntc_text">{item?.ticketStatus}</span></span>
                                  <div className="font-size-12 text-muted">
                                    <span className="mb-1">{item?.ticketActivity} <span className="ntc_time">{item?.dateTime}</span></span>
                                  </div>
                                  <div>
                                    <span>{item?.username}</span>
                                  </div>
                                  <div>
                                    <i className={`fa-solid fa-check-double ${markRead[item?.id]? "text-primary": "read-Color"}`}></i>
                                      <span className={`markRead ${markRead[item?.id]? "read-Color":"text-primary"}`} onClick={() => handleRead(item?.id)}>
                                        {item?.action}
                                      </span>
                                  </div>
                                </div>
                              </div> */}

                          <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs">
                              <span className={`avatar-title rounded-circle font-size-16 ${getColorForLetter(item?.username)}`}>
                                <i className="mdi mdi-account-outline"></i>
                              </span>
                            </div>
                          </div>

                          <div className="flex-grow-1">
                              <div className="assigned text-secondary">
                              <i className="mdi mdi-ticket-confirmation-outline verticalicon"></i>
                              <span className="ms-3 ">Ticket Assigned</span>
                              {/* <span className="ms-2" style={{fontSize: "12px"}}>
                                {
                                  (markNotification[index]?.read)?
                                  <i className="fa-sharp fa-solid fa-eye text-primary"></i>:
                                  <i className="fa-solid fa-eye-slash"></i>
                                }
                              </span> */}
                              </div>

                              <div className="username">
                                <p className="fw-bold text-truncate w-89">{item?.ticketID} - ({item?.ticketStatus}) assigned to</p>
                                <span>{item?.username}</span>
                                <p className="text-secondary">{item?.ticketActivity}</p>
                              </div>

                            </div>

                          </div>


                            </div>
                          ))}
                          
                            
                          </div>
                      </div>
                      <div className="p-2 border-top show-list">
                        <div className="d-grid">
                          <div 
                            // to="/notification"
                            className="btn btn-sm btn-link font-size-14 text-center"
                            // href="newemployees.html"
                            // state={{ data: notifications }}
                            onClick={handleOffcanvas}
                          >
                            {t("Show all notifications")}
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                  style={{width: "25rem"}}
                >
                  <div className="p-3 border-bottom">
                    <div className="row align-items-center">
                      <div className="col d-flex justify-content-between">
                          <div className="m-0 font-size-17 pointer setiicon" onClick={handleToogle}>
                          <i className="mdi mdi-backburger mt-2"></i> {t("Settings")}
                          </div>
                            <div className="float-end mt-1">

                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-simplebar
                    style={{ maxHeight: "230px" }}
                    className="overflow-hidden"
                  > 
                      <div className="scrollable-container">
                      {notifications?.slice(0, 5).map((item:any, index:any) => (
                        <div
                          key={index}
                          // href="newemployees.html"
                          className="text-reset notification-item"
                        >
                    
                        </div>
                      ))}
                      
                      <div className="d-flex">
                            <div className="flex-grow-1"> 
                                <div className="enable border-bottom p-3">
                                  <a href="#" className="fw-bold">Enable desktop notifications</a>
                                  <p className="text-secondary">Get alerts about tickets even when you're in another tab</p>
                                </div>
                                <div className="assigtick py-2 border-bottom px-3">
                                  <p className="fw-bold d-inline-block">Tickets assigned to my groups</p>
                                  <i className="mdi mdi-monitor-off float-end"></i> 
                                </div>
                                <div className="assigtick py-2 border-bottom px-3">
                                  <p className="fw-bold d-inline-block">New tickets</p>
                                  <i className="mdi mdi-monitor-off float-end"></i> 
                                </div>
                                <div className="assigtick py-2 border-bottom px-3">
                                  <p className="fw-bold d-inline-block">New responses on my tickets</p>
                                  <i className="mdi mdi-monitor text-success float-end"></i> 
                                </div>
                                <div className="assigtick py-2 border-bottom px-3">
                                  <p className="fw-bold d-inline-block">Status updates on my tickets</p>
                                  <i className="mdi mdi-monitor text-success float-end"></i> 
                                </div>
                                <div className="assigtick py-2 border-bottom px-3">
                                  <p className="fw-bold d-inline-block">Private notes I'm tagged in</p>
                                  <i className="mdi mdi-monitor text-success float-end"></i> 
                                </div>
                                <div className="assigtick py-2 border-bottom px-3">
                                  <p className="fw-bold d-inline-block">Public notes I'm tagged in</p>
                                  <i className="mdi mdi-monitor text-success float-end"></i> 
                                </div>
                                <div className="assigtick py-2 px-3">
                                  <p className="fw-bold d-inline-block">Tickets assigned to me</p>
                                  <i className="mdi mdi-monitor text-success float-end"></i> 
                                </div>
                              </div>

                            </div>
                      </div>
                  </div>
                  
                    </div>
                  }
                </div>
              </div>
                </>
              }
              {/* <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#settingModal"
                className="btn header-item setting-icon icon-link"
              >
                <svg
                  id="settings"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </button> */}

              <div className="dropdown d-inline-block">
                {
                  isAdminUser(false)? 
                  <button
                  type="button"
                  className="btn header-item"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <OverlayTrigger
                    delay={{ hide: 0, show: 30 }}
                    overlay={(props) => (
                      <Tooltip {...props}>
                        {t("Profile")}
                      </Tooltip>
                    )}
                    placement="bottom"
                  >
                    <img
                      className="rounded-circle header-profile-user"
                      src="./img/avatar-1.jpg"
                      alt="Header Avatar"
                    />
                  </OverlayTrigger>
                </button>:null
                }
                <div className="dropdown-menu dropdown-menu-end">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setshowprofile(true);
                    }}
                    >
                   <i className="mdi mdi-account-circle font-size-17 align-middle me-1"></i>
                   {t("Profile")}
                  </button>

                  <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#settingModal"
                className="dropdown-item"
              >
                <svg
                  id="settings"
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1 me-1"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                {t("Settings")}
              </button>
                  {
                    isAdminUser()?
                    <button
                    className="dropdown-item text-success"  
                    onClick={handleadmin}                 
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 8a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3a3 3 0 0 1-3 3Z"/></svg>
                    {/* <i className="mdi mdi-power-settings font-size-17 align-middle me-1"></i> */}
                    {t("Switch to Admin")}
                    </button>:null
                  }
                  <button
                    className="dropdown-item text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#logoutModal"
                    >
                    <i className="mdi mdi-power-settings font-size-17 align-middle me-1"></i>
                    {t("Logout")}
                  </button>
                </div>
             </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        show={showprofile}
        size="lg"
        className={dark ? "userdark" : ""}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => setshowprofile(false)}           // Added onHide to achieve keyboard, backdrop behavior to close Modal //
      >
        <Modal.Header>
          <h4>{t("User Details")}</h4>
        </Modal.Header>
        <Modal.Body>
          <UserProfile />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setshowprofile(false)}>{t("Close")}</Button>
        </Modal.Footer>
      </Modal>
      {/* Logout Modal */}
      <div
        className={`modal fade ${dark ? "userdark" : ""}`}
        id="logoutModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> */}
            <div className="modal-body">
              <h4> {t("Are you sure want to logout?")}</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClose}
              >
                {t("Yes")}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("No")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* settings tab */}
      <div className="modal right fade" id="settingModal">
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header p-2 pe-0">
              <h6 className="modal-title">{t("Settings")}</h6>
              <button
                type="button"
                className="btn-close me-2"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body p-0">
              <div className="scrollable-container">
                <div className="row w-100 ps-3 pt-3">
                  <div className="col-md-12">
                    <h6>{t("Theme Option")}</h6>
                  <FormGroup style={{marginTop: "3px"}}>
                     <FormControlLabel control={<Switch  value ={dark} onChange={handleChange} />} label={dark ?t("Dark"):t("Light")}  color="primary"/>
                  </FormGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
