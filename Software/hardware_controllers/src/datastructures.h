const byte numChars = 32;

typedef struct CurrentStatus
{
   char receivedChars[numChars]; // an array to store the received data
   float humidity;
   float temperature;
   float fan1_hz;
   float fan2_hz;
   float max_tmp;
   float min_tmp;
   bool peltier_cool_status;
   bool next_peltier_cool_status;
   bool new_data;
   
} current_status ;

