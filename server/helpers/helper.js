module.exports = {
  verifySendMessageFields(req, res) {
    
    if(req.body.message.length === 0 || req.body.message === undefined) {
      res.status(400).send({ message: 'Message cannot be empty' })
      return next();
    } else if(req.body.phoneNumber.length === 0) {
      res.status(400).send({ message: 'Phone number cannot be empty' })
      return next();
    } else {
      // res.status(400).send('fdfdf')
      return true
    }
  },
  validateContactFields(req, res) {
    console.log(req.body)
    if(req.body.username.length === 0 || req.body.username === undefined) {
       res.status(400).send({ message: 'username cannot be empty' })
      return next();
    } else if(req.body.phoneNumber.length === 0 || req.body.phoneNumber === undefined) {
      res.status(400).send({ message: 'Phone number cannot be empty' })
      return next();
    } else {
      return true
    }
  }
};
