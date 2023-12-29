import { useState, useEffect } from "react";
import Select from "react-select";
import errors from "./emailerrors.json";
import { config } from "../../config/config";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Communication.scss";
import { EmailValidation } from "../Utils/EmailValidation";
import { Col, Row, Carousel } from "react-bootstrap";
import FileUploader from "./../createTicket/fileUpload";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
export const EmailContents = ({ isForward }: any) => {
  const fromuser: any = sessionStorage.getItem("userDetails");
  const from: any = JSON.parse(fromuser);
  const [fileError, setFileError] = useState(false);
  const [progress, setProgress] = useState({});
  const [uploadedFiles, setUploadedFiles]: any = useState([]);
  const [editor, seteditor]: any = useState();
  const [check, setchecked]: any = useState(false);
  const errorJson: any = errors;
  const allowed_Extension: any = errors[3].allowed_ExtensionObj;
  const isAcceptedFile = (file: File) => {
    const extension: any = file.name.split(".").pop()?.toLowerCase();
    if (!extension) {
      return false;
    }
    if (allowed_Extension?.length > 0 && !allowed_Extension.includes(extension)) {
      setFileError(true)
      return false;
    }
    return true;
  };
  const handleFileDeletion = (file: any) => {
    const updatedFiles = uploadedFiles.filter((f: any) => f.id !== file);
    setUploadedFiles(updatedFiles);
    if (updatedFiles.length === 9) {
      setFileError(false)
    }
  };
  const handleFileUpload = (uplaodFile: any) => {
    if (uplaodFile.length > 1 || uplaodFile.length === 0) {
      setFileError(true);
    } else if (uploadedFiles.length <= 9) {
      setFileError(false)
      for (let i = 0; i < uplaodFile.length && i < 10; i++) {
        const file = uplaodFile[i];
        if (!isAcceptedFile(file)) {
          continue;
        }
        setFileError(false)
        const reader = new FileReader();
        reader.onload = async () => {
          const base64: any = reader.result?.toString();
          const extension = file.name.split(".").pop() || "";
          const id =
            uploadedFiles.length > 0
              ? uploadedFiles[uploadedFiles.length - 1].id + 1
              : 1;
          try {
            const response = await axios.post(`${config.ENV.API_URL}/upload`, { files: { id: id, base64: base64 } }, {
              onUploadProgress: (progressEvent: any) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress({ ...progress, [id]: percentCompleted });
                setUploadedFiles([
                  ...uploadedFiles,
                  { id: id, name: file.name, size: file.size, base64: base64, extension: extension, progress: percentCompleted },
                ]);
              },
            });
          } catch (error) {
            toast.error("File upload service down please try after some try", {
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
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFileError(true)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles, "accefiles");
      handleFileUpload(acceptedFiles)
    },
    accept: allowed_Extension,
    maxFiles: 1,
    maxSize: 2,
  });
  const [emailData, setemailData] = useState({
    from: from?.email_id,
    to: "",
    cc: "",
    description: "",
    macros: false,
    macrosvalue: null
  });
  const filterImage = uploadedFiles.filter((file: any) => ["jpg", "jpeg", "png", "gif"].includes(file.extension));
  const [error, seterror]: any = useState();

  const validateemail = (value: any) => {

    const values: any = value["srcElement"]?.innerText;
    const trimmedStr = values?.replace(/^\s+/, "");
    const editorVal: string = value["srcElement"]?.innerHTML;
    if (editorVal !== "<p><br></p>" || trimmedStr.length > 0) {
      seterror((preStateError: any) => ({
        ...preStateError,
        ["description"]: false,
      }));
    } else {
      seterror((preStateError: any) => ({
        ...preStateError,
        ["description"]: true,
      }));
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (emailData.to === "") {
      seterror((prevError: any) => ({ ...prevError, ["to"]: "To field is required" }));
      return;
    }

    else if (emailData.macros == true && emailData.macrosvalue == null) {
      seterror((prevError: any) => ({ ...prevError, ["macrosvalue"]: "field is required" }));
      return;

    } else if (
      editor?.description == "" ||
      editor?.description == "<p><br></p>"
    ) {
      seterror((prevError: any) => ({ ...prevError, ["description"]: "field is reuired" }));
      return;
    }


  };
  const handleEdior = (val: any) => {
    seteditor((prevStateDetails: any) => ({
      ...prevStateDetails,
      ["description"]: val,
    }));
    seterror((preStateError: any) => ({
      ...preStateError,
      ["description"]: false,
    }));
  };

  const { t } = useTranslation();
  useEffect(() => {

  }, [emailData]);

  const handleBlur = (e: any) => {
    const { value, name } = e?.target;
    if (value === "") {
      errorJson.map((errorjson: any) => {
        if (name == errorjson.id) {
          seterror({ ...error, [name]: errorjson.error });
        }
      });
      console.log(error);
    }
  };
  const handleBlurmacros = (e: any) => {
    if (emailData.macrosvalue == null) {
      seterror((prevStateDetails: any) => ({
        ...prevStateDetails,
        ["macrosvalue"]: "field is required",
      }));
    } else {
      seterror((prevStateDetails: any) => ({
        ...prevStateDetails,
        ["macrosvalue"]: "",
      }));
    }
  }
  const handleChange = (e: any) => {
    const { value, name } = e?.target;
    if (value !== "") {
      seterror({ ...error, [name]: "" });
    }
    const valid = EmailValidation(value);
    setemailData({
      ...emailData,
      [name]: value,
    });
    if (!valid) {
      seterror({ ...error, [name]: "enter valid email address" })
    }
    else {
      seterror({ ...error, [name]: "" })
    }
  };


  const handleclear = (e: any) => {
    e.preventDefault();
    setFileError(false);
    setUploadedFiles([]);
    seteditor("");
    setchecked(false);
    seterror();
    setemailData({
      from: from?.email_id,
      to: "",
      cc: "",
      description: "",
      macros: false,
      macrosvalue: null
    });
  };
  const handleCheck = (e: any) => {
    const { checked } = e.target;
    setchecked(checked);
    setemailData({ ...emailData, macros: checked });
    seterror((prevStateDetails: any) => ({
      ...prevStateDetails,
      ["macrosvalue"]: "",
    }));
    setemailData((prevStateDetails: any) => ({
      ...prevStateDetails,
      ["macrosvalue"]: null,
    }));
  };
  const options = [
    { label: "Virtual and storage", value: "virtual and storage" },
    { label: "Storage", value: "storage" },
    { label: "Testing", value: "Testing" },
  ];
  return (
    <form className="m-2">

      <Row>
        <Col>
          <h4>{isForward === true ? t("Forward Email") : t("Send Email")}</h4>
        </Col>
      </Row>
      <div className="header_line"
        style={{ borderTop: "1px solid lightgrey", margin: "5px 0px" }}
      ></div>
      <br />
      <Row>
        <Col>
          <Row>
            <Col xs={2} ><label className="form-label">{t("From")}
              <span className="text-danger">*</span></label></Col>
            <Col xs={7}>
              <input
                className="form-control"
                id="staticEmail"
                type="text"
                name={"from"}
                value={emailData.from}
                placeholder={from?.email_id}
                disabled
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col xs={2}> <label className="form-label">{t("To")}
              <span className="text-danger">*</span></label>
            </Col>
            <Col xs={7}>
              <input
                type="text"
                name="to"
                className="form-control"
                value={emailData.to}
                onChange={(e: any) => handleChange(e)}
                id="To"
                onBlur={handleBlur}
              />
              {error?.to && <span className="alert alert-danger d-flex align-items-center p-1 m-0" >
                <i className="fa-sharp fa-solid fa-circle-exclamation  p-1"></i>
                {t(error.to)}</span>}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col xs={2} ><label htmlFor="CC" className="col-sm-6 col-form-label">{t("CC")}</label>
            </Col>
            <Col xs={7}>
              <input
                type="text"
                name="cc"
                onChange={(e: any) => handleChange(e)}
                className="form-control mt-3"
                id="CC"
                value={emailData.cc}
                onBlur={handleBlur}
              />
              {error?.cc && <span className="alert alert-danger d-flex align-items-center p-1 m-0" >
                <i className="fa-sharp fa-solid fa-circle-exclamation p-1"></i>
                {t(error.cc)}</span>}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col xs={3} style={{ width: "101px" }}>  <input
              className="form-check-input mt-3"
              type="checkbox"
              name="macros"
              checked={check}
              value={check}
              onChange={handleCheck}
              id="defaultCheck1"
            />
              <label htmlFor="defaultCheck1" className="mt-2 p-2 form-label">
                {t("Macros")}
              </label>
            </Col>
            <Col xs={7} style={{ paddingRight: "22px", zIndex: "2000", paddingLeft: "0px" }}>
              {check && <Select className="mt-2"
                placeholder={t("Select...")}
                name="macrosvalue"
                options={options}
                onBlur={(e: any) => { handleBlurmacros(e) }}
                onChange={(e: any) => setemailData({ ...emailData, macrosvalue: e })}
              />}
              {error?.macrosvalue && <span className="alert alert-danger d-flex align-items-center p-1 m-0 " >
                <i className="fa-sharp fa-solid fa-circle-exclamation p-1"></i>
                {t("Macros field is required")}</span>}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="content" className="col-sm-2 col-form-label">
            {t("Content")}
            <span className="text-danger">*</span>
          </label>
        </Col>
      </Row>
      <Row className="p-2" >
        <div className="sun-editor-main" style={{ padding: "0px", width: "87%" }}>
          <SunEditor
            height="200"
            name="description"
            setDefaultStyle="font-family:Arial;color:black;font-size:60pxl"
            onBlur={(e) => validateemail(e)}
            setContents={editor}
            onChange={(e) => handleEdior(e)}
            setOptions={{
              mediaAutoSelect: false,
              showPathLabel: false,
              buttonList: [
                [
                  "bold",
                  "underline",
                  "italic",
                  "blockquote",
                  "align",
                  "font",
                  "fontColor",
                  "hiliteColor",
                  "horizontalRule",
                  "paragraphStyle",
                  "lineHeight",
                  "list",
                  "formatBlock",
                  "fontSize",
                  "table",
                  "textStyle",
                  "image",
                  "link",
                  "video",
                  "audio",
                  "preview",
                ]

              ]

            }} />

        </div>
        {error?.description && <span className="alert alert-danger d-flex align-items-center p-1 m-0 " style={{ width: "87%" }} >
          <i className="fa-sharp fa-solid fa-circle-exclamation p-1"></i>
          {t("Description Field is required")}</span>}
      </Row>
      <Row className="pt-2 ">
        <Col xs={3} >
          <label htmlFor="attachment" className="col-form-label m-2" >
            {t("Attachment")}
          </label>
        </Col>
      </Row>
      <Row>
        <Col md={4} style={{ height: "54px" }}>
          <FileUploader
            allowedExtensions={allowed_Extension}
            maxFileSize={`${2 * 1024 * 1024}`}
            uploadedFiles={uploadedFiles}
            fileError={fileError}
            handleFileUpload={handleFileUpload}
            handleFileDeletion={handleFileDeletion}
            progress={progress} />
        </Col>
        <Col sm={3} >
          <Carousel style={{ position: "absolute", top: "640px", right: "250px" }}>
            {
              filterImage.map((fileItem: any) =>
                <Carousel.Item key={fileItem.id}>
                  <div>
                    <p style={{ fontSize: "12px", textAlign: "center", fontWeight: "bold", background: "black", color: "white" }}>{fileItem.name}</p>
                    <img
                      className="d-block w-100"
                      src={fileItem.base64}
                      alt={fileItem.name}
                      height="100px"
                    />
                  </div>
                </Carousel.Item>
              )
            }
          </Carousel>
        </Col>
      </Row>
      <Row>
        <div className="header_line"
          style={{ borderTop: "1px solid lightgrey", marginTop: "100px" }}
        ></div>
        <Col className="m-2 d-flex justify-content-end" style={{ gap: "10px" }}>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            {t("Send")}
          </button>
          <button
            className="btn btn-secondary  sm-10"
            onClick={(e: any) => handleclear(e)}
          >
            {t("Clear")}
          </button>
        </Col>
      </Row>
    </form>
  );
};
export default EmailContents;
