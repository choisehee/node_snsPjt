// var express = require('express');
// const path = require('path');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//  // res.render('index', { title: 'hi' });
//
//   res.sendFile(path.join(__dirname,'/연결할.html'))
//
// });
//
// module.exports = router;

const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('sequelize', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;



