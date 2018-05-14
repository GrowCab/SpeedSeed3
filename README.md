[![Maintainability](https://api.codeclimate.com/v1/badges/92616e7213e76416dad5/maintainability)](https://codeclimate.com/github/PhenoTIPI/SpeedSeed3/maintainability)

# SpeedSeed3
SS<sup>3</sup>


## Setting up Raspbery Pi

The setup currently consist of a Raspberry Pi3 running Raspbian. 

### Instasll mongoDB

The daemon controlling the settings stores the data in MongoDB. The version used in Raspbian is 2.4.14, as it is 32-bits. It should be possible to isntall a 64-bit OS and install a newer version, but it hasn't been tested.

```
sudo apt-get install mongodb-server
```


### Python dependencies. 

The modules to run the daemon are:

```
pip3 install pyserial
pip3 install pymongo==3.4
```

## Setting up arduino

The code for the controller is in the folder:

```
Software/hardware_controllers
```

It is organized as a PlataformIO project. 

