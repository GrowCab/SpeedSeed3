#!/usr/bin/env python
import serial.tools.list_ports
import time
import pymongo
import json
import datetime
import codecs

from pymongo import MongoClient
from datetime import datetime

reader = codecs.getreader("ascii")
def findArduino():
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        if "Arduino" in p[1]:
            return p

def getStatus(current_status):
    message = "PRINT=" + '\n'
    arduino.write(message.encode('ascii') )
    data = arduino.readline()
    while data and len(data)>0:
        print(data)
        try:
            json_data=json.loads(data.decode('utf-8'))
            if ('status' in json_data):
                now = datetime.utcnow()
                status = json_data['status']
                status['timestamp'] = now
                db.sensors.insert(status)
                current_status.update(status)
                print(str(current_status))
            if('ERROR' in json_data):
                now = datetime.utcnow()
                status = json_data['ERROR']
                status['timestamp'] = now
                db.errors.insert(status)
        except:
            db.errors.insert({"parse_error":data.decode('utf-8')})
            pass
        data = arduino.readline()

def getExpectedStatus():
    last_settings = db.settings.find().sort([("timestamp", pymongo.DESCENDING)]).limit(1)
    now = datetime.utcnow()
    ret = {}
    try:
        settings    = last_settings.next()
        temperature = settings["temperature"]
        humidity    = settings["humidity"]
        light       = settings["light"]
        for t in temperature:
            if t["start_hour"] <= now.hour <= t["end_hour"] and t["start_hour"] <= now.hour <= t["end_hour"]:
                ret["max_tmp"] = t["max"]
        for h in humidity:
            if h["start_hour"] <= now.hour <= h["end_hour"] and h["start_hour"] <= now.hour <= h["end_hour"]:
                ret["max_humidity"] = h["max"]
        for h in light:
            if h["start_hour"] <= now.hour <= h["end_hour"] and h["start_hour"] <= now.hour <= h["end_hour"]:
                ret["light"] = h["status"]
    except StopIteration:
        default_settings['timestamp'] = now
        db.settings.insert(default_settings)
    return ret

def setArduinoProperty(setting, value):
    message =  setting + "=" + str(value) + '\n'
    arduino.write(message.encode('ascii') )

def setExpectedStatus(expected, current):
    for prop in ["max_tmp", "max_humidity", "light"]:
        if(current[prop] != expected[prop]):
            setArduinoProperty(prop, expected[prop])
            getStatus(current_status)




default_settings = {
    'temperature': [{
        'start_hour': 0,
        'start_min': 0,
        'end_hour': 5,
        'end_min': 0,
        'max': 16.0
    },{
        'start_hour': 5,
        'start_min': 0,
        'end_hour': 6,
        'end_min': 0,
        'max': 30.0
    },
    {
        'start_hour': 6,
        'start_min': 0,
        'end_hour': 24,
        'end_min': 0,
        'max': 16.0
    }
    ],
    'humidity': [{
        'start_hour': 0,
        'start_min': 0,
        'end_hour': 24,
        'end_min': 0,
        'max': 60.0
    }],
    'light': [{
        'start_hour': 0,
        'start_min': 0,
        'end_hour': 4,
        'end_min': 0,
        'status': 0
    },
    {
        'start_hour': 4,
        'start_min': 0,
        'end_hour': 24,
        'end_min': 0,
        'status': 1
    }]
}

#arduino_port = findArduino()
# client = MongoClient('mongodb://35.176.230.190:27017')
client = MongoClient('mongodb://127.0.0.1:27017')
db = client['speedseed3']

#arduino = serial.Serial(arduino_port[0], 9600, timeout=.1)
i = 0
#print(arduino_port[0])

current_status = {}
expected_status = getExpectedStatus()
