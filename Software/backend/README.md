# SpeedSeed 3 backend

## Setup
This program depends on docker and docker-compose. Please see install instructions [here](https://docs.docker.com/compose/install/).

***Once docker and docker-compose are installed***

### Setup as standalone server
If you want to run the API as a standalone either on the same hardware as the frontend code or on a remote server.

**Make sure you're in the correct directory.**
Directory: /SpeedSeed3/Software/backend
**Run the following command**
  ```sh
    $ docker build -t speedseed3api \
    --build-arg NODE_ENV=production \
    --build-arg PORT=3001 \
    --build-arg DATABASE_PROD=mongodb://db:27017/speedseed3 \
    --build-arg DATABASE_TEST=mongodb://db:27017/speedseed3test .
    $ docker run speedseed3api
  ```
**Explanation of build-args**
Each of the build-args, NODE_ENV, PORT, DATABASE_PROD, DATABASE_TEST, are used to configure the API at runtime.

***NODE_ENV:***
This can either be "production" or "test". If you use "production" then DATABASE_PROD will be used for the database connection. If you use "test" then DATABASE_TEST will be used for the database connection.
***PORT:***
This is simply the port that the application will bind itself to.
***DATABASE_PROD:***
This is the mongodb connection string used in production mode.
***DATABASE_TEST:***
This is the mongodb connection string used in test mode.

### Setup on same hardware as frontend/gui code.
If you want to run the API on the same hardware as the frontend code you can simply use the docker-compose file provided in Software/docker-compose-production.yml

**Make sure you're in the correct directory.**
Directory: /SpeedSeed3/Software
**Run the following command**
  ```sh
    $ docker-compose -f docker-compose-production.yml up
  ```
Congratulations you are now running the full GUI, Backend, and Database servers.

## API Docs
The SpeedSeed 3 backend API provides access to two resources: Settings and Status.

### Settings Resource
The Settings resource controls the system schedule for controlling humidity levels, light levels, and temperature levels.
Currently there are two actions provided by this resource
  1. Getting the current system Settings
  2. Updating the system Settings.

The Settings resource's structure is defined in the schema at /SpeedSeed3/Software/backend/schemas/Settings.js

### GET /settings
This will return the current system settings object.

***Example Request:***
  ```curl
  curl -X GET http://localhost:3001/settings
  ```

### POST /settings
This will set new system settings.

***Example Request:***

  ```curl
    curl -X POST \
    http://localhost:3001/settings \
    -d '{
        "temperature": [
            {
                "start_hour": 0,
                "start_min": 0,
                "end_hour": 5,
                "end_min": 0,
                "max": 16.0
            },
            {
                "start_hour": 5,
                "start_min": 0,
                "end_hour": 6,
                "end_min": 0,
                "max": 30.0
            },
            {
                "start_hour": 6,
                "start_min": 0,
                "end_hour": 24,
                "end_min": 0,
                "max": 16.0
            }
        ],
        "humidity": [
            {
                "start_hour": 0,
                "start_min": 0,
                "end_hour": 24,
                "end_min": 0,
                "max": 60.0
            }
        ],
        "light": [
            {
                "start_hour": 0,
                "start_min": 0,
                "end_hour": 4,
                "end_min": 0,
                "status": 0
            },
            {
                "start_hour": 5,
                "start_min": 0,
                "end_hour": 24,
                "end_min": 0,
                "status": 1
            }
        ]
    }'
  ```

### Status Resource
The Status resource shows the system status over a period of time. E.G. what the humidity, temperature, and light status were at each time interval. Currently this resource is read-only.

The Status resource's structure is defined in the schema at /SpeedSeed3/Software/backend/schemas/Status.js

### GET /status

***Example Request:***
  ```curl
    curl -X GET http://localhost:3001/status
  ```
