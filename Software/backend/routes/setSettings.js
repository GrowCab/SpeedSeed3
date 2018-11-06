var express = require('express');
var router = express.Router();
var db = require('../model/dbconnection'); 

router.post('/', function(req, res, next) {
  console.log(req.body);
  var myJson = JSON.stringify(req.body);
  console.log(myJson);
  db.query("INSERT INTO settings (humidity, temperature, light) VALUES (?,?,?)",
  [myJson.humidity, myJson.temperature, myJson.light], (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
