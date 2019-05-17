# Setup raspbian


## Setup ntp

```sh
sudo apt install ntp
sudo systemctl enable ntp
sudo timedatectl set-ntp 1
```

## Setting up the daemon, etc 

### Getting the source code
```sh
git clone https://github.com/PhenoTIPI/SpeedSeed3.git
pip3 install pymongo
```
### Installing NPM and the packages
```sh
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g yarn

cd ~/SpeedSeed3/Software/backend 
npm install

cd ~/SpeedSeed3/Software/gui
yarn install
```

## Start services

### daemon:

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

## Edit the rbpi screen settings
```sh
vim ~/.config/lxsession/LXDE-pi/autostart
@chromium-browser --kiosk http://localhost:3000

@xset s noblank
@xset s off
@xset -dpms

sudo vim /etc/lightdm/lightdm.conf
xserver-command= X -s 0 -dpms
```

## Setup the automatic startup of the services

Create the following files:

### `/etc/systemd/system/ss3_backend.service`

```
[Service]
WorkingDirectory=/home/pi/workspace/speedseed3/Software/backend
ExecStart=/usr/bin/npm start
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ss3_backend
User=pi
Group=pi
Environment=NODE_ENV=production PORT=3001 mongoserver=<IPADDRESS>

[Install]
WantedBy=multi-user.target
```
### `/etc/systemd/system/ss3_gui.service`

```
[Service]
WorkingDirectory=/home/pi/workspace/speedseed3/Software/gui
ExecStart=/usr/bin/npm start
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ss3_gui
User=pi
Group=pi
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Install the services
```sh
sudo systemctl enable  ss3_backend
sudo systemctl enable  ss3_gui
```
