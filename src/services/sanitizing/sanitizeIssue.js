module.exports = {
    sanitizeIssueResponse: (issue) => {
        return {
            title: issue.title || '',
            content: issue.content || '',
            filesUrl: issue.filesUrl || [],
            id: issue._id
        };
    }
};
