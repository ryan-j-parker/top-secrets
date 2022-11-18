const { Router } = require('express');
const Secret = require('../models/Secret');
const authenticate = require('../middleware/authenticate');

module.exports = Router().post('/', [authenticate], async (req, res, next) => {
  try {
    res.send(await Secret.create(req.body));
  } catch (e) {
    next(e);
  }
});
