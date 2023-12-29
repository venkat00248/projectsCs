import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import "../TicketView/Communication.scss"
import { TicketTypeService } from "../uidashboard/Imports";
import { Card, ListGroup } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify";
import { config } from "../uidashboard/Imports";
const RestrictForm = () => {
    const [restrictForm, setRestrictForm]:any = useState([]);
    let personName: any = sessionStorage.getItem("userDetails");
    let TicketForm: any = JSON.parse(personName);
    let emailId: any = TicketForm?.email_id;
    const { t } = useTranslation();
    const handleRestrictForm = async() => {
        const res:any = await TicketTypeService.getRestrictForm();
        if(res?.source == 'handleSuccess') {
          const resData = res.data || [];
          const updatedForm = [...resData]
          updatedForm[8].title = emailId;
          updatedForm[9].title = emailId;
          setRestrictForm(updatedForm)
        } else {
          const filteredErrors = res?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmgateway.cloud4c.com/restrictform"]);
          toast.error(filteredErrors[0]['errorMsg'], {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
    }
    useEffect(() => {
        handleRestrictForm();
        
    }, [])

    const handleRadioChange = (event:any, name:any, index:any) => {
      const value = event.target.value;
      const updatedForm = [...restrictForm];
      updatedForm[index].selectedValue = value;
      setRestrictForm(updatedForm);
      localStorage.setItem(name, value);
    }
    const getRadioValueFromLocalStorage = (name:any) => {
      return localStorage.getItem(name) || '';
    }

    return(
          <div>
           <Accordion alwaysOpen defaultActiveKey={['1']} className="custom-accordion-restrict">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t("General")}</Accordion.Header>
                    <Accordion.Body>
                     {t("General")}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item  eventKey="1">
                    <Accordion.Header>{t("Permissions")}</Accordion.Header>
                    <Accordion.Body>
                        {
                            <Card>
                              <ListGroup variant="flush" className="form-row">
                                <ListGroup.Item className="form-column d-flex justify-content-between">
                                    <div>
                                        <h6>{t(restrictForm[0]?.title)}</h6>
                                        <p style={{fontSize: "12px"}}>{t(restrictForm[0]?.subtitle)}</p>
                                    </div>
                                    <div className="d-flex">
                                        {restrictForm[0]?.radioOption.map((option:any) => (
                                        <div key={option.title} style={{margin: "5px"}}>
                                            <input 
                                              type="radio" 
                                              className="form-check-input" 
                                              name={restrictForm[0]?.name} 
                                              value={option.field_value} 
                                              style={{marginRight: "6px", marginTop: "3px"}} 
                                              checked={restrictForm[0]?.selectedValue === option.field_value || getRadioValueFromLocalStorage(restrictForm[0]?.name) === option.field_value}
                                              onChange={(e) => handleRadioChange(e, restrictForm[0]?.name, 0)}
                                            />
                                            <label>{t(option.title)}</label>
                                        </div>
                                        ))}
                                    </div>
                                </ListGroup.Item>
                              </ListGroup>
                              <ListGroup variant="flush" className="form-row">
                                <ListGroup.Item className="pb-0">
                                    <h3>{t("User Groups")}</h3>
                                </ListGroup.Item>
                                  {restrictForm.slice(1).map((data:any, index:any) => (
                                    <ListGroup.Item className="form-column d-flex justify-content-between" key={data.id}>
                                      <h6 style={{marginTop: "4px"}}>{t(data.title)}</h6>
                                      <div className="d-flex">
                                        {data.radioOption.map((option:any, optionIndex:any) => (
                                            <div key={option.title} style={{margin: "5px"}}>
                                              <input
                                                  type="radio"
                                                  className="form-check-input"
                                                  name={data.name}
                                                  value={option.field_value}
                                                  style={{ marginRight: "6px", marginTop: "3px" }}
                                                  checked={data.selectedValue === option.field_value || getRadioValueFromLocalStorage(data.name) === option.field_value}
                                                  onChange={(e) => handleRadioChange(e, data.name, index + 1)}
                                              />
                                              <label>{t(option.title)}</label>
                                            </div>
                                        ))}
                                      </div>
                                    </ListGroup.Item>
                                  ))}
                              </ListGroup>
                          </Card>
                        }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t("Languages")}</Accordion.Header>
                    <Accordion.Body>
                    {t("Languages")}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
          </div>
    )
}
export default RestrictForm;