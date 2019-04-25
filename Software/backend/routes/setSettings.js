var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongojs = require("mongojs")

var uri = "mongodb://"+process.env.mongoserver+":27017/speedseed3";
/* SET settings listing. */
router.post('/', function(req, res, next) {

  try {
  db = mongojs(uri, ["settings"]);

  console.log(req.body);
  var myJson = JSON.stringify(req.body);
  console.log(myJson);

  db.on('error', function (err) {
  console.log('database error', err)
  })

  db.on('connect', function (err) {
    req.body.timestamp=new Date()
    console.log(myJson)
    db.settings.save(req.body)
    res.json(myJson);
    console.log('database connected', err)
  })
} catch (error) {
  console.log("database error", error);
}

});

module.exports = router;
