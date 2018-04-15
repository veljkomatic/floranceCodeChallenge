const request = require('supertest');
const expect = require('expect');

const app = require('../../src/config/app');

describe('POST /issues', () => {
    it('should create a new policies', (done) => {
        request(app)
            .post('/issues')
            .field('title', 'Health')
            .field('content', 'Health care')
            .attach('file', `${__dirname}/file.jpg`)
            // .attach('file', `${__dirname}/file.jpg`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeTruthy();
            })
            .end(done);
    });
    it('should get all issues', (done) => {
        request(app)
            .get('/issues')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});