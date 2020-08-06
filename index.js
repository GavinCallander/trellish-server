require('dotenv').config();
const CORS = require('cors');
const EXPRESS = require('express');
const EXPRESS_JWT = require('express-jwt');
const MORGAN = require('morgan');
const ROWDY_LOGGER = require('rowdy-logger');

const APP = EXPRESS();
const ROWDY_RESULTS = ROWDY_LOGGER.begin(APP);

APP.use(CORS());
APP.use(MORGAN('dev'));
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(EXPRESS.json());

APP.use('/auth', EXPRESS_JWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}).unless({
    path: [
        { url: '/auth/login', methods: ['POST'] },
        { url: '/auth/signup', methods: ['POST'] }
    ]
}), require('./controllers/auth'));
APP.use('/teams', EXPRESS_JWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}), require('./controllers/teams'));
APP.use('/boards', EXPRESS_JWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}), require('./controllers/boards'));

APP.listen(process.env.PORT, () => {
    console.log(`Keeping it ${process.env.PORT}`);
    ROWDY_RESULTS.print();
});