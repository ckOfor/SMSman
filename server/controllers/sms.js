const Sms = require('../models').Sms;
const Contact = require('../models').Contact;
const helper = require('../helpers').helper;

module.exports = {
  create(req, res) {
    if(helper.verifySendMessageFields(req, res)) {
      return Contact
      .findById(req.params.contactId)
      .then(sender => {
        if (!sender) {
          return res.status(404).send({
            message: 'Sender Not Found',
          });
        }
        return Contact
        .find({ where: { phoneNumber: req.body.phoneNumber } })
        .then(recipientContact => {
          let receiverId = recipientContact.dataValues.id
          let sender = req.params.contactId
          
          if (receiverId.toString() === sender.toString()) {
            res.status(400).send({ message: 'You cannot send a message to yourself' })
          } else {
            // res.status(400).send({ message: 'Continue' })
            if (!recipientContact) {
              return res.status(404).send({ message: 'Recipient contact not found' });
            } else {
              // res.status(404).send({ message: 'Recipient found' });
              return Sms
              .create({
                contactId: req.params.contactId,
                senderId: req.params.contactId,
                message: req.body.message,
                smsStatus: 'delivered',
                phoneNumber: req.body.phoneNumber
              })
              .then(sms => {
                // res.status(201).send(sms)
                // console.log(sms)
                return Sms
                .create({
                  contactId: receiverId,
                  senderId: req.params.contactId,
                  message: req.body.message,
                  smsStatus: 'received',
                  phoneNumber: req.body.phoneNumber
                })
                .then(sms2 => {
                  // res.status(201).send(sms2)
                  res.status(201).send(sms)
                  // console.log(sms)
                })
                .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
            }
          }
        })
        .catch(error => res.status(400).send({ message: 'Recipient contact not found' }));
      })
      .catch(error => {
        console.log(error.message)
        res.status(400).send(error)
      });
    }
  },
};
