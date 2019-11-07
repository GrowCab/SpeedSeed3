var express = require('express');
var router = express.Router();
const assert = require('assert');
var exec = require('child_process').exec;

function reboot(callback){
    exec('shutdown -r now', function(error, stdout, stderr){ callback(stdout); });
}


router.get('/', function(req, res, next) {
  console.log("reboot: Start");

  console.log("Body: %j",  req.body);
  var myJson = JSON.stringify(req.body);
  console.log("Parsed: %j", myJson);
  console.log("reboot: Parsed json");

    reboot(function(output) {
        console.log(output)
    });

  console.log("reboot: End");
});

module.exports = router;
