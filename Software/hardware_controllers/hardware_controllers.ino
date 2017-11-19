#include <DHT.h>


#define PIN_PELTIER      4
#define PIN_TMP_SENSOR   3 
#define PIN_FAN_PULSE_INSIDE   6
#define PIN_FAN_PULSE_OUTSIDE  7
#define PIN_FAN_INSIDE   8
#define PIN_FAN_OUTSIDE  9

#define MAX_TEMPERATURE 5.0

#define LOOP_WAIT 10000
void setup() {
  Serial.begin(9600);
  peltier_setup(PIN_PELTIER);
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Inside fan");
  fan_print(PIN_FAN_PULSE_INSIDE);
  Serial.println("Outside fan");
  fan_print(PIN_FAN_PULSE_OUTSIDE);
  float t = dht_temperature();

  dht_print_status();
  if(t > MAX_TEMPERATURE){
    pelitier_on(PIN_PELTIER);
    fan_set_speed(PIN_FAN_INSIDE, 255);
    fan_set_speed(PIN_FAN_OUTSIDE, 255);
  }else{
    pelitier_off(PIN_PELTIER);
    fan_set_speed(PIN_FAN_INSIDE, 0);
    fan_set_speed(PIN_FAN_OUTSIDE, 0);
   }
   
  delay(LOOP_WAIT);
}
