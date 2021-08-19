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
const assert = require('assert');
var exec = require('child_process').exec;

function reboot(callback){
    exec('shutdown -r now', function(error, stdout, stderr){ callback(stdout); });
}


router.get('/', function(req, res, next) {
  console.log("reboot: Start");

  console.log("Body: %j",  req.body);
  var myJson = JSON.stringify(req.body);
  console.log("Parsed: %j", myJson);
  console.log("reboot: Parsed json");

    reboot(function(output) {
        console.log(output)
    });

  console.log("reboot: End");
});

module.exports = router;
