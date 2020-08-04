const MONGOOSE = require('mongoose');

const listSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: [true, 'list name is a required field']
    },
    cards: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

module.exports = MONGOOSE.model('List', listSchema);