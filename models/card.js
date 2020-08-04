const MONGOOSE = require('mongoose');

const cardSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: [true, 'card name is a required field']
    },
    description: {
        type: String
    },
    body: {
        type: String
    }
});

module.exports = MONGOOSE.model('Card', cardSchema);