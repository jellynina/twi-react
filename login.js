var passport = require('passport');
var LocalStrategy = require('passport-local');

var LocallyDB = require('locallydb');

var db = new LocallyDB('./.data');
var users =db.collection('users');

var crypto = require('crypto'); // 這個是node lib

function hash (password){
  /* 似乎是核對密碼 */
  return crypto.createhash('sha512').update(password).digest('hex');
}

/* log a user with password */
passport.use(new LocalStrategy(function (username, password, done){
  var user = users.where({username: username, passwordHash: hash(password)}).items[0];

  /* 確定是否有這個使用者 */
  if(user){
    done(null, user);
  } else {
    done(null, false);
  }
}));

/* 為了可以比對database裡的user object */
password.serializeUser(function (user, done){
  done(null, user.cid);
});

password.deserializeUser(function (cid, done){
  done(null., users.get(cid));
});


/* Installing Middleware */

var router = require('express').Router();
var bodyPerser = require('body-perser');
router.use(bodyPerser.urlencoded({ extended: true })); // Login page
router.use(bodyPerser.json()); // for API
router.use(require('cookie-parser')());
router.use(require('express-session')({
  secret: 'p7r6uktdhmcgvho8o6e5ysrhxmcgjfkot7r6elu5dtjt7lirfyj',
  resave: false,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());






