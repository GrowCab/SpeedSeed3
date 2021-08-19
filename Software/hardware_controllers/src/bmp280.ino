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

#include "Seeed_BMP280.h"

BMP280 bmp280;


bool bmp280_setup(){
  return bmp280.init() ;
}

float bmp280_pressure_pa(){
  return bmp280.getPressure();
}

float bmp280_humidity(){
  return -1.0;
  //return bmp280.getHumidity();
}

float bmp280_altitude(){
  return bmp280.calcAltitude(bmp280.getPressure());
}

float bmp280_temperature(){
  return bmp280.getTemperature();
}
