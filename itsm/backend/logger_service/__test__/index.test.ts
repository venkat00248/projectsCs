import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('Server', () => {
  it('should handle requests to the /logger endpoint', async () => {
    const response = await request(app).post('/logger').send({ message: 'This is a log message' });
    expect(response.status).toBe(500);
  });
});
