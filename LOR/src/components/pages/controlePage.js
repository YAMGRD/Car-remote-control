import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';

const CarRemoteControl = ({ connectedDevice }) => {
    console.log('Control page');
    const handleControlCar = (command) => {
      console.log("handle Controle Car Function");
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

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => handleControlCar('Turbo ⚡')} style={styles.topButton}>
          <Text style={{ fontSize: 50 }}>⚡</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleControlCar('Close arm 🔒')} style={styles.topButton}>
          <Text style={{ fontSize: 50 }}>🔒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleControlCar('Open arm 🔑')} style={styles.topButton}>
          <Text style={{ fontSize: 50 }}>🔑</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity
            onPressIn={() => handleControlCar('up')}
            onPressOut={() => handleControlCar('up Stop')}
            style={styles.button}
          >
            <Text style={{ color: '#fff', fontSize: 50 }}>▲</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handleControlCar('Down')}
            onPressOut={() => handleControlCar('Down Stop')}
            style={styles.button}
          >
            <Text style={{ color: '#fff', fontSize: 50 }}>▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightButtonsContainer}>
          <TouchableOpacity onPress={() => handleControlCar('left')} style={styles.button}>
            <Text style={{ color: '#fff', fontSize: 50 }}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleControlCar('right')} style={styles.button}>
            <Text style={{ color: '#fff', fontSize: 50 }}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const buttonStyle = {
  width: 100,
  height: 100,
  backgroundColor: '#007bff',
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 300,
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
    margin: 10,
  },
});

export default CarRemoteControl;
