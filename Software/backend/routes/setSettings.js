var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongojs = require("mongojs")

/* SET settings listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  var myJson = JSON.stringify(req.body);
  console.log(myJson);
  var uri = "mongodb://"+process.env.mongoserver+":27017/speedseed3",
  db = mongojs(uri, ["settings"]);

  db.on('error', function (err) {
  console.log('database error', err)
  })

  db.on('connect', function () {
  console.log('database connected')
  })

  req.body.timestamp=new Date()
  console.log(myJson)
  db.settings.save(req.body)
  res.json(myJson);
});

module.exports = router;
