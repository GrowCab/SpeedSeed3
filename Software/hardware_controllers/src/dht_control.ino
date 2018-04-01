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

     //check if returns are valid, if they are NaN (not a number) then something went wrong!
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



/* This code is for the "simple" just temperature sensor

const int B = 4275;               // B value of the thermistor
const int R0 = 100000;

float dht_temperature(){
  int a = analogRead(PIN_TMP_SENSOR);

    float R = 1023.0/a-1.0;
    R = R0*R;

    float temperature = 1.0/(log(R/R0)/B+1/298.15)-273.15;  //convert to temperature via datasheet
  return temperature;
}
*/
