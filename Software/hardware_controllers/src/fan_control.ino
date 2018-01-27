void fan_setup(int pwm, int pulse){
  pinMode(pulse, INPUT);
  pinMode(pwm, OUTPUT);
}

void fan_set_speed(int pwm, int f_speed){
  analogWrite(pwm,f_speed);
}

double fan_frequency(int fanPulse) {
  unsigned long pulseDuration = pulseIn(fanPulse, LOW);
  double frequency = 1000000/pulseDuration;
  return frequency ;
}

double fan_hz(int fanPulse){
  return fan_frequency(fanPulse) / 2 ;
}

double fan_rpm(int fanPulse){
  return fan_frequency(fanPulse) / 2 * 60 ;
}

void fan_print(int fanPulse){
  double frequency = fan_frequency(fanPulse);
  Serial.print("freq. (Hz):");
  Serial.println(frequency/2);
  Serial.print("RPM:");
  Serial.println(frequency/2*60);  
}
