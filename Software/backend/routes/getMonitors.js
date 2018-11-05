var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.json(result);

});

module.exports = router;
