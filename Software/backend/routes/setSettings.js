var express = require('express');
var router = express.Router();
var Influx = require("influx");

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'speedseed3'
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var myJson = JSON.stringify(req.body);
  console.log(myJson);
  req.body.timestamp=new Date()
  console.log(myJson)
  db.settings.save(req.body)
  res.json(myJson);

  influx.writePoints([
    {
      measurement: 'settings',
      fields: { height: tidePoint.height },
      timestamp: req.body.timestamp,
    }
  ], {
    database: 'speedseed3',
  })
  .catch(error => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  });

});

module.exports = router;
