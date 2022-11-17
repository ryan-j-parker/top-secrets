const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.send(user);
  } catch (e) {
    next(e);
  }
})
.post('/sessions', async (req, res, next) => {
    try {
        const user = await UserService.signIn(req.body);
        res
        .cookie(process.env.COOKIE_NAME {

        })
    } catch (e) {
        next(e);
    }
});
