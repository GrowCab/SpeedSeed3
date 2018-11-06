var express = require('express');
var router = express.Router();
var db = require('../model/dbconnection'); 

router.get('/', function(req, res, next) {
    db.query('SELECT * FROM settings ORDER BY id DESC LIMIT 1', 
    function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
    });
});

module.exports = router;
