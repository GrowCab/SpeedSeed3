#include <DHT.h>


//Pin 14 is A0
//Pin 15 is A1
//Pin 16 is A2
//Pin 17 is A3
//Pin 18 is A8

#include "datastructures.h"

#define PIN_PELTIER      5 //Relay Shield (3)
#define PIN_HUMIDITY_FAN 6 //Relay Shield (2)
#define PIN_LIGHT        7 //Relay Shield (1)

#define PIN_TMP_SENSOR   A2 //A2
#define PIN_FAN_PULSE_INSIDE   A0
#define PIN_FAN_PULSE_OUTSIDE  A1
#define PIN_FAN_INSIDE   A3
#define PIN_FAN_OUTSIDE  A4

#define MAX_TEMPERATURE 25
#define MAX_HUMIDITY 70.0

#define LOOP_WAIT 10000



struct CurrentStatus cs;
//SFE_TSL2561 light;

void setup() {
  Serial.begin(9600);
  relay_setup(PIN_PELTIER);
  relay_setup(PIN_HUMIDITY_FAN);
  relay_setup(PIN_LIGHT);

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
}

void loop() {
  status_read_environment(&cs);
  status_control_temperature(&cs);
  status_control_humidity(&cs);
  status_control_light(&cs);

  if (Serial.available() > 0) {
    recvWithEndMarker(&cs);
  }
  if(cs.new_data){
    parse_new_data(&cs);
   }
}
