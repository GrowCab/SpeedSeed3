var express = require('express');
var router = express.Router();
var Influx = require("influx");

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'speedseed3'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    influx.query(`
        select * from sensors
        `)
        .then( result => response.status(200).json(result) )
        .catch( error => response.status(500).json({ error }) );

    res.json(result);

});

module.exports = router;
