#include "Seeed_BMP280.h"

BMP280 bmp280;


bool bmp280_setup(){
  return bmp280.init() ;
}

float bmp280_pressure_pa(){
  return bmp280.getPressure();
}

float bmp280_humidity(){
  return -1.0;
  //return bmp280.getHumidity();
}

float bmp280_altitude(){
  return bmp280.calcAltitude(bmp280.getPressure());
}

float bmp280_temperature(){
  return bmp280.getTemperature();
}
