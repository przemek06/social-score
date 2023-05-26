const express = require('express');

const auth = require('../routes/auth');
const main = require('../routes/main');

module.exports = function(app) {
  app.use(express.json());
  
  app.use('/auth', auth);
  app.use('/', main);
}