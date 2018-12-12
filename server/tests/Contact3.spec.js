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
        phoneNumber: '4323232323'
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
  
  // describe('PUT Contact GET /api/contact', () => {
  //   it('it should edit a single contact successfully', (done) => {
  //     superRequest.put(`/api/contact/${testUserContact.id}/name`)
  //     .set({ 'content-type': 'application/json' })
  //     .send({
  //       username: 'Nath Ofor',
  //       phoneNumber: '07039421343'
  //     })
  //     .end((err, res) => {
  //       console.log(res.body)
  //       expect(res.status).to.equal(200);
  //       // expect(res.body.status).to.equal('success');
  //       // expect(res.body.data.message).to
  //       // .equal('Contact successfully updated');
  //       // expect(res.body.data.contact.name).to.equal('Owonikoko Hajarat');
  //       // expect(res.body.data.contact.phoneNumber).to.equal('07083445523');
  //       done();
  //     });
  //   });
  // })
})
