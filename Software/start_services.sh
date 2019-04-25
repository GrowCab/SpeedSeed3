#!/bin/bash
mongo_ip=149.155.221.253

cd /home/pi/SpeedSeed3/Software/daemon
python3.5 speed_seed_daemon --server $mongo_ip
cd /home/pi/SpeedSeed3/Software/backend
PORT=3001 mongoserver=$mongo_ip npm start
cd /home/pi/SpeedSeed3/Software/gui
PORT=3002 npm start