import React, { useEffect, useState } from 'react';
import { View,TouchableOpacity, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';

const CarRemoteControl = ({ connectedDevice }) => {
  const [toggleArm, setToggleArm]= useState(true);
const axe = [
  {axeI:require('../../Assets/number1.png'),commandP:'Z',commandM:'z',init:'V'},
  {axeI:require('../../Assets/number2.png'),commandP:'C',commandM:'c',init:'N'},
  {axeI:require('../../Assets/number3.png'),commandP:'D',commandM:'d',init:'T'},
]
useEffect(()=>{
  handleControlCar('I');
  handleControlCar('S');
},[])

const renderItem =({item})=>{
  return(
  <View style={[styles.leftButtonsContainer,{marginRight:10,marginLeft:0}]}>
  <TouchableOpacity
    onPressIn={() => handleControlCar(item.commandP)}
    onPressOut={()=>handleControlCar('S')}
      style={[styles.button,{marginBottom:10}]}
    >
    <Image source={require('../../Assets/plus.png')} style={{width:'100%',height:'100%'}} />
    </TouchableOpacity>
  <TouchableOpacity
  onPress={()=>handleControlCar(item.init)}
      style={[styles.button,{marginBottom:10}]}
    >
    <Image source={item.axeI} style={{width:'100%',height:'100%'}} />
    </TouchableOpacity>
  <TouchableOpacity
    onPressIn={() => handleControlCar(item.commandM)}
    onPressOut={()=>handleControlCar('S')}
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
      //handleConrol()
      setToggleArm((prev) => !prev);
      const command = toggleArm ? 'H' : 'h';
      handleControlCar(command);
    };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity
          onPressIn={() => handleControlCar('B')}
          onPressOut={()=>handleControlCar("S")}
          style={styles.button}
          >
          <Image source={require('../../Assets/arrowF.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
          <View style={styles.rightButtonsContainer}>
          <TouchableOpacity
          onPressIn={() => handleControlCar('R')}
          onPressOut={()=>handleControlCar("S")}
          style={styles.button}>
          <Image source={require('../../Assets/arrowL.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
          <TouchableOpacity
          onPressIn={() => handleControlCar('L')}
          onPressOut={()=>handleControlCar("S")}
          style={styles.button}>
          <Image source={require('../../Assets/arrowR.png')} style={{width:'100%',height:'100%'}} />
          </TouchableOpacity>
        </View>
          <TouchableOpacity
          onPressIn={() => handleControlCar('F')}
          onPressOut={()=>handleControlCar("S")}
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
