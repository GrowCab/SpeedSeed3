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

#define MAX_TEMPERATURE 25

#define LOOP_WAIT 10000



struct CurrentStatus cs;

void setup() {
  Serial.begin(9600);
  peltier_setup(PIN_PELTIER);
  cs.humidity = 0;
  cs.temperature = 0;
  cs.fan1_hz = 0;
  cs.fan2_hz = 0;
  cs.max_tmp = MAX_TEMPERATURE;
  cs.min_tmp = 0;
  cs.peltier_cool_status = false;
  cs.next_peltier_cool_status = false;
  cs.new_data  =  false;
}

void loop() {
  status_read_environment(&cs);
  
  if(cs.temperature > cs.max_tmp){
    cs.next_peltier_cool_status = true;
    if(cs.peltier_cool_status != cs.next_peltier_cool_status){
      status_start_cool(&cs);
    }
    
  }else{
    cs.next_peltier_cool_status = false;
    if(cs.peltier_cool_status != cs.next_peltier_cool_status){
      cs.next_peltier_cool_status = false; 
      status_stop_cool(&cs);
    }
  }
  if (Serial.available() > 0) {
    recvWithEndMarker(&cs);
  }
  if(cs.new_data){
    parse_new_data(&cs);  
   }
}
