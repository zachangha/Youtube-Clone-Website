var express = require('express');
var router = express.Router();
var db = require('../conf/database');
/* GET localhost:3000.users */
router.post('/registration', async function(req, res, next) {
  var {username, email, password} = req.body;
  try{
    var [rows, fields] = await db.execute(`select id from users where username=?`, [username]);
    if(rows && rows.length > 0)
    {
      return res.redirect('/register');
    }
    var [rows, fields] = await db.execute(`select id from users where email=?`, [email]);
    if(rows && rows.length > 0)
    {
      return res.redirect('/register');
    }

    var [resultObject, fields] = await db.execute( `INSERT INTO users (username, email, password) value (?,?,?)`, [username, email, password]);
    if(resultObject && resultObject.affectedRows == 1){
      res.redirect('/login');
    }else{
      return res.redirect("/register");
    }
  }catch(error){
    next(error);
  }

});

module.exports = router;
