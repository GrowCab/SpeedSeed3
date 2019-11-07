var express = require('express');
var router = express.Router();
const assert = require('assert');
var exec = require('child_process').exec;

function shutdown(callback){
    exec('shutdown now', function(error, stdout, stderr){ callback(stdout); });
}

router.get('/', function(req, res, next) {
  console.log("power: Start");

  console.log("Body: %j",  req.body);
  var myJson = JSON.stringify(req.body);
  console.log("Parsed: %j", myJson);
  console.log("power: Parsed json");

    shutdown(function(output) {
        console.log(output)
    });

  console.log("power: End");
});

module.exports = router;
