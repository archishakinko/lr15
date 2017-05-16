var express = require('express');
const config = require('./config');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const easyxml = require('easyxml');

const saltRounds = 10;
const out = require('./utils/out');
const auth = require('./utils/auth');
const dbcontext = require('./context/db')(Sequelize, config);
const usersService = require('./services/users')(dbcontext.user);
const domainService = require('./services/domains')(dbcontext.domain);
const paymentService = require('./services/paymants')(dbcontext.payment, dbcontext.user, dbcontext.domain);

const apiController = require('./controllers/api')(usersService, domainService, paymentService);
var app = express();

app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({xmlParseOptions:{explicitArray: false}}));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

var router = express.Router();

router.use(function(req, res, next){
    out.typeOf(req, res, next);
});

router.post('/sessions', function(req, res){
    auth.auth(req, res, dbcontext);
});

router.post('/users', function(req, res, next){
    auth.register(req, res, next, dbcontext);
});

router.use(function(req, res, next){
    auth.tokenVerify(req, res, next);
});

app.use('/api', router);
app.use('/api', apiController);

dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(5858, () => console.log('Running on http://localhost:5858'));
    })
    .catch((err) => console.log(err));
