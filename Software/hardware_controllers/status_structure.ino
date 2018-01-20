

void status_print(struct CurrentStatus * cs){
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
