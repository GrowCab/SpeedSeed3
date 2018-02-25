void relay_setup(int port){
  digitalWrite(port, LOW);
  pinMode(port, OUTPUT);
}

void relay_on(int port){
  digitalWrite(port, LOW);
}

void relay_off(int port){
  digitalWrite(port, HIGH);
}
