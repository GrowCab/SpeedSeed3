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

const int numChars = 32;

typedef struct CurrentStatus
{
   char receivedChars[numChars]; // an array to store the received data
   float humidity;
   float temperature;
   float fan1_hz;
   float fan2_hz;
   float max_tmp;
   float min_tmp;
   float max_humidity;
   int visible_lux;
   int missed_temp_reads;
   int missed_lux_reads;
   bool peltier_cool_status;
   bool next_peltier_cool_status;
   bool new_data;
   bool humidity_fan_status;
   bool next_humidity_fan_status;
   bool light;
   bool next_light;
   bool started_up;
   bool bmp280;
   bool bme280;

} current_status ;
