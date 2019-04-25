var express = require('express');
var router = express.Router();
var fs = require("fs");
var mongojs = require("mongojs")

var uri = "mongodb://"+process.env.mongoserver+":27017/speedseed3";
/* SET settings listing. */
router.get('/', function(req, res, next) {

  try {
    db = mongojs(uri, ["settings"]);

  db.on('error', function (err) {
  console.log('database error', err)
  })

  db.on('connect', function () {
  console.log('database connected')
  })
  
  db.settings.find().limit(1).sort({ $natural : -1 }).toArray(function(err, result) {
    try {
      if (err) throw err;
      else {
        console.log(result);
        res.json(result[0]);
      }
    } catch (err) {
      console.log('query error', err);
    }
  });
} catch (error) {
  console.log("database error", error);
}


});

module.exports = router;
