import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models';

const superRequest = request.agent(app);
const expect = chai.expect;

let testUserContacts;

describe('CONTACT API', () => {
  before((done) => {
    db.Contact.create({
      username: 'Chinedu Ofor',
      phoneNumber: '07030296711'
    })
      .then((contact) => {
        console.log('got here')
        testUserContacts = contact.dataValues;
        done();
      })
      .catch((error) => {
        console.log(error)
      })
  });
  
  after((done) => {
    db.Contact.destroy({ where: {} })
    .then(done())
    .catch((error) => {
      console.log(error)
    })
  });
  
  describe('CREATE Contact POST /api/contact', () => {
    
    // it('it should create a new contact with the complete data', (done) => {
    //   superRequest.post('/api/contact')
    //   .set({ 'content-type': 'application/json' })
    //   .send({
    //     username: 'Chidinma Ofor',
    //     phoneNumber: '08064026851'
    //   })
    //   .end((err, res) => {
    //     console.log(res.body)
    //     expect(res.status).to.equal(200);
    //     expect(res.body.status).to.equal('success');
    //     expect(res.body.username).to.equal('Chidinma Ofor');
    //     expect(res.body.phoneNumber).to.equal('08064026851');
    //     done();
    //   });
    //   done();
    // });
  
    // it('it should not create a contact with the same phoneNumber', (done) => {
    //   superRequest.post('/api/contact')
    //   .set({ 'content-type': 'application/json' })
    //   .send({
    //     username: 'Nath Ofor',
    //     phoneNumber: '07030296711'
    //   })
    //   .end((err, res) => {
    //     console.log(res)
    //     expect(res.status).to.equal(400);
    //     expect(res.body.status).to.equal('fail');
    //     expect(res.body.message).to
    //     .equal('phoneNumber must be unique');
    //     expect(res.body.data.type).to.equal('phoneNumber must be unique');
    //   });
    //
    // });
    //
    // it('it should not create a contact with empty name', (done) => {
    //   superRequest.post('/api/contact')
    //   .set({ 'content-type': 'application/json' })
    //   .send({
    //     name: '',
    //     // phoneNumber: '08033024432'
    //   })
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.body.status).to.equal('error');
    //     expect(res.body.data.message).to
    //     .equal('Username cannot be null');
    //     done();
    //   });
    // });
  })
})
