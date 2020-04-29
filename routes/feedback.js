const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const feedbackService = params.feedbackService;

  router.route('/').get(async (req, res, next) => {
    const feedback = await feedbackService.getList();

    res.render('layout', {
      pageTitle: 'Welcome Page',
      template: 'feedback',
      feedback,
    });
  });
  return router;
};
