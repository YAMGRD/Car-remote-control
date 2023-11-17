import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';

const CarRemoteControl = ({ connectedDevice }) => {
  const [toggleArm, setToggleArm]= useState(true);
  const [toggleSpeed, setToggleSpeed]= useState(false);
const axe = [
  {axeI:require('../../Assets/number1.png'),commandP:'+1',commandM:'-1'},
  {axeI:require('../../Assets/number2.png'),commandP:'+2',commandM:'-2'},
  {axeI:require('../../Assets/number3.png'),commandP:'+3',commandM:'-3'},
]

const renderItem =({item})=>{
  return(
  <View style={[styles.leftButtonsContainer,{marginRight:10,marginLeft:0}]}>
  <TouchableOpacity
    onPressIn={() => handleControlCar(item.commandP)}
    onPressOut={()=>handleControlCar("stop")}
      style={[styles.button,{marginBottom:10}]}
    >
    <Image source={require('../../Assets/plus.png')} style={{width:'100%',height:'100%'}} />
    </TouchableOpacity>
  <TouchableOpacity
      style={[styles.button,{marginBottom:10}]}
    >
    <Image source={item.axeI} style={{width:'100%',height:'100%'}} />
    </TouchableOpacity>
  <TouchableOpacity
    onPressIn={() => handleControlCar(item.commandM)}
    onPressOut={()=>handleControlCar("stop")}
      style={[styles.button,{marginBottom:10}]}
    >
    <Image source={require('../../Assets/minus.png')} style={{width:'100%',height:'100%'}} />
    </TouchableOpacity>
  </View>
)}

    const handleControlCar = (command) => {  
      console.log(command);    
      if (connectedDevice) {
        const data = JSON.stringify({ command });
        BluetoothClassic.writeToDevice(connectedDevice.id, command)
          .then(() => {
            console.log('Control command sent successfully:', command);
          })
          .catch((error) => {
            console.error('Error sending control command:', error);
          });
      }
    };

    const onToggleArm = () => {
      setToggleArm((prev) => !prev);
      const command = toggleArm ? 'close' : 'open';
      handleControlCar(command);
    };
    const onToggleSpeed = () => {
      setToggleSpeed((prev) => !prev);
      const command = toggleSpeed ? '4*4' : '2*4';
      handleControlCar(command);
    };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity
          onPressIn={() => handleControlCar('u')}
          onPressOut={()=>handleControlCar("stop")}
          style={styles.button}
          >
          <Image source={require('../../Assets/arrowF.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
          <View style={styles.rightButtonsContainer}>
          <TouchableOpacity
          onPressIn={() => handleControlCar('l')}
          onPressOut={()=>handleControlCar("stop")}
          style={styles.button}>
          <Image source={require('../../Assets/arrowL.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
          <TouchableOpacity
          onPressIn={() => handleControlCar('r')}
          onPressOut={()=>handleControlCar("stop")}
          style={styles.button}>
          <Image source={require('../../Assets/arrowR.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
        </View>
          <TouchableOpacity
          onPressIn={() => handleControlCar('d')}
          onPressOut={()=>handleControlCar("stop")}
            style={styles.button}
          >
          <Image source={require('../../Assets/arrowD.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent:'center', marginLeft:20,alignItems:'center'}}>
          {toggleArm ?(
                    <TouchableOpacity onPress={() =>onToggleArm()} style={styles.topButton}>
                    <Image source={require('../../Assets/robot-arm.png')} style={{width:'100%',height:'100%'}} />
                    </TouchableOpacity>
          ):(
            <TouchableOpacity onPress={() =>onToggleArm()} style={styles.topButton}>
            <Image source={require('../../Assets/robot-armO.png')} style={{width:'100%',height:'100%'}} />
            </TouchableOpacity>
          )}
          <View style={styles.rightButtonsContainer}>
          {toggleSpeed ?(
                    <TouchableOpacity onPress={() =>onToggleSpeed()} style={styles.topButton}>
                    <Image source={require('../../Assets/car.png')} style={{width:'100%',height:'100%'}} />
                    </TouchableOpacity>
          ):(
            <TouchableOpacity onPress={() =>onToggleSpeed()} style={styles.topButton}>
            <Image source={require('../../Assets/sedan.png')} style={{width:'100%',height:'100%'}} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
          onPress={() => handleControlCar('init')}
          style={styles.button}>
          <Image source={require('../../Assets/init.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
        </View>
        </View>
        <>
        <FlatList
          data={axe}
          renderItem={(item) => renderItem(item)}
          style={{  }}
          contentContainerStyle={{ flexDirection: 'row', justifyContent: 'center' }}
        />
        </>
      </View>
    </View>
  );
};

const buttonStyle = {
  width: 70,
  height: 70,
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
  //backgroundColor:'darkgreen'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  leftButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButton: {
    ...buttonStyle,
    margin: 10,
  },
  button: {
    ...buttonStyle,
    margin: 0,
  },
});

export default CarRemoteControl;
