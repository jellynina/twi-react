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
passport.serializeUser(function (user, done){
  done(null, user.cid);
});

passport.deserializeUser(function (cid, done){
  done(null, users.get(cid));
});


/* Installing Middleware */

var router = require('express').Router();
var bodyPerser = require('body-parser');
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

/* create a route for login page */
router.get('/login', function (req, res) {
  res.render('login');
});

/* 創造新帳號

  post signup 已經在html宣告了
 */
router.post('/signup', function (req, res, next){
  if(users.where({ username: req.body.username }).items.length === 0 ){
    // no user
    var user = {
      fullname: req.body.fullname,
      email: req.body.email,
      username: req.body.username,
      passwordhash: hash(req.body.password),
      following: []
    };

    var userId = users.insert(user);

    // 自動登入
    req.login(users.get(userId), function (err){
      if(err) return next(err);
      res.redirect('/');
    });


  } else {
    // 已經有帳號，則到登入頁
    res.redirect('/login');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', function (req, res){
  req.logout();
  res.redirect.('/login');
});


exports.routes = router; // 以上的router可以在別的地方使用。











