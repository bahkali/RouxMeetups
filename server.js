const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');
const cookieSession = require('cookie-session');

const app = express();
const PORT = 3500;

var feedbackService = new FeedbackService('./data/feedback.json');
var speakerService = new SpeakerService('./data/speakers.json');

const mainRoute = require('./routes/index');

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['ksldkjfjslfjls', 'jhjheilsnelofonerf'],
  })
);
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Variable accessible to all template
app.locals.siteName = 'Roux Meetups';
app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    console.log(res.locals);
    return next();
  } catch (error) {
    return next(error);
  }
});
app.use(
  mainRoute({
    speakerService: speakerService,
    feedbackService: feedbackService,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
