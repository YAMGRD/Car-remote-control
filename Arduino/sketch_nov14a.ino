#include <SoftwareSerial.h>

// Define the RX and TX pins for SoftwareSerial
int bluetoothRx = 10; // Connect HC-05 TX to Arduino pin 10
int bluetoothTx = 11; // Connect HC-05 RX to Arduino pin 11

SoftwareSerial bluetooth(bluetoothRx, bluetoothTx);

void setup() {
  // Start the serial communication with the computer
  Serial.println('Test');
  Serial.begin(9600);
  
  // Start the Bluetooth communication
  bluetooth.begin(9600);
}

void loop() {
  // Check if there is data available to read from Bluetooth
  if (bluetooth.available() > 0) {
    // Read the data from Bluetooth and print it to Serial Monitor
    char data = bluetooth.read();
    Serial.print(data);
  }
}
