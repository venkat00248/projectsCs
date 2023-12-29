class CustomError extends Error {
  constructor(message: string, code: Number, details: Object) {
    super(message || String(code));
    // super(message);
    this.code = code;
    this.name = "CustomError";

    if (details) {
      this.details = details;
    }
  }

  code: Number;
  details?: Object;
}

export default CustomError;
