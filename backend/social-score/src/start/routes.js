const express = require('express');

const review = require('../routes/review');
const auth = require('../routes/auth');
const main = require('../routes/main');

module.exports = function(app) {
  app.use(express.json());
  
  app.use('/review', review);
  app.use('/auth', auth);
  app.use('/', main);
}