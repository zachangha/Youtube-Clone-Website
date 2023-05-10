var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Zacharia S Angha", js:["index.js"] });
});

router.get("/login", function(req,res){
  res.render('login');
});
router.get("/registration", function(req,res){
  res.render('registration', {title: 'Registration', js:["registration.js"]});
});

router.get("/postvideo",isLoggedIn, function(req,res){
  res.render('postvideo');
});

router.get("/viewpost", function(req,res){
  res.render('viewpost');
});

module.exports = router;
