const MONGOOSE = require('mongoose');

const boardSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: [true, 'board name is a required field']
    },
    lists: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'List'
    }],
    isprivate: {
        type: Boolean,
        default: true
    }
});

module.exports = MONGOOSE.model('Board', boardSchema);