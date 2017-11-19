void peltier_setup(int port){
  digitalWrite(port, LOW);
  pinMode(port, OUTPUT);
}

void pelitier_on(int port){
  digitalWrite(port, HIGH);
}

void pelitier_off(int port){
  digitalWrite(port, LOW);
}
