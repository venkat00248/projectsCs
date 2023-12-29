import { Card, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FileAttachment } from './FileAttachment';
import ExtensionInputs from './ExtensionInputs';
import React from 'react';
import "./fileattach.scss";
import { useTranslation } from 'react-i18next';
import { i18n } from '../../Translations/i18n';
export const FileExtension = () => {
    const {t}=useTranslation();
    const [bulkImport, setbulkimport] = useState(false);

    useEffect(()=>{
        i18n.changeLanguage(sessionStorage.langOption);
    },[i18n])
    
    return (
        <div >
            <h3 className="title fileExe-header" style={{borderBottom: "1px solid lightgrey"}}>          
                {t('Manage Extensions')}
            </h3>
            <div className='container-switch d-flex mt-4' >
                <div>
                    <p className=''>{t("Are you sure to add  Bulk Imports?")}</p>  
                </div>
                <div> 
                    <Form.Check type='switch'
                        name="import"
                        // className="mt-5 md-4"
                        checked={bulkImport}
                        onChange={() => setbulkimport(!bulkImport)} 
                    />
                </div>
            </div>
            {/* <div
                style={{ margin: "25px 0px" }}
            ></div> */}
            {!bulkImport &&
                <div style={{ float: "left", width: "100%", margin: "10px 0px" }}>

                    <Card >
                        <Card.Header style={{ backgroundColor: "lightgray" }} className='d-flex'>
                            <h4>{t("File Extension")}</h4>
                            <div className='filetype_info'>

                            <OverlayTrigger
                                delay={{ hide: 0, show: 30 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        {t("File extension: eg: '.pdg, .xlsx etc.'")}
                                    </Tooltip>
                                )}
                                placement="right"
                            >
                                <i className="bi bi-info-circle-fill text-black"></i>
                            </OverlayTrigger>

                            </div>
                        </Card.Header>
                        <Card.Body>
                            <ExtensionInputs />
                        </Card.Body>

                    </Card>
                </div>
            }

            {bulkImport &&
                <div style={{ float: "left", width: "100%", margin: "10px 0px" }}>
                    <Card>
                    <Card.Header style={{ backgroundColor: "lightgray" }} className='d-flex'>
                        <h4>{t("Bulk Imports")}</h4>
                        <div style={{margin: "8px",
    fontSize: "13px"}}>
                            <OverlayTrigger
                            delay={{ hide: 0, show: 30 }}
                            overlay={(props) => (
                            <Tooltip {...props}>
                                {t("Single attachment allowed with less or equal to 2MB")}
                                </Tooltip> 
                                )}placement="right">
                        <i className="bi bi-info-circle-fill text-black"></i>
                        </OverlayTrigger>
                        </div>
                        </Card.Header>
                        <Card.Body>
                            <FileAttachment />

                        </Card.Body>
                    </Card>
                </div>

            }

        </div>
    )
}
export default FileExtension;
