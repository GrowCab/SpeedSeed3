var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var myJson = {
    humidity: "120",
    temperature: "100",
    luminance: "30",
  };
  res.json(myJson);
});

module.exports = router;
