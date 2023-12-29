import logger from "../src/config/logger.config";
import logMessage from "../src/controllers/logger.Controller";
import { jest, describe, it, afterEach, expect } from '@jest/globals';

jest.mock("../src/config/logger.config", () => ({
  error: jest.fn(),
}));

describe("Test cases for logger.Controller.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the logger with the correct arguments", () => {
    const req = {
      body: {
        Type: "error",
        userID: "user123",
        Serivice_name: "serviceName",
        tenantId: "tenant123",
        Payload: { data: "payload" },
        message: "error message",
      },
    };

    const res:any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    logMessage.logMessage(req, res);

    expect(logger.error).toHaveBeenCalledWith("error message", {
      type: "error",
      service: "serviceName",
      payload: { data: "payload" },
      user: "user123",
      tenant: "tenant123",
    });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server not found",
      data: req.body,
    });
  });

  it("should handle missing or empty req.body", () => {
    const req = {
      body: {},
    };

    const res:any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    logMessage.logMessage(req, res);

    expect(logger.error).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid request: empty body",
    });
  });


});
