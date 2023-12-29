import React from 'react'
import { Row, Col, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PlusIcon from '@rsuite/icons/Plus';
import "./fileattach.scss";
import { useTranslation } from 'react-i18next';
const ExtensionInputs = () => {
    const [inputfields, setinputfields] = useState([{ file: '', id: 0 }]);
    const [formErrors, setFormErrors]: any = useState([]);
    const [counter, setCounter] = useState(1);
    const {t}=useTranslation();
    const addFields = () => {
        if (inputfields.length < 10) { // Check if the limit is not reached
          const newId = counter;
          setCounter((prevCounter) => prevCounter + 1);
          let newfield = { file: '', id: newId };
          setinputfields([...inputfields, newfield]);
          setFormErrors([]);
        }
      }
      
      const removefields = (index: any) => {
        console.log(counter, "from remove");
        setCounter((prevCounter) => prevCounter - 1);
        let data = [...inputfields];
        let error = [...formErrors];
        data.splice(index, 1);
        error.splice(index, 1);
        setinputfields(data);
        setFormErrors(error);
      }
    console.log(counter)
    function handlefileChange(event: any, index: any) {
        const { name, value } = event.target;
        const trimmedStr = value.replace(/^\s+/, '');
        let data: any = [...inputfields];
        data[index][event.target.name] = trimmedStr;
        setinputfields(data);
        clearError(index);
    }
    const clearError = (index: any) => {
        let errors: any = [...formErrors];
        errors[index] = '';
        setFormErrors(errors);
    }

    const validateForm = () => {
        let errors: any = [];
        let regx = /^\.[a-zA-Z]+$/

        inputfields.forEach((field, index) => {
            console.log(regx.test(field.file))
            if (field.file === '') {
                errors[index] = 'Extension type is required';
            } else if(field.file.length < 2 || field.file.length > 10) {
                errors[index] = 'Extension: 2-10 characters, starts with a dot(.)';
            } else if(regx.test(field.file) == false) {
                errors[index] = 'Only characters allowed after dot (.)';
            }
        });
        setFormErrors(errors);
        return errors.length === 0;
    }
    const handlesubmit = () => {
        const errorResult = validateForm();
        if(errorResult) {
            setinputfields([{ file: '', id: 0 }]);
            setFormErrors([]);
        }
    }
    return (
        <React.Fragment>
            <div className='d-flex'>
                <div style={{marginTop: "4px"}}>
                    <label className='form-group m-2'>{t("File Extension Type")}</label>
                    <span>:</span>
                </div>
                <div className='inputfield-obj'>
                    <form></form>
                    {
                        inputfields.map((file: any, index: any) => {
                            return (
                                <div style={{ padding: "8px" }}>
                                    <div className='container d-flex' key={index}>
                                        <span className='text text-danger p-2'>*</span>
                                        <div>
                                            <input
                                                type="text"
                                                name="file"
                                                id={index}
                                                style={{ width: "300px" }}
                                                value={file.file}
                                                onChange={(event: any) => handlefileChange(event, index)}
                                                className={`form-control ${formErrors[index] ? `inputTextErr` : ``}`}
                                                placeholder={t("Enter the extension type") as any}
                                                maxLength={10}
                                                minLength={2}
                                            // placeholder={index}
                                            /></div>


                                        {(index === inputfields.length - 1) ?
                                            <button onClick={addFields} className='add-icon' style={{margin: "-6px 5px 1px 5px", borderRadius: "50%" }}>
                                                <OverlayTrigger
                                                    delay={{ hide: 0, show: 30 }}
                                                    overlay={(props) => (
                                                        <Tooltip {...props}>
                                                            {t("Add")}
                                                        </Tooltip>
                                                    )}
                                                    placement="right"
                                                >
                                                    <i className="mdi mdi-plus rounded-circle "></i>
                                                </OverlayTrigger>
                                            </button>
                                            // <Button variant="light" style={{ marginLeft: "8px", borderRadius: "35px", color: "green", borderColor: "green" }} onClick={addFields}>+</Button> :
                                            :
                                            // <Button style={{ marginLeft: "8px", borderRadius: "35px", color: "red", borderColor: "red" }} variant='light' onClick={() => removefields(index)}>-</Button>}

                                            <button
                                                onClick={() => removefields(index)}
                                                className='remove-icon'
                                                style={{ margin: "-6px 5px 1px 5px", borderRadius: "50%" }}
                                            >
                                                <OverlayTrigger
                                                    delay={{ hide: 0, show: 30 }}
                                                    overlay={(props) => (
                                                        <Tooltip {...props}>
                                                            {t("Remove")}
                                                        </Tooltip>
                                                    )}
                                                    placement="right"
                                                >
                                                    <i className="mdi mdi-minus rounded-circle " onClick={() => removefields(index)}></i>
                                                </OverlayTrigger>
                                            </button>
                                        }

                                    </div>
                                    {/* <div> */}
                                        {formErrors[index] && <div className="container alert alert-danger  pt-0  text-align-center error-message_file">
                                            <span className='errorMsg'>
                                                <i className="fa-sharp fa-solid fa-circle-exclamation ps-1 " style={{ marginRight: "6px" }}></i>
                                                {t(formErrors[index])}
                                            </span>
                                        </div>}
                                    {/* </div> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Button style={{ float: "right" }} onClick={handlesubmit}>{t("Submit")}</Button>
        </React.Fragment>
    )
}

export default ExtensionInputs;