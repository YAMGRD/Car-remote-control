#include <Servo.h>


// Motor Front Right wiring
#define FrontRightENA  10
#define FrontRightIN1  36
#define FrontRightIN2  37

// Motor Front Left wiring
#define FrontLeftENB  8
#define FrontLeftIN3  42
#define FrontLeftIN4  43

// Motor Back Right wiring
#define BackRightENA  13
#define BackRightIN1  30
#define BackRightIN2  31

// Motor Back left wiring
#define BackLeftENB  11
#define BackLeftIN3  24
#define BackLeftIN4  25

#define MAX_SPEED 70  

signed int diraction = 0  ; 
signed int is4X4  = 0 ; 


signed int base_pos  = 0 ; 
signed int axe1_pos  = 0 ; 
signed int axe2_pos  = 0 ; 
signed int hand  = 0 ; 
signed int iniatalisation  = 0 ; 


String command = "" ;
char cmd ; 
Servo servo_claw;
Servo servo_bottom;
Servo servo_joint1;
Servo servo_joint2;

void setup() {
  
  Serial.begin(9600);

    pinMode(FrontRightENA, OUTPUT);
    pinMode(FrontRightIN1, OUTPUT);
    pinMode(FrontRightIN2, OUTPUT);
    
    pinMode(FrontLeftENB, OUTPUT);
    pinMode(FrontLeftIN3, OUTPUT);
    pinMode(FrontLeftIN4, OUTPUT);

    pinMode(BackRightENA, OUTPUT);
    pinMode(BackRightIN1, OUTPUT);
    pinMode(BackRightIN2, OUTPUT);

    pinMode(BackLeftENB, OUTPUT);
    pinMode(BackLeftIN3, OUTPUT);
    pinMode(BackLeftIN4, OUTPUT);
	
    digitalWrite(FrontRightIN1, LOW);
    digitalWrite(FrontRightIN2, LOW);
   
    digitalWrite(FrontLeftIN3, LOW);
    digitalWrite(FrontLeftIN4, LOW);
   
    digitalWrite(BackRightIN1, LOW);
    digitalWrite(BackRightIN2, LOW);
   
    digitalWrite(BackLeftIN3, LOW);
    digitalWrite(BackLeftIN4, LOW);

    servo_claw.attach(4);
    servo_bottom.attach(7);
    servo_joint1.attach(5);
    servo_joint2.attach(6);


}
void loop(){
    StartViaBluetooth();
}


void StartViaSerialMonitor(){
  if (GetCMDs_SerialMonitor()){

      Navigate(diraction, 80);
      if (iniatalisation) 
      Init(); 
      else  
      move(base_pos,axe1_pos,axe2_pos,hand);

    }else {
      Serial.println("Invalide Command"); 
    }
}

