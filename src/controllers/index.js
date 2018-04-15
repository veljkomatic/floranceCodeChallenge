const issueController = require('./issue.controller');

module.exports = globals => [
    issueController(globals)
];
