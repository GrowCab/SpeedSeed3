#!/usr/bin/env python

# 
# Speeed Seed ^ 3 Daemon
# 
# 
# Copyright (c) 2017-2021 John Innes Centre, Earlham Institute, Quadram Instititute.
# Author     :  Ricardo H. Ramirez-Gonzalez, Luis Yanes, Oscar E. Gonzalez-Navarro
# 
# The MIT License (MIT)
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
# 
 

from pymongo import MongoClient
from datetime import datetime


default_settings = {
    'temperature': [{
        'start_hour': 0,
        'start_min': 0,
        'end_hour': 5,
        'end_min': 0,
        'max': 16.0
    },{
        'start_hour': 5,
        'start_min': 1,
        'end_hour': 6,
        'end_min': 0,
        'max': 30.0
    },
    {
        'start_hour': 6,
        'start_min': 1,
        'end_hour': 23,
        'end_min': 59,
        'max': 16.0
    }
    ],
    'humidity': [{
        'start_hour': 0,
        'start_min': 0,
        'end_hour': 23,
        'end_min': 59,
        'max': 40.0
    }],
    'light': [{
        'start_hour': 0,
        'start_min': 0,
        'end_hour': 4,
        'end_min': 0,
        'max': 0
    },
    {
        'start_hour': 4,
        'start_min': 1,
        'end_hour': 23,
        'end_min': 59,
        'max': 1
    }]
}

client = MongoClient('mongodb://127.0.0.1:27017')
db = client['speedseed3']

default_settings['timestamp'] = datetime.now()

iid = db.settings.insert_one(default_settings).inserted_id
print(iid)
