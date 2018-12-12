import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models';

const superRequest = request.agent(app);
const expect = chai.expect;

let testUserContact;

describe('CONTACT API', () => {
  try {
    before((done) => {
      db.Contact.create({
        username: 'Chinedu Ofor',
        phoneNumber: '07030293645'
      })
      .then((contact) => {
        setTimeout(() => {
          testUserContact = contact.dataValues;
          done()
        }, 1500)
      })
        .catch(err => {
        console.log(err)
        done()
      })
    });
  } catch (e) {
    console.log(e)
  }
  
  try {
    after((done) => {
      db.Contact.destroy({ where: {} })
      .then(done())
      .catch((error) => {
        console.log(error)
      })
    });
  } catch (e) {
    console.log(e)
  }
  
  
  describe('CREATE Contact POST /api/contact', () => {

    it('it should create a new contact with the complete data', (done) => {
      superRequest.post('/api/contact')
      .set({ 'content-type': 'application/json' })
      .send({
        username: 'Chidinma Ofor',
        phoneNumber: '08064026851'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Chidinma Ofor');
        expect(res.body.phoneNumber).to.equal('08064026851');
        done();
      });
    });

    it('it should not create a contact with the same phoneNumber', (done) => {
      superRequest.post('/api/contact')
      .set({ 'content-type': 'application/json' })
      .send({
        username: 'Nath Ofor',
        phoneNumber: testUserContact.phoneNumber
      })
      .end((err, res) => {
        let errorMessage, errorType;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
          errorType = res.body.errors[key].type;
        })
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('SequelizeUniqueConstraintError');
        expect(errorMessage).to.equal('phoneNumber must be unique');
        expect(errorType).to.equal('unique violation');
        done();
      });
    });
    //
    it('it should not create a contact with empty name', (done) => {
      superRequest.post('/api/contact')
      .set({ 'content-type': 'application/json' })
      .send({
        username: '',
        phoneNumber: '080434342323'
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('username cannot be empty');
        done();
      });
    });

    it('it should not create a contact with empty phone number', (done) => {
      superRequest.post('/api/contact')
      .set({ 'content-type': 'application/json' })
      .send({
        username: 'Ofor',
        phoneNumber: ''
      })
      .end((err, res) => {
        // console.log(res.body.errors)
        // expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Phone number cannot be empty');
        done();
      });
    });
  })
  
  describe('GET Contact GET /api/contact', () => {
    it('it should get all contacts successfully', (done) => {
      superRequest.get('/api/contact')
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(200);
        done();
      });
    });
    
    it('it should get a contact if it exist', (done) => {
      superRequest.get(`/api/contact/${testUserContact.id}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(testUserContact.id);
        expect(res.body.username).to.equal(testUserContact.username);
        expect(res.body.phoneNumber).to.equal(testUserContact.phoneNumber);
        done();
      });
    });
    
    it('it should not get a contact with an id that does not exist', (done) => {
      superRequest.get(`/api/contact/${333}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.body.message).to.equal('Contact Not Found');
        done();
      });
    });
    
  })
  
  describe('PUT Contact GET /api/contact', () => {
    
    it('it should edit a single contact name successfully', (done) => {
      superRequest.put(`/api/contact/${testUserContact.id}/name`)
      .set({ 'content-type': 'application/json' })
      .send({
        username: 'Nath Ofor',
        // phoneNumber: '07039421343'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Nath Ofor');
        expect(res.body.phoneNumber).to.equal(testUserContact.phoneNumber);
        done();
      });
    });
  
    it('it should edit a single contact number successfully', (done) => {
      superRequest.put(`/api/contact/${testUserContact.id}/number`)
      .set({ 'content-type': 'application/json' })
      .send({
        phoneNumber: '070394213'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.username).to.equal('Nath Ofor');
        expect(res.body.phoneNumber).to.equal('070394213');
        done();
      });
    });
  
    it('it should not edit a single contact number if contact does not exist', (done) => {
      superRequest.put(`/api/contact/${13}/name`)
      .set({ 'content-type': 'application/json' })
      .send({
        username: 'Nath Ofor',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Contact Not Found');
        done();
      });
    });
  
    it('it should not edit a single contact number if contact does not exist', (done) => {
      superRequest.put(`/api/contact/${13}/number`)
      .set({ 'content-type': 'application/json' })
      .send({
        phoneNumber: '070394213'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Contact Not Found');
        done();
      });
    });
  })
  
  describe('DELETE Contacts DELETE /api/contact', () => {
    it('it should delete single contact successfully', (done) => {
      superRequest.delete(`/api/contact/${testUserContact.id}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Contact deleted successfully.');
        done();
      });
    });
  
    it('it should fail for Invalid contact', (done) => {
      superRequest.delete(`/api/contact/${13}`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Chinex Ofor',
        phoneNumber: '08037347734'
      })
      .end((err, res) => {
        console.log(res.body)
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Contact not found');
        done();
      });
    });
  })
})
