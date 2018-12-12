module.exports = {
  verifySendMessageFields(req, res) {
    console.log(req.body)
    if(req.body.message.length === 0) {
      return res.status(400).send({ message: 'Message cannot be empty' })
    } else if(req.body.phoneNumber.length === 0) {
      return res.status(400).send({ message: 'Phone number cannot be empty' })
    } else {
      // res.status(400).send('fdfdf')
      return true
    }
  },
  findUser(req, res) {
  
  }
};
