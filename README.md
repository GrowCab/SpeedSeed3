[![Maintainability](https://api.codeclimate.com/v1/badges/92616e7213e76416dad5/maintainability)](https://codeclimate.com/github/PhenoTIPI/SpeedSeed3/maintainability)

# SpeedSeed3
SS<sup>3</sup>


## Setting up Raspbery Pi

The setup currently consist of a Raspberry Pi3 running Raspbian. 

### Install mongoDB

The daemon controlling the settings stores the data in a MongoDB server which needs to be configured on the services that will run the interfaces (python daemon and rbpi device gui).

```
sudo apt-get install mongodb-server
```

Create a collection named speedseed3 where all the data will be stored.

### Python dependencies. 

The modules to run the daemon are:

```
pip3 install pyserial
pip3 install pymongo==3.4
```
Execute the `speed_seed_daemon.py` script, this will collect the data from the monitors and send it to the mongoDB server.

## Setting up arduino

The code for the controller is in the folder:

```
Software/hardware_controllers
```

It is organized as a PlataformIO[http://docs.platformio.org/en/latest/userguide/cmd_init.html#cmd-init] project. 

## User interface

The code for the user interface that runs on the RBPi or can run from any computer that has access to the MongoDB server is located in `Software/gui`, the user interface is composed of two parts, a frontend website which can be accessed from any internet browser that has javascript activated and a backend that collects the data from MongoDB.

To install all the dependencies for the frontend and backend, go to the `Software/gui` and `Software/backend` respectively and execute `npm install`

To then initalise the services on the `Software/backend` directory run:
```
PORT=3001 npm start
```

and, for the GUI run on `Software/gui` the following:
```
npm start
```

This will launch your default web browser and open the "SpeedSeed3" interface.
