import { Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { config } from "./../../config/config";


export const Errors = () => {
  const { t } = useTranslation();
  const [error, seterror] = useState("");
  const errorcodes:any = Object.keys(config.API.ERROR_CODES);
  const errorsString:any =   sessionStorage.getItem("errors");
 const parseErrorObject = JSON.parse(errorsString)?JSON.parse(errorsString):"";
    const key=Object.keys(parseErrorObject)
  // console.log(errorsString)
  const handleprops = async (errorsString:any) => {
    let errors = null;
    try {
      if (errorsString) {
        errors = JSON.parse(errorsString);
        seterror(errors);
      }
    } catch (error) {
      console.log("Error parsing JSON from session storage:", error);
    }
  };
  useEffect(() => {
    handleprops(errorsString);
    return () => {
     //setShowAlert(false)
    
    };
  }, [errorsString]);
  const [showAlert, setShowAlert] = useState(true);

  const handleClose = () => {
    sessionStorage.removeItem("errors");
    sessionStorage.removeItem("errorsdefault")
    setShowAlert(!showAlert);
  };
 
  return (
    <>
     
         {sessionStorage.getItem("errors") !== null && showAlert && key.length!==0 && (
          <Alert variant="danger" dismissible onClose={handleClose}>
            {errorcodes.map((code:any) => (
               error[code] && (
                <div key={code}>
                  {t(`${error[code]}`)}
                </div>
              )
            ))}
          </Alert>
        )}
        {!sessionStorage?.user && sessionStorage?.errorsdefault && (
           <Alert variant="danger" dismissible onClose={handleClose}>
          {sessionStorage.getItem("errorsdefault")}
         </Alert>
        )}

      
     
    </>
  );
};

export default Errors;
