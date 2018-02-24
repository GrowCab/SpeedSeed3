var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var myJson = [
    {id: 1, value:"120"},
    {id: 2, value:"100"},
  ];
  res.json(myJson);
});

module.exports = router;
