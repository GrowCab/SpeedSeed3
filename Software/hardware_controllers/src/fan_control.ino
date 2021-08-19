/*
 * Speeed Seed ^ 3 Hardware controller
 * 
 *
 * Copyright (c) 2017-2021 John Innes Centre, Earlham Institute, Quadram Instititute.
 * Author     :  Ricardo H. Ramirez-Gonzalez, Luis Yanes, Oscar E. Gonzalez-Navarro
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
