const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const { agent } = require('supertest');

const testUser = {
  email: 'user@email.com',
  password: 'password12345',
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /users should add a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'user@email.com',
    });
  });

  it('POST /users/sessions should sign in a user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: 'user@email.com',
      password: 'password12345',
    });
    expect(res.status).toEqual(200);
  });

  it('DELETE /users/f1/sessions should sign out a user', async () => {
    await UserService.create({ ...testUser });
    const agent = request.agent(app);
    await agent.post('/api/v1/users/sessions').send({
      email: 'user@email.com',
      password: 'password12345',
    });
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.status).toBe(204);
  });

  afterAll(() => {
    pool.end();
  });
});
