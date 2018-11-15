#Setup raspbian


## Setup ntp

```sh
sudo apt install ntp
sudo systemctl enable ntp
sudo timedatectl set-ntp 1
```

##Setting up the daemon, etc 

Getting the source code
```sh
git clone https://github.com/PhenoTIPI/SpeedSeed3.git
pip3 install pymongo
```
Installing NPM and the packages
```sh
sudo apt-get install npm
sudo npm install -g yarn

cd ~/SpeedSeed3/Software/backend 
npm install

cd ~/SpeedSeed3/Software/gui
yarn install
```

## Start services

daemon:

```sh
cd /home/pi/SpeedSeed3/Software/daemon
python3.5 speed_seed_daemon --server 149.155.221.263
cd /home/pi/SpeedSeed3/Software/backend
PORT=3001 mongoserver=149.155.221.263 npm start
cd /home/pi/SpeedSeed3/Software/gui
PORT=3002 npm start
```


## Rotate screen


```
sudo /bin/su -c "echo 'lcd_rotate=2' >> /boot/config.txt"
```


