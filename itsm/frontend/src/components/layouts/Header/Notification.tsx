import React from "react";
import "./Notification.scss";
import { useDispatch } from "react-redux";
import io from 'socket.io-client';
import { ActionTypes } from "../../../redux/constants/action-types";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { getColorForLetter } from "../../Utils/GetColorNotification";
import { config } from "../../../config/config";

const socket = io(config.ENV.PROXY_API_URL);
const Notification = ({notifications}:any) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const toogleNotification = useSelector((state:any) => state.toogleNotification);
    const handleRead = (id?:any) => {
      socket.emit('markNotification', { type: 'single', notificationId: id });
    }
    const handelNotiDetails = (ticketID:any, id?:any, status?:any) => {
      dispatch({ type: ActionTypes.SET_TOOGLE_NOTIFICATION, payload: {flag: false}});
      sessionStorage.setItem("ticketId", ticketID);
      if(status == false) {
        socket.emit('markNotification', { type: 'single', notificationId: id });
      }
    }

    return(
        <div>
          <section className="section-10 pt-0">
              <div className="container">
                <div className="notification-ui_dd-content"  data-testid = "notificationContainer">
                  {
                    notifications?.map((item:any, index:any) => (
                      <div className={`notification-list ${item?.read? '':'markas-not-read'}`} key={index} data-testid = "notificationItem">
                      <div className="notification-list_content d-flex" style={{cursor: "pointer"}} onClick={() => handelNotiDetails(item?.ticketID, item?.id, item?.read)} >
                          <div className="flex-shrink-0 me-3">
                                <div className="avatar-xs">
                                  <span className={`avatar-title font-size-16 ${getColorForLetter(item?.username)}`}>
                                    <i className="fst-normal">{item?.username.charAt(0)}</i>
                                  </span>
                                </div>
                          </div>
                          <div className="flex-grow-1">
                              <div className="assigned text-secondary">
                              <i className="mdi mdi-ticket-confirmation-outline verticalicon"></i>
                              <span className="mx-3 ">Ticket Assigned</span>
                              <span className="text-success border px-2 rounded dateandtime">{item?.ticketActivity}</span>
                              </div>
  
                              <div className="username">
                                <p className="fw-bold text-dark"> 
                                    <span>{item?.ticketID}</span> - <span>(</span><span>{item?.ticketStatus}</span><span>)</span> assigned to
                                </p>
                                <span className="text-muted">{item?.username}</span>
                                <p className="fw-bold text-muted">Cloud4c</p>
                              </div>
  
                            </div>
                      </div>
                      <div className="d-flex align-items-center mbl-mark">
                        <span className={`markRead ${item?.read? "read-Color":"text-primary"}`} onClick={() => handleRead(item?.id)} data-testid= "markReadButton">
                              {t(item?.action)}
                        </span> 
                      </div>
                    </div>
                    ))
                  }
                </div>
              </div>
          </section>
        </div>
    )
} 
export default Notification;