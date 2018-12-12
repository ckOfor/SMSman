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
    .then(contact =>
      res.status(201).send(contact))
    .catch(error => {res.status(400).send(error)});
  },
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
  retrieve(req, res) {
    return Contact
    .findById(req.params.contactId, {
      include: [{
        model: Sms,
        as: 'sms',
      }],
    })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Contact Not Found',
        });
      }
      return res.status(200).send(todo);
    })
    .catch(error => res.status(400).send(error));
  },
  updateName(req, res) {
    if(req.body.username === undefined || req.body.username.length === 0) {
      res.status(400).send({ message: 'Username cannot be null' })
    }
    return Contact
    .findById(req.params.contactId, {
      include: [{
        model: Sms,
        as: 'sms',
      }],
    })
    .then(contact => {
      if (!contact) {
        return res.status(404).send({
          message: 'Contact Not Found',
        });
      }
      return contact
      .update({
        username: req.body.username
      })
      .then((con) => res.status(200).send(con))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
  updateNumber(req, res) {
    if(req.body.phoneNumber === undefined || req.body.phoneNumber.length === 0) {
      res.status(400).send({ message: 'Phone number cannot be null' })
    }
    return Contact
    .findById(req.params.contactId, {
      include: [{
        model: Sms,
        as: 'sms',
      }],
    })
    .then(contact => {
      if (!contact) {
        return res.status(404).send({
          message: 'Contact Not Found',
        });
      }
      return contact
      .update({
        phoneNumber: req.body.phoneNumber
      })
      .then((con) => res.status(200).send(con))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Contact
    .findById(req.params.contactId)
    .then(todo => {
      if (!todo) {
        return res.status(400).send({
          message: 'Contact Not Found',
        });
      }
      return todo
      .destroy()
      .then(() => res.status(200).send({ message: 'Contact deleted successfully.' }))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
