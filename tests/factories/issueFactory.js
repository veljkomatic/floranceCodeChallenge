const Issue = require('../../src/models/Issue');

module.exports = () => {
    return new Issue({
        title: 'Health test',
        content: 'Health care test'
    }).save();
};
