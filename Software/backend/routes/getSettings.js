/*
 * Speeed Seed ^ 3 Frontend
 * 
 *
 * Copyright (c) 2017-2021 John Innes Centre, Earlham Institute, Quadram Instititute.
 * Author     : Luis Yanes, Ricardo H. Ramirez-Gonzalez, Oscar E. Gonzalez-Navarro
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
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
