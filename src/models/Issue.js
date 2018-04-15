const mongoose = require('mongoose');

const { Schema } = mongoose;

const issueSchema = new Schema({
    title: String,
    content: String,
    filesUrl: [String],
    createdAt: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
