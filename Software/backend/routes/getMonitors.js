var express = require('express');
var router = express.Router();
var http = require("http");
var mongojs = require("mongojs");

var uri = "mongodb://192.168.1.76:27017/speedseed3",
    db = mongojs(uri, ["sensors"]);
/* GET users listing. */
router.get('/', function(req, res, next) {
  var myJson = {
    humidity: "30",
    temperature: "20",
    luminance: "ON",
  };
  res.json(myJson);
});

module.exports = router;
