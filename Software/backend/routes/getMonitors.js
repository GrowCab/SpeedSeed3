var express = require('express');
var router = express.Router();
var http = require("http");
var mongojs = require("mongojs");

var uri = "mongodb://localhost:27017/speedseed3";
//    db = mongojs(uri, ["sensors"]);
/* GET users listing. */
router.get('/', function(req, res, next) {

  var myJson = {
    humidity: "50",
    temperature: "30",
    luminance: "OFF",
  };
//  res.json(myJson);

  db = mongojs(uri, ["sensors"]);

  db.on('error', function (err) {
  console.log('database error', err)
  })

  db.on('connect', function () {
  console.log('database connected')
  })

  db.sensors.find().limit(1).sort({$natural:-1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
  });

});

module.exports = router;
