const request = require('supertest');
const expect = require('expect');

const app = require('../../src/config/app');
const issueFactory = require('../factories/issueFactory');

let issue;

describe('GET /issues', () => {
    it('should get all issues', (done) => {
        request(app)
            .get('/issues')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeTruthy();
                done();
            });
    });

    before(async () => {
        issue = await issueFactory();
    });

    it('should get specific issue', (done) => {
        request(app)
            .get(`/issues/${issue._id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeTruthy();
                expect(res.body.title).toEqual(issue.title);
                expect(res.body.content).toEqual(issue.content);
                expect(JSON.stringify(res.body.filesUrl)).toEqual(JSON.stringify(issue.filesUrl));
                done();
            });
    });

    it('should return 404 of an issue does not exist', (done) => {
        request(app)
            .get('/issues/5ad476a18ca8510fc7640a3e')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(done);
    });
});

describe('POST /issues', () => {
    it('should create a new policies', (done) => {
        request(app)
            .post('/issues')
            .field('title', 'Health')
            .field('content', 'Health care')
            .attach('file', `${__dirname}/file.jpg`)
            .attach('file', `${__dirname}/health.pdf`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeTruthy();
            })
            .end(done);
    });
});
