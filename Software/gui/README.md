# Graphical User Interface project

## Main Display

Displays the device's configuration values and current measured/desired sensor values.

## Temperature control

The temperature control ranges from 15 to 25 C in steppings of 1 C.

## Humidity control

The humidity control ranges from 40% to 75% in steppings of 5%.

## Light control

The light control accepts either ON/OFF for a particular time range.

## Start with docker
This program depends on docker and docker-compose. Please see install instructions [here](https://docs.docker.com/compose/install/).

***Once docker and docker-compose are installed***

### Setup as standalone server
If you want to run the API as a standalone either on the same hardware as the frontend code or on a remote server.

**Make sure you're in the correct directory.**
Directory: /SpeedSeed3/Software/gui
**Run the following command**
  ```sh
    $ docker build -t speedseed3gui \
    --build-arg NODE_ENV=production \
    --build-arg PORT=3002 \
    --build-arg DATABASE_TEST=http://myspeedseed3apiserver:3001 .
    $ docker run speedseed3api
  ```
**Explanation of build-args**
Each of the build-args, NODE_ENV, PORT, DATABASE_PROD, DATABASE_TEST, are used to configure the API at runtime.

***NODE_ENV:***
This can either be "production" or "test". Currently there is no difference between test and production environments.
***PORT:***
This is simply the port that the gui/frontend application will bind itself to.
***REACT_APP_API_URL:***
This is the URL where the backend API is running.

### Setup on same hardware as frontend/gui code.
If you want to run the GUI on the same hardware as the API/Backend code you can simply use the docker-compose file provided in Software/docker-compose-production.yml

**Make sure you're in the correct directory.**
Directory: /SpeedSeed3/Software
**Run the following command**
  ```sh
    $ docker-compose -f docker-compose-production.yml up
  ```
Congratulations you are now running the full GUI, Backend, and Database servers.
