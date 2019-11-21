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
