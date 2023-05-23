var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();
var db = require("../conf/database");
var {GetRecentPosts} = require('../middleware/posts');

/* GET home page. */
router.get('/', GetRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Zacharia S Angha"});
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

router.get("/search", async function (req, res, next) {
  var { searchValue } = req.query;
  try {
    var [rows, _] = await db.execute(
      `select id,title,thumbnail, concat_ws(' ', title, description) as haystack 
      from posts
      having haystack like ?;`,
      [`%${searchValue}%`]
    );
    if(rows && rows.length == 0){
      req.flash("error", "Could not find video.")
      res.redirect('/')
    }else{
      res.locals.posts = rows;
      return res.render('index');
    }
  }catch(error){
    next(error);
  }
});

module.exports = router;
