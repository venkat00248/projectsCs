import SunEditor from "suneditor-react";
import "./Editor.scss"; 
// import "bootstrap/dist/css/bootstrap.min.css"; 

const Editor = ({...props}) => { 
    const {handleEdior, validateemail, userformData, error, field} = props;

    return( 
        <div id="templateEditor" className= {`${error[field?.id]? `templateError`: ''}`}> 
            <SunEditor 
                height="200" 
                name="content" 
                setContents={userformData.description} 
                onChange={(e) => handleEdior(e)} 
                onBlur={(emailBody) => validateemail(emailBody)} 
                setDefaultStyle="font-family:Arial;color:black;font-size:60pxl" 
                setOptions={{ 
                    mode:"classic",
                    rtl: false,
                    tabDisable: false,
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
                        ] 
                    ] 
                }}
            /> 
        </div> 
        ); 
            };
export default Editor;