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
  var uri = "mongodb://localhost:27017/speedseed3",
  db = mongojs(uri, ["settings"]);

  db.on('error', function (err) {
  console.log('database error', err)
  })

  db.on('connect', function () {
  console.log('database connected')
  })

  db.settings.find().limit(1).sort({$natural:-1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result[0]);
  });
});

module.exports = router;
