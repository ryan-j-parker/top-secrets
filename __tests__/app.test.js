const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const { request } = require('express');
// const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('POST /users should add a new user', async () => {
    const testUser = {
      email: 'user@email.com',
      password: 'password12345',
    };
    const res = await request(app).post('/api/v1/users').send(testUser);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'user@email.com',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
