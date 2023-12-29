import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthenticateService } from "../../services/AuthenticationService";
import CustomModal from "../molecules/ConfirmModal/CustomModal";
import { Admin } from "./Admin";
import { Ticketstile } from "./Ticketstile";
import "./Authenticate.scss";
import { config } from '../../config/config' 
import { FallbackComponent } from "../sampleException/FallbackComponent";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/constants/action-types";
import { Index } from "../molecules/Loader";

export const Authenticate = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>();
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState({});
  const [showModal, setShowModal] = useState({show: false, message: ""});
  const [closeTime, setCloseTime] = useState(3000)
  const [error, seterror]:any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const captureQueryString = (query: string = "token") => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let paramValue = urlParams.get(query) || localStorage.token;
    validateToken(paramValue);
  };

  const validateToken = async (token:any) => {
    if (token && token !== "") {
      const cachedUserDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
      if (Object.keys(cachedUserDetails).length && localStorage.getItem("token") === token) {
        setUserDetails(cachedUserDetails);
        setIsValidToken(true);
        setIsAdmin(Boolean(cachedUserDetails.isAdmin));
        window.history.pushState(null, "", '/#/dashboard');
        dispatch({ type: ActionTypes.SET_FALLBACK_ERRROR, flag: false})
      } else {
        setIsLoading(true);
        const res:any = await AuthenticateService.validateToken(token);
        if(res?.source == 'handleSuccess') {
          setIsLoading(false);
          const users = res?.data?.data || {};
          if (Object.keys(users).length) {
            setUserDetails(users);
            localStorage.token = token;
            sessionStorage.setItem("userDetails", JSON.stringify(users));          
            sessionStorage.staffId = users.staffid;
            setIsValidToken(true);
            setIsAdmin(Boolean(users.isAdmin));
            sessionStorage.tenant_data = JSON.stringify(users.t_data);
            // Navigate to dashboard //
            window.history.pushState(null, "", '/#/dashboard');
            dispatch({ type: ActionTypes.SET_FALLBACK_ERRROR, flag: false})
          } else {
            setIsLoading(false);
            // console.log("invalid token");
            setShowModal({show: true, message: "Sorry, User is not authorized Please. check your token."});
            sessionStorage.removeItem("userDetails");
            localStorage.removeItem("token");
            setTimeout(() => {
              setShowModal({show: false, message: ""});
              window.location.href = 'https://shop.cloud4c.com/';
            }, 3000);
          }
        } else {
          setIsLoading(false);
          const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/authorizeToken"]);
          seterror(filteredErrors);
        }
      }
    } else {
      setIsValidToken(false);
      sessionStorage.removeItem("userDetails");
      localStorage.removeItem("token");
      setShowModal({show: true, message: "Please check the token"});
      setTimeout(() => {
        const newpath = window?.location;
        window.history.pushState(null, "", newpath?.origin);
        setShowModal({show: false, message: ""});
      }, closeTime);
    }
  };
 
  useEffect(() => {
    captureQueryString();
  }, []);

  const handleCloseModal = () => {
    setShowModal({show: false, message: ""});
    setCloseTime(0)
  };
  return (
    <div className={`${(error?.length)? 'ErrorContainer': ''}`}>
      {
        (isLoading)?
        <div style={{ position: "relative", top: 250, textAlign: "center", padding: "12px", minHeight: "92.8vh" }}>
          <Index />
        </div>:
        (error?.length !== 0)?
        (<>
          {
            error.map((err:any) => (
              <FallbackComponent error={err?.errorMsg}/>
            ))
          }
        </>)
        :
        (
          <>
           {isAdmin !== undefined &&
        (isAdmin ? (
          // <Admin />
          <Ticketstile isValidToken={isValidToken} userDetails={userDetails} />
        ) : (
          <Ticketstile isValidToken={isValidToken} userDetails={userDetails} />
        ))}
        <CustomModal
          show={showModal.show}
          onHide={handleCloseModal}
          title = "UNAUTHORISED"
          footer={
            <>
              <Button variant="danger" onClick={handleCloseModal} style= {{padding: "2px", width: "50px"}}>
                Ok
              </Button>
            </>
          }
        >
        <p>{showModal.message}</p>
        </CustomModal>
          </>
        )
      }
    </div>
  );
};
