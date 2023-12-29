import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Carousel from 'react-bootstrap/Carousel';
import "suneditor/dist/css/suneditor.min.css";
import FileUploader from "./fileUpload";
import fileObject from "./formField.json"
import { useTranslation } from "react-i18next";
import Editor from "../molecules/CustomEditor/Editor";
const Element = ({...props}:any) => {
    const { t } = useTranslation();
    const {
        field, 
        ind, 
        handleChange, 
        handleEdior,
        handleBlur, 
        validateemail,
        error, 
        userformData, 
        formData, 
        fileError, 
        handleFileUpload, 
        handleFileDeletion, 
        uploadedFiles,
        progress} = props;
    const {
        title, 
        tooltips, 
        options, 
        errorMessage, 
        type, 
        value, 
        label, 
        name, 
        placeholder,
        radioOption, 
        fileAttach,
        ...inputProps} = field;
    const allowedExtensions:any = fileObject[7].allowed_ExtensionObj;
    const MaxFileSize:any = fileObject[7].Max_Size;

    const filterImage = uploadedFiles.filter((file:any) => ["jpg", "jpeg", "png", "gif"].includes(file.extension));
    const isSingleItem = filterImage.length === 1;
    const prevIcon = isSingleItem ? null : <span className="carousel-control-prev-icon" aria-hidden="true" />;
    const nextIcon = isSingleItem ? null : <span className="carousel-control-next-icon" aria-hidden="true" />;
    
    switch(type) {
        case 'select':
            return(
                <Row className="row_text mb-2 mt-2">
                    <Col sm = {2} className= "ticket_title">
                        <div>
                            <label className="ticket_Label">{t(title)}<span className= {error[field.id]? `text-danger`: `text-primary`}>*</span></label>
                        </div>
                    </Col>
                    {
                    (inputProps.id !== "customer_ticket_ref_id")?
                        <Col md={6} className = "select_field" id={name}>
                            <Select 
                                options={options} 
                                name={name} 
                                value = {formData[ind].label} 
                                placeholder={t(placeholder)}
                                className={error[field.id] ? 'react-select-error' : ''}
                                {...inputProps} 
                                onChange={(e:any)=>handleChange(e, ind)} 
                                onBlur={(e:any)=>handleBlur(e, ind)}/>
                                {error[field.id] ? 
                                <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
                                    <i className="fa-sharp fa-solid fa-circle-exclamation ps-1"></i>
                                    <div className="ps-2">
                                        {t(errorMessage)}
                                    </div>
                                </div>: null}
                        </Col> :
                        <Col md={6} className = "select_field" id={name}>
                            <Select 
                                options={options}
                                name={name} 
                                placeholder={t(placeholder)}
                                value = {formData[ind].label} 
                                className={error[field.id] ? 'react-select-error' : ''}
                                {...inputProps} 
                                onChange={(e:any)=>handleChange(e, ind)} 
                                // onInputChange= {(e) => customerDropdownList(e,ind)} 
                                onBlur={(e:any)=>handleBlur(e, ind)}/>
                            {error[field.id] ? 
                            <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
                                <i className="fa-sharp fa-solid fa-circle-exclamation ps-1"></i>
                                <div className="ps-2">
                                    {t(errorMessage)}
                                </div>
                            </div>: null}
                        </Col>
                    }
                    <Col sm={1} className = "icon_col">
                        <span className="tooltipsHide">
                            <OverlayTrigger
                                delay={{ hide: 0, show: 30 }}
                                overlay={(props) => (
                                <Tooltip {...props}>
                                    {t(tooltips)}
                                </Tooltip>
                                )}
                                placement="right"
                                >
                                <span className="bi bi-question-circle questionIcon"></span>
                            </OverlayTrigger>
                        </span>
                    </Col>
                </Row>
            )
        case 'text':
            return(
                <>
                    {
                    (inputProps.id !== "ticketId")? 
                    <Row className="row_text mb-2">
                        <Col sm = {2} className = "ticket_title">
                            <div>
                                <label className="ticket_Label">{t(title)}<span className= {error[field.id]? `text-danger`: `text-primary`}>*</span></label>
                            </div>
                        </Col>
                        <Col md = {6} className= "ticket_sub" id={name}>
                            <div className="ticketField">
                                <input 
                                    type={type} 
                                    name={name} 
                                    placeholder={t(placeholder)}
                                    value ={userformData[formData[ind].name]} 
                                    {...inputProps} 
                                    onChange={(e:any) => handleChange(e, ind)}
                                    onBlur = {(e:any) => handleBlur(e, ind)} 
                                    className= {`form-control ${error[field.id]? `inputTextErr`: ''}`} 
                                    data-testid = "subject"
                                />
                                {error.subject ? 
                                 (<div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
                                    <i className="fa-sharp fa-solid fa-circle-exclamation ps-1"></i>
                                    <div className="ps-2">
                                        {t(error.subject)}
                                    </div>
                                </div>): null}
                            </div>
                        </Col>
                        <Col sm={1} className = "icon_col">
                        <span className="tooltipsHide">
                            <OverlayTrigger
                                delay={{ hide:0, show: 30 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        {t(tooltips)}
                                    </Tooltip>
                                )}
                                placement="right"
                                >
                                <span className="bi bi-question-circle questionIcon"></span>
                            </OverlayTrigger>
                        </span>
                        </Col>
                    </Row> 
                    : 
                    <Row className="row_text mb-2">
                        <Col sm = {2} className = "ticket_title">
                            <div>
                                <label className="ticket_Label">{t(title)}<span className= {error[field.id]? `text-danger`: `text-primary`}>*</span></label>
                            </div>
                        </Col>
                        <Col md = {6} className= "ticket_sub" id={name}>
                            <div className="ticketField">
                                <input type={type} name={name} value = {userformData.Ticket_ID} placeholder={t(placeholder)} {...inputProps} className= "form-control" data-testid = "subject" disabled/>
                                {error[field.id] ? 
                                 <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
                                    <i className="fa-sharp fa-solid fa-circle-exclamation ps-1"></i>
                                    <div className="ps-2">
                                        {t(errorMessage)}
                                    </div>
                                </div>: null}
                            </div>
                        </Col>
                        <Col sm={1} className = "icon_col">
                            <OverlayTrigger
                                delay={{ hide:0, show: 30 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        {t(tooltips)}
                                    </Tooltip>
                                )}
                                placement="right"
                                >
                                <span className="bi bi-question-circle questionIcon"></span>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    }
                </>
            )
        case 'radio':
            return(
                <Row>
                    <Col sm = {2} className= "ticket_title pe-1">
                        <label className="ticket_Label">{t(title)}<span className= {error[field.id]? `text-danger`: `text-primary`}>*</span></label>
                    </Col>
                    <Col md = {6} className= "fileField">
                        <Row>
                            <Col id={name}>
                                {
                                radioOption.map((radioVal:any, index:any) => 
                                    <span key={index}>
                                        {
                                        (index === 0)?
                                        <span>
                                            <input type={type} name={name} {...inputProps}     value = {radioVal.field_value} checked= {radioVal.field_value === value} onChange={(e:any) => handleChange(e, ind)} onBlur = {(e:any) => {handleBlur(e, ind)}} className="form-check-input me-3"/>
                                            <label className="form-check-label ticket_Label"><b>{t(radioVal.title)}</b></label>
                                        </span>:
                                        <span>
                                            <input type={type} name={name} {...inputProps} value = {radioVal.field_value} checked= {radioVal.field_value === value} onChange={ (e:any) => handleChange(e, ind)} onBlur = {(e:any) => {handleBlur(e, ind)}} className="form-check-input me-3 ms-3"/>
                                            <label className="form-check-label ticket_Label"><b>{t(radioVal.title)}</b></label>
                                        </span>
                                        }
                                    </span>
                                )
                                }
                               <div>{error[field.id] ? 
                                <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
                                    <i className="fa-sharp fa-solid fa-circle-exclamation ps-1"></i>
                                    <div className="ps-2">
                                        {t(errorMessage)}
                                    </div>
                                </div>: null}</div>
                            </Col>
                            <Col sm={2} className="tooltipsHide" >
                            <span>
                                <OverlayTrigger
                                    delay={{ hide:0, show: 30 }}
                                    overlay={(props) => (
                                        <Tooltip {...props}>
                                            {t(tooltips)}
                                        </Tooltip>
                                    )}
                                    placement="right"
                                    >
                                    <span className="bi bi-question-circle questionIcon"></span>
                                </OverlayTrigger>
                            </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )
        case 'file':
            return(
                <Row className="pt-2 mainFileContainer">
                    <Col sm={2} className = "ticket_title"><label className="ticket_Label">{t(title)}</label></Col>
                    <Col md= {6}>
                        <FileUploader 
                        allowedExtensions={allowedExtensions} 
                        maxFileSize={`${MaxFileSize * 1024 * 1024}`} 
                        uploadedFiles = {uploadedFiles} 
                        fileError= {fileError} 
                        handleFileUpload = {handleFileUpload} 
                        handleFileDeletion = {handleFileDeletion}
                        progress = {progress}/>
                    </Col>
                    <Col sm={3} className="carouselContainer">
                        {
                            (filterImage.length > 0) && 
                            <Carousel prevIcon={prevIcon} nextIcon={nextIcon}>
                                {
                                    filterImage.map((fileItem:any) => 
                                    <Carousel.Item key = {fileItem.id}>
                                       <div>
                                            <p style={{fontSize: "12px", textAlign: "center", fontWeight: "bold", background: "black", color: "white"}}>{fileItem.name}</p>
                                            <img
                                            className="d-block w-100"
                                            src= {fileItem.base64}
                                            alt= {fileItem.name}
                                            height= "100px"
                                            />
                                       </div>
                                    </Carousel.Item>
                                    )
                                }
                            </Carousel>
                        }
                    </Col>
                </Row>
            );
        case "textarea":
            return (
                <Row className="row_text mt-2">
                    <Col className="ticket_title" id={name}>
                        <label className="ticket_Label">
                        {t(title)}
                        <span className= {error[field.id]? `text-danger`: `text-primary`}>*</span>
                        </label>
                    </Col>
                    <Col md={12} style= {{marginLeft: "-3px", zIndex: "0", height: "330px"}} className="editorConatiner">
                        <Editor 
                        handleEdior = {handleEdior} 
                        validateemail = {validateemail} 
                        userformData= {userformData} 
                        error = {error}
                        field = {field}
                        />
                        {(error[field.id])?
                         <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
                            <i className="fa-sharp fa-solid fa-circle-exclamation ps-1"></i>
                            <div className="ps-2">
                                {t(errorMessage)}
                            </div>
                        </div>: null}
                    </Col>
                </Row>
              );
        default:
            return null;
    }
}
export default Element;