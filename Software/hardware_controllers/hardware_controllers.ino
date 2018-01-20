#include <DHT.h>



//Pin 14 is A0
//Pin 15 is A1
//Pin 16 is A2
//Pin 17 is A3
//Pin 18 is A8


#define PIN_PELTIER      5 //Relay Shield
#define PIN_TMP_SENSOR   A2 //A2 
#define PIN_FAN_PULSE_INSIDE   A0 //A3
#define PIN_FAN_PULSE_OUTSIDE  A1 //A4
#define PIN_FAN_INSIDE   A3 
#define PIN_FAN_OUTSIDE  A4

#define MAX_TEMPERATURE 18

#define LOOP_WAIT 10000

int i = 0;
void setup() {
  Serial.begin(9600);
  peltier_setup(PIN_PELTIER);
}

void loop() {
  
  // put your main code here, to run repeatedly:
  Serial.println("Inside fan");
  fan_print(PIN_FAN_PULSE_INSIDE);
  //Serial.println("Outside fan");
  //fan_print(PIN_FAN_PULSE_OUTSIDE);
  float t = dht_temperature();
  dht_print_status();
  
  if(t > MAX_TEMPERATURE){
    pelitier_on(PIN_PELTIER);
    fan_set_speed(PIN_FAN_INSIDE, 0);
    fan_set_speed(PIN_FAN_OUTSIDE, 0);
  }else{
    pelitier_off(PIN_PELTIER);
    fan_set_speed(PIN_FAN_INSIDE, 255);
    fan_set_speed(PIN_FAN_OUTSIDE, 255);
   }
   
  delay(LOOP_WAIT);
}
