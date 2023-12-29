import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../../redux/constants/action-types';
import "./canvas.scss";
import Notification from '../../layouts/Header/Notification';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import io from 'socket.io-client';
import { View } from '../../TicketView/View';
import { config } from "../../../config/config";

const socket = io(config.ENV.PROXY_API_URL);
const CustomCanvas = ({ name, convasVal, ...props }:any) => {
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState([]);
  const toogleNotification = useSelector((state:any) => state.toogleNotification);
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const detailID = sessionStorage.getItem("ticketId");

  useEffect(() => {
    // Listen for 'notifications' event from the server
    socket.on('markNotifications', (markNotifications) => {
      setNotifications(markNotifications);
    });
    socket.on('notificationCount', (count) => {
      // Update the count if needed
      setNotificationCount(count);
    });
    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClose = () => {
    dispatch({ type: ActionTypes.SET_CANVAS_FLAG, payload: {flag: false}})
    dispatch({ type: ActionTypes.SET_TOOGLE_NOTIFICATION, payload: {flag: true}})
  };
  const handleGoNotification = () => {
    sessionStorage.removeItem('ticketId');
    dispatch({ type: ActionTypes.SET_TOOGLE_NOTIFICATION, payload: {flag: true}})
  }
  const handleMarkAllAsRead = () => {
    if(notificationCount > 0) {
      socket.emit('markNotification', { type: 'all' });
    }
  };

  return (
    <div data-testid= 'canvasContainer'>
      <Offcanvas show={convasVal?.flag?.flag} onHide={handleClose} {...props} className={`full-screen-offcanvas ${theme? 'tableview': ''} ${theme? 'bottomdark-popupbox': ''}`} data-testid= 'offcanvasid'>
        <Offcanvas.Header closeButton>
              {
                (toogleNotification?.flag)?
                <div className="m-b-30 notification_header pb-2" data-testid= "MarkContainer">
                  <h3 className="heading-line d-inline-block float-start ms-2">{t("Notifications")} <i className="fa fa-bell text-muted"></i></h3>
                  <span className={`p-1 px-2 float-end mt-3 markRead ${(notificationCount == 0)? "read-Color":"text-primary"}`} onClick={handleMarkAllAsRead}>
                    {t('Mark as all read')}
                  </span>
                </div>:
                null
              }
          <Offcanvas.Title>
            {
              (toogleNotification?.flag)?
                null:
                <h3 className="heading-line d-inline-block float-start view-detailsIcon" style={{cursor: "pointer"}} onClick={handleGoNotification} data-testid= "detailTitle">
                  <span className='text-primary'>
                    <i className="mdi mdi-backburger mt-2 backNoti-Icon"></i>
                  </span>Ticket Details
                </h3>
            }
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div data-testid= "NotiViewContainer">
          {
            (toogleNotification?.flag)?
            <div data-testid = "notiContainer">
              <Notification
              notifications={notifications}
              />
            </div>
            :
            <div data-testid = "viewContainer">
              <View 
                ticketID= {detailID} 
              />
            </div>
          }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
export default CustomCanvas;