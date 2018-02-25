import serial.tools.list_ports
import time
import pymongo
import json
import datetime

from pymongo import MongoClient
from datetime import datetime

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
        try:
            json_data = json.loads(data)
            if ('status' in json_data):
                now = datetime.utcnow()
                status = json_data['status']
                status['timestamp'] = now
                db.sensors.insert(status)
                current_status.update(status)
                print(str(current_status))
        except:
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
        for t in temperature:
            if t["start_hour"] <= now.hour <= t["end_hour"] and t["start_hour"] <= now.hour <= t["end_hour"]:
                ret["max_tmp"] = t["max"]
        for h in humidity:
            if h["start_hour"] <= now.hour <= h["end_hour"] and h["start_hour"] <= now.hour <= h["end_hour"]:
                ret["max_humidity"] = h["max"]
    except StopIteration:
        default_settings['timestamp'] = now
        db.settings.insert(default_settings)
    return ret

def setArduinoProperty(setting, value):
    message =  setting + "=" + str(value) + '\n'
    arduino.write(message.encode('ascii') )

def setExpectedStatus(expected, current):
    if(current["max_tmp"] != expected["max_tmp"]):
        setArduinoProperty("max_tmp", expected["max_tmp"])
        getStatus(current_status)
    if(current["max_humidity"] != expected["max_humidity"]):
        setArduinoProperty("max_humidity", expected["max_humidity"])
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
    }]
}

arduino_port = findArduino()
client = MongoClient('mongodb://192.168.1.76:27017')
db = client['speedseed3']

arduino = serial.Serial(arduino_port[0], 9600, timeout=.1)
i = 0

current_status = {}

while True:
    time.sleep(1)
    expected_status = getExpectedStatus()
    i+=1
    if i == 60 or len(current_status) == 0 :
        getStatus(current_status)

        i=0
    if len(current_status) > 0 and len(expected_status) > 0:
        setExpectedStatus(expected_status, current_status)
