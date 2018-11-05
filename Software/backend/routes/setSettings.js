var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body);
  var myJson = JSON.stringify(req.body);
  console.log(myJson);
  req.body.timestamp=new Date()
  console.log(myJson)
  db.settings.save(req.body)
  res.json(myJson);


});

module.exports = router;
