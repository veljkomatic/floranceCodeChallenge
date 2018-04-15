const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const axios = require('axios');

const Issue = require('../models/Issue');
const keys = require('../config/keys');
const e = require('../utils/errorCodes.js');


const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

const uploadFile = async (file) => {
    const key = `${uuid()}${file.name}`;
    const params = {
        Bucket: 'my-issue-bucket-123',
        ContentType: file.mimetype,
        Key: key
    };
    const url = await s3.getSignedUrl('putObject', params);
    await axios.put(url, file.data, {
        headers: {
            'Content-Type': file.mimetype
        }
    });
    return key;
};

module.exports = {
    issuesGet: () => {
        return Issue.find();
    },
    issuesPost: async (req) => {
        const { title, content } = req.body;
        let filesUrl = [];
        if (req.files) {
            const fileKeys = [];
            if (!Array.isArray(req.files.file)) {
                req.files.file = [req.files.file];
            }
            for (const file of req.files.file) {
                try {
                    const key = await uploadFile(file);
                    fileKeys.push(key);
                } catch (error) {
                    console.log(error);
                }
            }
            filesUrl = fileKeys.map((key) => `https://s3.amazonaws.com/my-issue-bucket-123/${key}`);
        }
        const issue = new Issue({
            filesUrl,
            title,
            content
        });
        return issue.save();
    },
    issueGet: async (req) => {
        const existingIssue = await Issue.findById(req.params.id);
        if (!existingIssue) {
            throw e.ISSUE_DOESNT_EXISTS;
        }
        return existingIssue;
    }
};
