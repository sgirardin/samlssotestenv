var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var saml = require('passport-saml');
var fs = require('fs');


var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'secret', 
                 resave: false, 
                 saveUninitialized: true,}));
app.get('/',
    function(req, res) {
        res.send('Test Home Page');
    }
)
var server = app.listen(4300, function () {
    console.log('Listening on port %d', server.address().port)
});

passport.serializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

var samlStrategy = new saml.Strategy({
  callbackUrl: 'http://localhost/login/callback',entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php', issuer: 'saml-poc', identifierFormat: null,decryptionPvk: fs.readFileSync(__dirname + '/certskey.pem', 'utf8'), privateCert: fs.readFileSync(__dirname + '/certskey.pem', 'utf8'),validateInResponseTo: false,disableRequestedAuthnContext: true
}, function(profile, done) {
    return done(null, profile);
});

passport.use('samlStrategy', samlStrategy);
app.use(passport.initialize({}));
app.use(passport.session({}));

app.get('/login',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login handler');
        next();
    },
    passport.authenticate('samlStrategy'),
);

app.post('/login/callback',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.send('Log in Callback Success');
    }
);