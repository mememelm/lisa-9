const express = require('express');
const cors = require("cors");

//const praviteRouter = require('./private');
const publicRouter = require('./public');

const router = express.Router();


router.options(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

router.options('*', cors())


router.use('/', publicRouter);

module.exports = router;