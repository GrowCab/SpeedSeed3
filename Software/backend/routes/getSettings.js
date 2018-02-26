var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongojs = require("mongojs")

/* SET settings listing. */
router.get('/', function(req, res, next) {
  var myJson = [
    {id: 1, value:"120"},
    {id: 2, value:"100"},
  ];
  var uri = "mongodb://192.168.1.76:27017/speedseed3",
  db = mongojs(uri, ["testing"]);

  db.on('error', function (err) {
  console.log('database error', err)
  })

  db.on('connect', function () {
  console.log('database connected')
  })

  db.testing.find().limit(1).sort({$natural:-1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
  });
});

module.exports = router;
