#include <DHT.h>
#include <Wire.h>
//#include <Digital_Light_TSL2561.h>
#include <math.h>

//Pin 14 is A0
//Pin 15 is A1
//Pin 16 is A2
//Pin 17 is A3
//Pin 18 is A8

#include "datastructures.h"

#define PIN_PELTIER_1      4 //Relay Shield (4)
#define PIN_PELTIER_2      5 //Relay Shield (3)
#define PIN_HUMIDITY_FAN 6 //Relay Shield (2)
#define PIN_PELTIER_3      7 //Relay Shield (1)
#define PIN_LIGHT        8

#define PIN_TMP_SENSOR   A2 //A2
//#define PIN_FAN_PULSE_INSIDE   A0
//#define PIN_FAN_PULSE_OUTSIDE  A1

#define PIN_FAN_INSIDE   A3
#define PIN_FAN_OUTSIDE  A4

#define MAX_TEMPERATURE 30
#define MAX_HUMIDITY 70.0

#define LOOP_WAIT 10000



struct CurrentStatus cs;
//SFE_TSL2561 light;


void setup() {
  Serial.begin(9600);
//  Wire.begin();
//  TWBR = 720;
  //Serial.print(TWBR);

  bme280_setup();
  Serial.print("Starting setup\n");
  relay_setup(PIN_PELTIER_1);
  relay_setup(PIN_PELTIER_2);
  relay_setup(PIN_PELTIER_3);
  relay_setup(PIN_HUMIDITY_FAN);
  relay_setup(PIN_LIGHT);
//  TSL2561.init();
  dht_setup();
  cs.humidity = 0;
  cs.temperature = 0;
  cs.fan1_hz = 0;
  cs.fan2_hz = 0;
  cs.max_tmp = MAX_TEMPERATURE;
  cs.min_tmp = 0;
  cs.max_humidity = MAX_HUMIDITY;
  cs.peltier_cool_status = false;
  cs.next_peltier_cool_status = false;
  cs.humidity_fan_status = false;
  cs.next_humidity_fan_status = false;
  cs.new_data  =  false;
  cs.light = false;
  cs.next_light = false;
  cs.started_up = false;
  cs.missed_temp_reads = 0;
  status_clear_in_buffer();
  //Serial.print("Done setup");


}

void loop() {
  delay(100);
  //Serial.print("Reading env");
  status_read_environment(&cs);
 //Serial.print("Reading temp");
  status_control_temperature(&cs);
  //status_control_humidity(&cs);
 //Serial.print("Reading light");
  status_control_light(&cs);
  cs.started_up = true;
  //Serial.print(".");
  if (Serial.available() > 0) {
    //Serial.print("AVailable!\n");
    //Serial.flush();
    recvWithEndMarker(&cs);
  }
  if(cs.new_data){
    parse_new_data(&cs);
   }
}
