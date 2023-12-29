export class ErrorHandler extends Error {
  config: any;
  constructor(configuration: any) {
    super();
    this.config = configuration;
   
  }

  errorHandle = (err: any) => {
    let ErrorMsg = this.config.API.ERROR_CODES;
    if (ErrorMsg[`${err}`]) {
      return ErrorMsg[`${err}`];
    } else {
      return ErrorMsg["default"];
    }
  };

  endPointURL = (Errurl:any) => {
    const urlPattern = /(https?:\/\/[^?]+)/;
    const extractedURL = Errurl.match(urlPattern);
    const url = extractedURL ? extractedURL[1] : null;
    return url;
  }

  fallbackError = (errUrl:any) => {
    let ErrorMsg = this.config.API_ERROR_MSG;
    if(ErrorMsg[`${errUrl}`]) {
      return ErrorMsg[`${errUrl}`];
    } else {
      return ErrorMsg['default']
    }
  }

}
export default ErrorHandler;
