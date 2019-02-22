#include "Seeed_BME280.h"

BME280 bme280;


bool bme280_setup(){
  return bme280.init() ;
}

float bme280_pressure_pa(){
  return bme280.getPressure();
}

float bme280_humidity(){
  return bme280.getHumidity();
}

float bme280_altitude(){
  return bme280.calcAltitude(bme280.getPressure());
}

float bme280_temperature(){
  return bme280.getTemperature();
}
