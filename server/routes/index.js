const contactController = require('../controllers').contact;
const smsController = require('../controllers').sms;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Sms API!',
  }));
  
  app.post('/api/contact', contactController.create);
  app.get('/api/contact', contactController.list);
  app.get('/api/contact/:contactId', contactController.retrieve);
  app.put('/api/contact/:contactId/name', contactController.updateName);
  app.put('/api/contact/:contactId/number', contactController.updateNumber);
  app.delete('/api/contact/:contactId', contactController.destroy);
  
  app.post('/api/sms/:contactId/', smsController.create);
};
