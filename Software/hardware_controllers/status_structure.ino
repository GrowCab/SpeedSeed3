

void status_print(struct CurrentStatus * cs){
  Serial.print("STATUS=");
  Serial.print("Humidity: "); 
  Serial.print(cs->humidity);
  Serial.print("%\tTemperature: "); 
  Serial.print(cs->temperature);
  Serial.print("\tPeltier cool: ");
  Serial.print(cs->peltier_cool_status);
  Serial.print("\tMax Temp: ");
  Serial.print(cs->max_tmp);
  Serial.print("\tMin Temp: ");
  Serial.print(cs-> min_tmp);
  Serial.println();
}

void status_read_environment(struct CurrentStatus * cs){
  cs->humidity = dht_humidity();
  cs->temperature = dht_temperature();
}

void status_start_cool(struct CurrentStatus * cs){
  pelitier_on(PIN_PELTIER);
  fan_set_speed(PIN_FAN_INSIDE, 0);
  fan_set_speed(PIN_FAN_OUTSIDE, 0);
  cs->peltier_cool_status = true;
  
}

void status_stop_cool(struct CurrentStatus * cs){
  pelitier_off(PIN_PELTIER);
  fan_set_speed(PIN_FAN_INSIDE, 255);
  fan_set_speed(PIN_FAN_OUTSIDE, 255);
  cs->peltier_cool_status = true;
}


void recvWithEndMarker(struct CurrentStatus * cs) {
  static byte ndx = 0;
  char endMarker = '\n';
  char rc;
 
  while (Serial.available() > 0 && cs->new_data == false) {
     rc = Serial.read();
     if (rc != endMarker) {
      cs->receivedChars[ndx] = rc;
      ndx++;
      if (ndx >= numChars) {
        ndx = numChars - 1;
      }
     }else {
      cs->receivedChars[ndx] = '\0'; // terminate the string
      ndx = 0;
      cs->new_data = true;
    }
  }
}

void parse_new_data(struct CurrentStatus * cs) {
  if (cs->new_data == true) {
    String messageFromPC;
    char * strtokIndx; // this is used by strtok() as an index
    strtokIndx = strtok(cs->receivedChars,"=");
    messageFromPC = String(strtokIndx); // copy it to messageFromPC
    Serial.print("CMD=");
    Serial.print(messageFromPC);
    Serial.println();
    if(messageFromPC == "PRINT"){
      status_print(cs);
    }else if(messageFromPC == "MAX_TEMP"){
      strtokIndx = strtok(NULL, ",");
      cs->max_tmp = atof(strtokIndx);
      status_print(cs);
    } else{
      Serial.print("ERROR=Unknown command ");
      Serial.print(messageFromPC);
      Serial.println();
    }
    cs->new_data = false;  
  }
}