void StartViaBluetooth(){
 
  if (Serial.available() > 0 ){
        cmd = Serial.read();
        Serial.print("Recive : "); 
        Serial.println(cmd);
        ConvertCmd(cmd);
        Navigate(diraction, 120);
        move(base_pos,axe1_pos,axe2_pos,hand);
        
    }else {
      Serial.println("Invalid command ");
     }
}
void ConvertCmd(char cmd ){

  switch(cmd)
    {

      case 'F' :
                diraction = 1 ;  
                break ;
      case 'B' : 
                diraction = 2 ; 
                break ;
      case 'R' :
                diraction = 3 ;  
                break ;
      case 'L' :
                diraction = 4 ;  
                break ;
      case 'S' :
                diraction = 0 ;  
                break ;
      case 'Z' :
                base_pos++ ;  
                break ;
      case 'z' :
                base_pos-- ;  
                break ;
      case 'C' :
                axe1_pos++ ;  
                break ;
      case 'c' :
                axe1_pos-- ;  
                break ;
      case 'D' :
                axe2_pos++ ;  
                break ; 
      case 'd' :
                axe2_pos--; 
                break ;
      case 'H' :
                if (hand) hand = 0 ; 
                else hand  = 1 ;    
                break ;
      case 'I' : 
                Init();
                break ; 
      default : 
                diraction = 0 ; 
                break ; 
    }
}
int GetCMDs_SerialMonitor(){ 
    
  Serial.println("FORMAT : DIRACTION,MODE,(BASE,AXE1,AXE2,HAND(0/1))");
  while(Serial.available() == 0){
      }

  command = Serial.readString();
  int parsedCount = sscanf(command.c_str(), "%d,%d,(%d,%d,%d,%d),%d", &diraction, &is4X4, &base_pos,&axe1_pos,&axe2_pos,&hand,&iniatalisation);

      if (parsedCount == 7) {
          Serial.println("---------------------");
          Serial.println("  Parsed values:");
          Serial.print("      DIRACTION : ");
          Serial.println(diraction);
          Serial.print("      is In Mode 4X4 : ");
          if (is4X4) Serial.println("Yes"); else Serial.println("No");
          Serial.print("      Base Position  : ");
          Serial.println(base_pos);
          Serial.print("      AXE1 Position  : ");
          Serial.println(axe1_pos);
          Serial.print("      AXE2 Position  : ");
          Serial.println(axe2_pos);
          Serial.print("      HAND Position  : ");
          if (hand) Serial.println("Open"); else Serial.println("Close"); 
          Serial.print("      Init State  : ");
          if (iniatalisation) Serial.println("inialisation"); else Serial.println("No inialisation"); 
          Serial.println("---------------------");
          return 1 ;
          } else {
          // Parsing was not successful
          Serial.println("Error parsing values.");
          return -1 ; 
          }

}
void move(int base , int axe1 , int axe2 , int hand ){


  if ( base < 0 )
    base = 0 ; 
  if ( axe1 < 0 )
    axe1 = 0 ; 
  if ( axe2 < 0 )
    axe2 = 0 ; 
 
  if ( base > 180 )
    base = 180 ; 
  if ( axe1 > 180 )
    axe1 = 180 ; 
  if ( axe2 > 180 )
    axe2 = 180 ; 

  servo_claw.write(base);
  servo_bottom.write(axe1);
  servo_joint1.write(axe2);
    
  if (hand) servo_joint2.write(20); else servo_joint2.write(90); 

  delay(15);
}
void Init(){

  servo_claw.write(90);
  servo_bottom.write(0);
  servo_joint1.write(0);
  servo_joint2.write(0);
  delay(1000);

}
void Backward(int IN1 , int IN2 , int EN , int motorSpeed ){

    digitalWrite(IN1, LOW);
    digitalWrite(IN2, HIGH);
    
    analogWrite(EN, motorSpeed);

}
void Run2X4Backward(int motorSpeed ){
    
    Serial.println("Run2X4Backward");
    Backward(BackRightIN1, BackRightIN2, BackRightENA,motorSpeed);
    Backward(BackLeftIN3, BackLeftIN4, BackLeftENB,motorSpeed);

}
void Run4X4Backward(int motorSpeed ){

    Backward(FrontRightIN1, FrontRightIN2, FrontRightENA,motorSpeed);
    Backward(FrontLeftIN3, FrontLeftIN4, FrontLeftENB,motorSpeed);

    Backward(BackRightIN2, BackRightIN1, BackRightENA,motorSpeed);
    Backward(BackLeftIN3, BackLeftIN4, BackLeftENB,motorSpeed);

}
void Forward(int IN1 , int IN2 , int EN , int motorSpeed ){

  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(EN, motorSpeed);
  
}
void Run2X4Forward(int motorSpeed ){
  Serial.println("Run2X4Forward");
    Forward(BackRightIN1, BackRightIN2, BackRightENA,motorSpeed);
    Forward(BackLeftIN4, BackLeftIN3, BackLeftENB,motorSpeed);
}
void Run4X4Forward(int motorSpeed ){

    Forward(FrontRightIN1, FrontRightIN2, FrontRightENA,motorSpeed);
    Forward(FrontLeftIN3, FrontLeftIN4, FrontLeftENB,motorSpeed);

    Forward(BackRightIN2, BackRightIN1, BackRightENA,motorSpeed);
    Forward(BackLeftIN3, BackLeftIN4, BackLeftENB,motorSpeed);
}
void Stop(int IN1 , int IN2 , int EN ) {

    
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
    analogWrite(EN, Speed(0));
   
}
void StopAll(){
    
    Stop(FrontRightIN1, FrontRightIN2, FrontRightENA);
    Stop(FrontLeftIN3, FrontLeftIN4, FrontLeftENB);

    Stop(BackRightIN1, BackRightIN2, BackRightENA);
    Stop(BackLeftIN3, BackLeftIN4, BackLeftENB);
}
void TurnLeft(int motorSpeed){
  
  Serial.println("Turn Left :");
   
    Forward(FrontRightIN1, FrontRightIN2, FrontRightENA,motorSpeed);
    Forward(BackRightIN1, BackRightIN2, BackRightENA,motorSpeed);

    Backward(FrontLeftIN3, FrontLeftIN4, FrontLeftENB,motorSpeed);
    Backward(BackLeftIN4, BackLeftIN3, BackLeftENB,motorSpeed);
  

}
void TurnRight(int motorSpeed){
  
  Serial.println("Turn Right :");
 
 
    Backward(FrontRightIN1, FrontRightIN2, FrontRightENA,motorSpeed);
    Backward(BackRightIN1, BackRightIN2, BackRightENA,motorSpeed);

    Forward(FrontLeftIN3, FrontLeftIN4, FrontLeftENB,motorSpeed);
    Forward(BackLeftIN4, BackLeftIN3, BackLeftENB,motorSpeed);
   
}
int Speed(int b) {
  return map(b, 0, 100, 0, 255);
}
void Navigate(int cmd , int speed ){ 

  switch(cmd) {

        case 1  : 
                Run4X4Forward(speed);
                
                break ; 
        case 2  : 
                Run4X4Backward(speed);
                break ; 
        case 3 : 
                TurnRight(speed); 
                break ; 
        case 4 : 
                TurnLeft(speed); 
                break ; 
        default : 
                Serial.println( "Invald diraction !!"); 
                StopAll();
                break ; 
    }
}
