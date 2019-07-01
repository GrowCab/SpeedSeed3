var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

router.get('/', function(req, res, next) {
// Database Name
  const dbName = "speedseed3";
  const client = new MongoClient();
  console.log("getSettings: Start");
  // Use connect method to connect to the Server
  const url="mongodb://"+process.env.mongoserver+":27017";
  MongoClient.connect(url,function(err, client) {
    console.log(err);
    assert.equal(null, err);
    console.log("getSettings: Connected correctly to server");

    const db = client.db(dbName);

    const col = db.collection('settings');

    db.collection('settings').find().sort({$natural:-1}).limit(1).toArray(function(err, docs) {
      assert.equal(null, err);
      assert.equal(1, docs.length);
      console.log("getSettings: " + docs[0]);
      res.json(docs[0]);
      console.log("getSettings: Done");
      client.close();
    });
  });
});

module.exports = router;
