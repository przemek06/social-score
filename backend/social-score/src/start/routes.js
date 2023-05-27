const express = require('express');

const goodAct = require('../routes/goodAct');
const crime = require('../routes/crime');
const review = require('../routes/review');
const user = require('../routes/user');
const auth = require('../routes/auth');
const main = require('../routes/main');

module.exports = function(app) {
  app.use(express.json());
  
  app.use('/goodAct', goodAct);
  app.use('/crime', crime);
  app.use('/user', user);
  app.use('/review', review);
  app.use('/auth', auth);
  app.use('/', main);
}