import serial.tools.list_ports
import time
import pymongo
import json

from pymongo import MongoClient

def findArduino():
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        if "Arduino" in p[1]:
            return p




arduino_port = findArduino()
client = MongoClient('mongodb://192.168.1.76:27017')
db = client['speedseed3']

arduino = serial.Serial(arduino_port[0], 9600, timeout=.1)
while True:
    time.sleep(2)
    message = "PRINT=" + '\n'
    arduino.write(message.encode('ascii') )
    data = arduino.readline() #the last bit gets rid of the new-line chars
    if(data):
        try:
            print(data)
            json_data = json.loads(data)
            if ('status' in json_data):
                json_data['status']['timestamp'] = datetime.datetime.utcnow()
        except:
            pass
