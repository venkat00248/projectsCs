import {
    NotFoundError,
    InternalServerError,
    ConflictError,
    InvalidPropertyError,
    UnauthorizedError,
  } from './error.helper';
  
  interface HttpError {
    errmsg: string;
    status: number;
  }
  
  interface HttpResponse {
    headers: { [key: string]: string };
    status: number;
    data: {
      success: boolean;
      errmsg: string;
    };
  }
  
  const makeHttpError = ({ errmsg, status, ...error }: HttpError): HttpResponse => {
    return Object.freeze({
      headers: {
        'Content-Type': 'application/json',
      },
      status,
      data: {
        success: false,
        errmsg: errmsg,
      },
    });
  };
  
  const errorHandler = (error: Error): HttpResponse => {
    console.log(error, 'error');
  
    if (error instanceof ConflictError) {
      return makeHttpError({
        errmsg: error.message,
        status: 409,
      });
    }
  
    if (error instanceof InvalidPropertyError) {
      return makeHttpError({
        errmsg: error.message,
        status: 400,
      });
    }
  
    if (error instanceof NotFoundError) {
      return makeHttpError({
        errmsg: error.message,
        status: 404,
      });
    }
  
    if (error instanceof InternalServerError) {
      return makeHttpError({
        errmsg: error.message,
        status: 500,
      });
    }
  
    if (error instanceof UnauthorizedError) {
      return makeHttpError({
        errmsg: error.message,
        status: 401,
      });
    }
  
    return makeHttpError({
      errmsg: 'Internal server error',
      status: 500,
    });
  };
  
  export { makeHttpError, errorHandler };
  