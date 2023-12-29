class UnauthorizedError extends Error {
    constructor(msg: string) {
      super(msg);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, UnauthorizedError);
      }
    }
  }
  
  class ConflictError extends Error {
    constructor(value: string) {
      super(`${value} must be unique.`);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ConflictError);
      }
    }
  }
  
  class InvalidPropertyError extends Error {
    constructor(msg: string) {
      super(msg);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InvalidPropertyError);
      }
    }
  }
  
  class NotFoundError extends Error {
    constructor(msg: string) {
      super(msg);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NotFoundError);
      }
    }
  }
  
  class InternalServerError extends Error {
    constructor(msg?: string) {
      super(msg || 'Internal server error');
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, InternalServerError);
      }
    }
  }
  
  export {
    InvalidPropertyError,
    ConflictError,
    NotFoundError,
    InternalServerError,
    UnauthorizedError,
  };
  