import { jest, describe, it, expect } from '@jest/globals';
import logger from "../src/config/logger.config";

describe('Logger Configuration', () => {
    it('should create a logger object', () => {
        expect(logger).toBeDefined();
        expect(logger.format).toBeDefined();
        expect(logger.transports).toHaveLength(1);
        expect(logger.transports[0].level).toBe('error');
    });

    it('should call the logger.error() function with the expected arguments', () => {
        const errorMessage = 'This is an error message';
        const mockErrorLog = jest.spyOn(logger, 'error');
      
        logger.error(errorMessage, {});
      
        expect(mockErrorLog).toHaveBeenCalledWith(errorMessage, expect.objectContaining({}));
      });
      

});
