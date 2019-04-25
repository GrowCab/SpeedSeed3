var express = require('express');
var router = express.Router();
var http = require("http");
var mongojs = require("mongojs");

var uri = "mongodb://"+process.env.mongoserver+":27017/speedseed3";
/* GET users listing. */
router.get('/', function(req, res, next) {

  try {
  db = mongojs(uri, ["sensors"]);
  db.on('error', function (err) {
  console.log('database error', err)
  res.json("{status:invalid}");
  })
  } catch (error) {
    console.log("database error", error);
  }
  
  db.on('connect', function (err) {
  console.log('database connected')
  })

  db.sensors.find().limit(1).sort({$natural:-1}).toArray(function(err, result) {
    try {
      if (err) throw err;
      else {
        console.log(result);
        res.json(result);
      }
  } catch (err) {
    console.log('query error', err);
  }
  });
});

module.exports = router;
