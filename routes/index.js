const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.route('/').get((req, res, next) => {
    //visit count  from cookie
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount += 1;
    console.log(`Number of visits: ${req.session.visitcount}`);
    res.render('layout', {
      pageTitle: 'Welcome Page',
      template: 'index',
    });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
