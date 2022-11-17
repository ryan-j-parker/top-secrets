const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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

  it('POST /users/sessions should sign in a user', async () => {
    const userData = {
      email: 'user@email.com',
      password: 'passwored12345'
    };
    const testUser = await UserService.create(userData);
    const agent = request.agent(app);
    const res = await (await agent.post('/api/v1/users/sessions')).send(userData);
    expect(res.body).toEqual({ message: 'Signed in successfully', testUser });
  });

  afterAll(() => {
    pool.end();
  });
});
