var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


router.post('/', function(req, res, next) {
  // Create a new MongoClient
  const client = new MongoClient();
  // Connection URL
  const url = "mongodb://"+process.env.mongoserver+":27017";
  // Database Name
  const dbName = 'speedseed3';
  console.log("setSettings: Start");

  console.log("Body: %j",  req.body);
  var myJson = JSON.stringify(req.body);
  console.log("Parsed: %j", myJson);
  console.log("setSettings: Parsed json");
  client.connect(url,function(err, client) {
    assert.equal(null, err);
    console.log("setSettings: Connected correctly to server");

    const db = client.db(dbName);

    const col = db.collection('settings');
    req.body["timestamp"] = new Date();
    console.log(req.body["timestamp"]);
    db.collection('settings').insertOne(req.body, function(err, r) {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
      console.log("setSettings: Saved");
      client.close();
    });
  });
  console.log("setSettings: End");
});

module.exports = router;
