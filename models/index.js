const MONGOOSE = require('mongoose');

MONGOOSE.connect(process.env.MONGODB_URI || 'mongodb://localhost:trellish', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports.Board = require('./board');
module.exports.Card = require('./card');
module.exports.List = require('./list');
module.exports.Team = require('./team');
module.exports.User = require('./user');