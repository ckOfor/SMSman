const Contact = require('../models').Contact;
const Sms = require('../models').Sms;

module.exports = {
  create(req, res) {
    console.log(req.body)
    return Contact
    .create({
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
    })
    .then(contact => res.status(201).send(contact))
    .catch(error => {res.status(400).send(error)});
  },
  // list(req, res) {
  //   return Contact
  //   .all()
  //   .then(contact => res.status(200).send(contact))
  //   .catch(error => res.status(400).send(error));
  // },
  list(req, res) {
    return Contact
    .findAll({
      include: [{
        model: Sms,
        as: 'sms',
      }],
    })
    .then(todos => res.status(200).send(todos))
    .catch(error => res.status(400).send(error));
  },
};
