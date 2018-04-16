const mongoose = require('mongoose');

const { Schema } = mongoose;

const issueSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    filesUrl: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
