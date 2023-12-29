import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { ErrorHandler } from "./ErrorHandler";
import { config } from "../config/config";

const errorService: any = new ErrorHandler(config);
let fallbackErrors: any = [];
interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  source?: string;
}
export enum EnumContentType {
  JSON = "application/json",
  XML = "application/xml",
  FORM = "application/x-www-form-urlencoded",
}
export const configuration = {
  configuration: config,
};
console.log(configuration.configuration);
class HttpApiService {
  private _axiosInstance: AxiosInstance | undefined;
  private _baseURL: string;
  private _token: string | null;

  constructor(baseURL: string) {
    this._baseURL = baseURL;
    this._token = null;
    this.createAxiosInstance();
  }

  private defaultOptions = (): any => {
    // Set the AUTH token for any request

    const authHttpHeader = "Bearer token"; // Token goes here
    this._token = authHttpHeader;

    const options = {
      baseURL: this._baseURL,
      // withCredentials: true, // Window Authentification
      headers: {
        Accept: "application/json",
        // 'Authorization': `${authHttpHeader}` // OAuth Authetification
      },
    };
    return options;
  };

  /**
   * Create instance
   */
  private createAxiosInstance() {
    this._axiosInstance = axios.create(this.defaultOptions());

    // this.checkAutorization()

    // Add a request interceptor
    this._axiosInstance.interceptors.request.use(
      (config) => config,
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this._axiosInstance.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  protected getToken() {
    return this._token;
  }

  protected get(endpoint: string, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      // console.log(`get :: `, conf);
      this._axiosInstance!.get(`${endpoint}`, conf)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  protected create(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return this.post(endpoint, data, conf);
  }

  protected post(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!.post(`${endpoint}`, data, conf)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  protected update(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!.put(`${endpoint}`, data, conf)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  protected delete(endpoint: string, id: any, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!.delete(`${endpoint}/${id}`, conf)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  protected deleteFile(endpoint: string, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!.delete(`${endpoint}`, conf)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  protected uploadFile(
    endpoint: string,
    data: FormData,
    conf = {}
  ): AxiosPromise {
    return this.post(endpoint, data, conf);
  }

  protected downloadFile(endpoint: string): AxiosPromise {
    const conf = {
      responseType: "blob", // important
      timeout: 30000,
    };
    return this.get(endpoint, conf);
  }

  handleSuccess(response: AxiosResponse) {
    const sessionErrors = sessionStorage.getItem("fallbackerror");
    const fallbackErrors = sessionErrors ? JSON.parse(sessionErrors) : [];
    const resUrl: any = response?.config?.url;
    const updatedErrors = fallbackErrors.filter(
      (error: any) => error.url !== resUrl
    );
    sessionStorage.setItem("fallbackerror", JSON.stringify(updatedErrors));
    const customResponse: CustomAxiosResponse = response;
    customResponse.source = "handleSuccess";

    sessionStorage.removeItem("errors");
    sessionStorage.removeItem("errorsdefault");
    return customResponse;
  }

  handleError = (err: any) => {
    let errors: any;
    // const localErrorMessage: any = errorService.errorHandle(
    //   err?.request?.status ? err?.request?.status : err?.response?.status
    // );
    const errURL = errorService.endPointURL(err?.config?.url);
    const fallbackErrorMessage = errorService.fallbackError(
      errURL
    );
    // console.log(localErrorMessage, fallbackErrorMessage, "....", err.config.url)
    // sessionStorage.removeItem("errorsdefault");
    // const statusstring: any = err?.request?.status ?? err?.response?.status;
    // const errorcodes: any = Object.keys(config.API.ERROR_CODES);
    // const statuskey = statusstring?.toString();
    // const status: any = errorcodes.filter((item: any) => {
    //   if (item == statuskey) {
    //     return statuskey;
    //   }
    // });
    // errors = { ...errors, [status]: localErrorMessage };
    const sessionErrors = sessionStorage.getItem("fallbackerror");
    if (sessionErrors) {
      fallbackErrors = JSON.parse(sessionErrors) || [];
    }
    const isDuplicate = fallbackErrors.some((error:any) => error.errorMsg === fallbackErrorMessage);
    // console.log(`HttpService::Error : ${err}`);
    if (!isDuplicate) { 
      fallbackErrors?.push({
        url: errURL,
        errorMsg: fallbackErrorMessage,
        fallError: true,
      });
    }
    sessionStorage.setItem("fallbackerror", JSON.stringify(fallbackErrors));
    // if (!err.response) {
    //   console.log(`Network error: ${err}`);
    //   sessionStorage.setItem("errors", JSON.stringify(errors));
    //   // this.redirectTo(window.document, "/#/errors");
    // } else {
    //   if (err.response !== undefined) {
    //     console.log(`HttpService::Error : ${err}`);
    //     const storedErrors = sessionStorage.getItem("errors");
    //     if (storedErrors) {
    //       errors = JSON.parse(storedErrors);
    //     }
    //     errors = { ...errors, [status]: localErrorMessage };
    //     sessionStorage.setItem("errors", JSON.stringify(errors));
    //     // this.redirectTo(window.document, "/#/errors");
    //     return localErrorMessage;
    //   }
    // }
    return fallbackErrors;
  };

  redirectTo = (document: any, path: string) => {
    document.location = path;
  };
}

export default HttpApiService;
