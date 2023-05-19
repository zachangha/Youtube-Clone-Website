var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();

router.post('/create', isLoggedIn, function(req, res, next){
    res.status(201).json(req.body);
});

module.exports = router;