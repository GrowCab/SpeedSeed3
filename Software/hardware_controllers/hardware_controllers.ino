#include <DHT.h>



//Pin 14 is A0
//Pin 15 is A1
//Pin 16 is A2
//Pin 17 is A3
//Pin 18 is A8

#include "datastructures.h"

#define PIN_PELTIER      5 //Relay Shield
#define PIN_TMP_SENSOR   A2 //A2 
#define PIN_FAN_PULSE_INSIDE   A0 //A3
#define PIN_FAN_PULSE_OUTSIDE  A1 //A4
#define PIN_FAN_INSIDE   A3 
#define PIN_FAN_OUTSIDE  A4

#define MAX_TEMPERATURE 18

#define LOOP_WAIT 10000

int i = 0;

struct CurrentStatus cs;

void setup() {
  Serial.begin(9600);
  peltier_setup(PIN_PELTIER);
  cs.humidity = 0;
  cs.temperature = 0;
  cs.fan1_hz = 0;
  cs.fan2_hz = 0;
  cs.max_tmp = 0;
  cs.min_tmp = 0;
  cs.peltier_cool_status = false;
}

void loop() {
  status_read_environment(&cs);
  status_print(&cs);
  
  if(cs.temperature > MAX_TEMPERATURE){
    status_start_cool(&cs);
  }else{
    status_stop_cool(&cs);
   }
   
  delay(LOOP_WAIT);
}
