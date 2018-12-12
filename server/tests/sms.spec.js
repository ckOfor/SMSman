import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models';

const superRequest = request.agent(app);
const expect = chai.expect;

let testSenderContact;
let testReceiverContact;
let mySms1;

describe('CONTACT API', () => {
  try {
    before((done) => {
      db.Contact.create({
        username: 'Chinedu Ofor',
        phoneNumber: '070302936448346834'
      })
      .then((contact) => {
        setTimeout(() => {
          testSenderContact = contact.dataValues;
          // console.log(testSenderContact)
  
          db.Contact.create({
            username: 'Favour Eze',
            phoneNumber: '07030293642323236'
          })
          .then((contact2) => {
            setTimeout(() => {
              testReceiverContact = contact2.dataValues;

              db.Sms.create({
                contactId: testSenderContact.id,
                senderId: testSenderContact.id,
                message: 'Hello where are you ?',
                smsStatus: 'delivered',
                phoneNumber: testReceiverContact.phoneNumber
              })
              .then((message) => {
                setTimeout(() => {
                  mySms1 = message.dataValues
                  done()
                }, 1500)
              })
            }, 1500)
          })
        }, 1500)
      })
      .catch(err => {
        console.log(err.message)
        console.log(err)
        done()
      })
      
    });
  } catch (e) {
    console.log(e)
  }
  
  try {
    after((done) => {
      db.Contact.destroy({ where: { phoneNumber: '070302936448346834' } })
      .then(() => {
        db.Contact.destroy({ where: { phoneNumber: '07030293642323236' } })
        .then(done())
        .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    });
  } catch (e) {
    console.log(e)
  }
  
  
  describe('CREATE Sms POST /api/sms', () => {
  
    it('it should create send an sms successfully', (done) => {
      console.log()
      superRequest.post(`/api/sms/${testSenderContact.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        message: 'I heart you',
        phoneNumber: testReceiverContact.phoneNumber
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(201);
        expect(res.body.senderId).to.equal(testSenderContact.id.toString());
        expect(res.body.message).to.equal('I heart you');
        expect(res.body.smsStatus).to.equal('delivered');
        done();
      });
    });
  
    it('it should not create send an when I send to myself', (done) => {
      console.log()
      superRequest.post(`/api/sms/${testSenderContact.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        message: 'I love you',
        phoneNumber: testSenderContact.phoneNumber
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('You cannot send a message to yourself');
        done();
      });
    });
  
    it('it should not create send an when I send to wrong id', (done) => {
      console.log()
      superRequest.post(`/api/sms/${40}`)
      .set({ 'content-type': 'application/json' })
      .send({
        message: 'I love you',
        phoneNumber: testSenderContact.phoneNumber
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Sender Not Found');
        done();
      });
    });
  
    it('it should not create send an when I send enter wrong phone number', (done) => {
      console.log()
      superRequest.post(`/api/sms/${testSenderContact.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        message: 'I love you',
        phoneNumber: '0804334234343'
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Recipient contact not found');
        done();
      });
    });
  
    it('it should not create send an when I send enter an empty message', (done) => {
      console.log()
      superRequest.post(`/api/sms/${testSenderContact.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        message: '',
        phoneNumber: '0804334234343'
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Message cannot be empty');
        done();
      });
    });
  
    it('it should not create send an when I send enter an empty phon number', (done) => {
      console.log()
      superRequest.post(`/api/sms/${testSenderContact.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        message: 'Bubu',
        phoneNumber: ''
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Phone number cannot be empty');
        done();
      });
    });
    
  })
})
