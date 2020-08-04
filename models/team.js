const MONGOOSE = require('mongoose');

const teamSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: [true, 'team name is a required field']
    },
    users: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = MONGOOSE.model('Team', teamSchema);