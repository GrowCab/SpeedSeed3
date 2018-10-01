var express = require('express');
var router = express.Router();
var Influx = require("influx");

router.get('/', function(req, res, next) {
    // res.json("Test");
    let influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'speedseed3'
      });
  
    influx.query(`select * from settings`)
    .then(results => {
        console.log(results)});
    res.json("result");
});

module.exports = router;
