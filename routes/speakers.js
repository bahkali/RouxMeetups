const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const speakerService = params.speakerService;
  // console.log('Endpoint');
  // console.log(params.speakerService);

  router.route('/').get(async (req, res, next) => {
    try {
      const speakers = await speakerService.getList();
      res.render('layout', {
        pageTitle: 'speakers Page',
        template: 'speakers',
        speakers,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.route('/:shortname').get((req, res, next) => {
    res.render('layout', {
      pageTitle: 'speakers Page',
      template: 'speakers',
    });
  });
  return router;
};
