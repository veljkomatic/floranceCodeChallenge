const issueService = require('../services/issue.service');
const sanitizing = require('../services/sanitizing/sanitizeIssue');
const errorMap = require('../config/errorMap');

module.exports = ({ router }) => {
    router.get('/issues', async (req, res) => {
        try {
            const issues = await issueService.issuesGet();
            const sanitizeIssues = issues.map((issue) => sanitizing.sanitizeIssueResponse(issue));
            res.send(sanitizeIssues);
        } catch (error) {
            const e = errorMap(error);
            return res.status(e.httpStatus).send({ error: e.message });
        }
    });

    router.post('/issues', async (req, res) => {
        try {
            const newIssues = await issueService.issuesPost(req);
            res.send(sanitizing.sanitizeIssueResponse(newIssues));
        } catch (error) {
            const e = errorMap(error);
            return res.status(e.httpStatus).send({ error: e.message });
        }
    });

    router.get('/issues/:id', async (req, res) => {
        try {
            const issue = await issueService.issueGet(req);
            res.send(sanitizing.sanitizeIssueResponse(issue));
        } catch (error) {
            const e = errorMap(error);
            return res.status(e.httpStatus).send({ error: e.message });
        }
    });
};
