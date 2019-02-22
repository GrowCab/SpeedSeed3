#include "Seeed_BME280.h"

BME280 bme280;


void bme280_setup(){
  if(!bme280.init()){
    Serial.println("Device error!");
  }
}

float bme280_pressure_pa(){
  return bme280.getPressure();
}

float bma280_humidity(){
  return bme280.getHumidity();
}

float bma280_altitude(){
  return bme280.calcAltitude(bme280.getPressure());
}

float bme280_temperature(){
  return bme280.getTemperature();
}
