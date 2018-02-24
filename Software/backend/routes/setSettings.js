var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var myJson = [
    {id: 1, value:"120"},
    {id: 2, value:"100"},
  ];
  fs.writeFile( "filename1.json", JSON.stringify( myJson ), "utf8" );
  // And then, to read it...
  var obj;
  fs.readFile("filename.json", 'utf8', function (err, data) {
    if (err) res.send("culo peluo"); throw err;
    obj = JSON.parse(data);
  });
    res.json(myJson);
});

module.exports = router;
