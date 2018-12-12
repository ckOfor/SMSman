const contactController = require('../controllers').contact;
const smsController = require('../controllers').sms;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Sms API!',
  }));
  
  app.post('/api/sms', contactController.create);
  app.get('/api/sms', contactController.list);
  
  app.post('/api/sms/:contactId/', smsController.create);
};
