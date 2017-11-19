#include "DHT.h"
#define DHTTYPE DHT22
DHT dht(PIN_TMP_SENSOR, DHTTYPE);

void dht_setup(){
    dht.begin();
}

float dht_humidity(){
  return dht.readHumidity(); 
}


float dht_temperature(){
  return dht.readTemperature(); 
}

void dht_print_status(){
  float h = dht.readHumidity();
  float t = dht.readTemperature();

    // check if returns are valid, if they are NaN (not a number) then something went wrong!
    if (isnan(t) || isnan(h)) 
    {
        Serial.println("Failed to read from DHT");
    } 
    else 
    {
        Serial.print("Humidity: "); 
        Serial.print(h);
        Serial.print(" %\t");
        Serial.print("Temperature: "); 
        Serial.print(t);
        Serial.println(" *C");
    }

 }
