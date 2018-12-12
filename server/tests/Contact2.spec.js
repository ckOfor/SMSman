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
  
  describe('GET Contact GET /api/contact', () => {
    // it('it should get all contacts successfully', (done) => {
    //   superRequest.get('/api/contact')
    //   .set({ 'content-type': 'application/json' })
    //   .end((err, res) => {
    //     console.log(res.body)
    //     expect(res.status).to.equal(200);
    //     done();
    //   });
    // });
  })
})
