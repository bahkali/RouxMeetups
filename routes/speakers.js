const express = require('express');

const router = express.Router();

const SpeakersService = require('../services/SpeakerService');
const speakerService = new SpeakersService('../data/speakers.json');

module.exports = () => {
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
