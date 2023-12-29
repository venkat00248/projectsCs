import { Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "./createTicket.scss";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useTranslation } from "react-i18next";

interface FileUploaderProps {
  allowedExtensions: any; // An array of allowed file extensions, e.g., ['jpg', 'png']
  maxFileSize: any; // The maximum file size in bytes
  uploadedFiles: any; // An array of uploaded files
  fileError: any; // A message for file-related errors, or null if no error
  handleFileUpload: any; // Function to handle file uploads
  handleFileDeletion: any; // Function to delete an uploaded file
  progress: any; // A value indicating the progress of file upload (if applicable)
  flag?: any;
  value?: any
}
const FileUploader: React.FC<FileUploaderProps> = ({
  allowedExtensions,
  maxFileSize,
  uploadedFiles,
  fileError,
  handleFileUpload,
  handleFileDeletion,
  progress, flag, value }: any) => {
  // const acceptTypes = allowedExtensions.map((ext:any) => `.${ext}`).join(",");
  // const acceptString = acceptTypes.length > 0 ? acceptTypes : undefined;
  const isImageFile = (extension: string) => ["jpg", "jpeg", "png", "gif"].includes(extension);
  const isDocFile = (extension: string) => ["doc", "docx"].includes(extension);
  const isPdfFile = (extension: string) => ["pdf"].includes(extension);
  const isXlsFile = (extension: string) => ["xls"].includes(extension);
  const isXlsxFile = (extension: string) => ["xlsx"].includes(extension);
  const isCsvFile = (extension: string) => ["csv"].includes(extension);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFileUpload(acceptedFiles)
    },
    accept: allowedExtensions,
    maxSize: maxFileSize,
  });
  const { t } = useTranslation();

  return (
    <div>
      <div {...getRootProps()} className={`Drog_Drop_Container ${fileError ? `fileErrorComp` : ''}`}>
        <input {...getInputProps()} />
        <div className="w-100">
          <span className="bi bi-cloud-upload" style={{ fontSize: "25px", color: "blue", margin: "5px" }}></span>{t("Drag and drop files, or click to select files")}
        </div>
      </div>
      {
        (fileError) ?
          <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
            <span className="me-2">
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
            </span>
            <div className="pt-0 w-100">
              {t("File required with less than or equal 2MB only")} (&#8804;2MB)
            </div>
          </div> :
          (fileError === false && flag)?
          <div className="alert alert-danger d-flex align-items-center p-1 m-0" role="alert">
            <span className="me-2">
              <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
            </span>
            <div className="pt-0 w-100">
            {t(`${value} attachment is allowed with less or equal 2MB`)} (&#8804;2MB)
            </div>
          </div>
          :
          <div>
            <span className="text-primary me-2">
              <i className="bi bi-info-circle-fill ps-1"></i>
            </span>
            <span className="fst-italic" style={{ fontSize: "12px" }}>
              {t("File size should be less than or equal 2MB only")} (&#8804;2MB)
            </span>
          </div>
      }
      <div className="previewContainer">
        <div className="previewChild">
          {uploadedFiles.map((file: any) => (
            <Row key={file.id} className="File_preview mb-1">
              <Col md={1}>
                {isImageFile(file.extension) && (
                  <span>
                    <span className="bi bi-image-fill" style={{ fontSize: "25px" }}></span>
                  </span>
                )}
                {isDocFile(file.extension) && (
                  <span className="bi bi-filetype-doc" style={{ fontSize: "25px" }}></span>
                )}
                {isPdfFile(file.extension) && (
                  <span className="bi bi-filetype-pdf" style={{ fontSize: "25px" }}></span>
                )}
                {isXlsFile(file.extension) && (
                  <span className="bi bi-filetype-xls" style={{ fontSize: "25px" }}></span>
                )}
                {isXlsxFile(file.extension) && (
                  <span className="bi bi-filetype-xlsx" style={{ fontSize: "25px" }}></span>
                )}
                {isCsvFile(file.extension) && (
                  <span className="bi bi-filetype-csv" style={{ fontSize: "25px" }}></span>
                )}
              </Col>
              <Col md={9} style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>{file.name}</Col>
              <Col md={2} className="File_Btn">
                {/* {!isImageFile(file.extension) && !isDocumentFile(file.extension) && (
                <a href={file.base64} download={file.name} className="btn btn-primary">
                  <span className="bi bi-download"></span>
                </a>
              )} */}
                <button onClick={() => handleFileDeletion(file.id)} className="file_Btn_Close">
                  <span className="bi bi-x"></span>
                </button>
              </Col>
              <div id="fileProgress" style={{ paddingLeft: "0px", paddingRight: "0px" }}><ProgressBar now={progress[file.id]} label={`${progress[file.id]}%`} className="custom-progress-bar-label" /></div>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
