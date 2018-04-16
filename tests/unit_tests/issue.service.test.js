const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
const expect = require('expect');

const Issue = require('../../src/models/Issue');
const underTest = require('../../src/services/issue.service');
const mother = require('./mother');
const e = require('../../src/utils/errorCodes');

sinonStubPromise(sinon);

describe('issueService.issuesGet', () => {
    it('should return all issues', async () => {
        const stub = sinon.stub(Issue, 'find').returnsPromise();
        const issuesResponse = mother.issuesResponse();
        stub.resolves(issuesResponse);
        const issues = await underTest.issuesGet();
        stub.restore();
        expect(issues).toEqual(issuesResponse);
    });
});


describe('issueService.issueGet', () => {
    it('should return specific issue', async () => {
        const stub = sinon.stub(Issue, 'findById').returnsPromise();
        const issueResponse = mother.issueResponse();
        stub.resolves(issueResponse);
        const issue = await underTest.issueGet({
            params: {
                id: '123'
            }
        });
        stub.restore();
        expect(issue).toEqual(issueResponse);
    });

    it('should return specific issue', async () => {
        const stub = sinon.stub(Issue, 'findById').returnsPromise();
        stub.resolves(undefined);
        try {
            await underTest.issueGet({
                params: {
                    id: '123'
                }
            });
            stub.restore();
        } catch (err) {
            expect(err).toEqual(e.ISSUE_DOESNT_EXISTS);
        }
    });
});

