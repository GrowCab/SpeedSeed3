var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/* GET users listing. */
router.get('/', function(req, res, next) {

  const dbName = "speedseed3";
  const client = new MongoClient();
  console.log("getMonitors: Start");
  // Use connect method to connect to the Server
  const url="mongodb://"+process.env.mongoserver+":27017";
  MongoClient.connect(url,function(err, client) {
    console.log(err);
    assert.equal(null, err);
    console.log("getMonitors: Connected correctly to server");

    const db = client.db(dbName);
    db.collection('sensors').find().sort({timestamp:-1}).limit(1).toArray(function(err, docs) {
    assert.equal(null, err);
    // assert.equal(1, docs.length);
    console.log("getMonitors: " + docs);
    res.json(docs);
    console.log("getMonitors: Done");
    client.close();
    });
  });
});

module.exports = router;
