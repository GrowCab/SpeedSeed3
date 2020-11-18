#!/usr/bin/env python

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
