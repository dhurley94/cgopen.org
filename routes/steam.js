var steam = require('steam-login');
var expressSession = require('express-session');
var router = require('express').Router();

router.use(expressSession)({ resave: false, saveUninitialized: false, secret: 'supersecrethash' });
router.use (steam.middleware({
    realm: 'http://localhost.com:3000/',
    verify: 'http://localhost.com:3000/verify',
    apiKey: '7A4BA5976FE7D802329FB0C330A1CC92',
}));

router.get('/', function (req, res) {
    res.send(req.user == null ? 'not logged in' : 'Hello, ' + req.user.username).end();
});

router.get('/auth', steam.authenticate(), function (req, res) {
    res.redirect('/');
});

router.get('/verify', steam.verify(), function (req, res) {
    res.send(req.user).end();
});

router.get('/logout', steam.enforceLogin('/'), function (req, res) {
    req.logOut();
    res.redirect('/');
});

module.exports = router;