const BCRYPT = require('bcryptjs');
const MONGOOSE = require('mongoose');

const userSchema = new MONGOOSE.Schema({
    firstname: {
        type: String,
        required: [true, 'user firstname is a required field']
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'user email is a required field']
    },
    password: {
        type: String,
        minlength: [8, 'user password must contain at least 8 characters'],
        required: [true, 'user password is a required field']
    },
    teams: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    boards: [{
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: 'Board'
    }]
});

userSchema.pre('save', function(next) {
    if (this.isNew) {
        this.password = BCRYPT.hashSync(this.password, 12);
        next();
    };
});

userSchema.set('toJSON', {
    transform: (doc, user) => {
        delete user.password;
        return user;
    }
});

userSchema.methods.isAuthenticated = function(typedPassword) {
    return BCRYPT.compareSync(typedPassword, this.password);
};

module.exports = MONGOOSE.model('User', userSchema);