import { Request } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

import {
  BadRequestError,
  // NotFoundError 
} from "../errors";


export const handleValidationErrors = (req: Request) => {
  const validationErrors: Result<ValidationError> = validationResult(req);

  if (!validationErrors.isEmpty()) {
    throw new BadRequestError(
      "Validation Error",
      400,
      validationErrors.array()
    );
  }
};
