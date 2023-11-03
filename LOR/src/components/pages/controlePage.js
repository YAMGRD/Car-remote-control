import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const CarRemoteControl = ({ bluetoothDevice }) => {
  // Replace 'bluetoothDevice' with the actual connected Bluetooth device

  const handleCommand = async (command) => {
    try {
      const targetServiceUUID = 'your_service_uuid'; // Replace with the actual service UUID
      const targetCharacteristicUUID = 'your_characteristic_uuid'; // Replace with the actual characteristic UUID

      if (!bluetoothDevice) {
        console.error('Bluetooth device not connected.');
        return;
      }

      // Convert the command to a byte array or any format expected by your HC-05 module.
      const dataToSend = new TextEncoder().encode(command);

      await bluetoothDevice.writeCharacteristicWithResponseForService(
        targetServiceUUID,
        targetCharacteristicUUID,
        dataToSend
      );

      console.log(`Sent command: ${command}`);
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => handleCommand('Turbo ⚡')} style={styles.topButton}>
          <Text style={{ fontSize: 50 }}>⚡</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCommand('Close arm 🔒')} style={styles.topButton}>
          <Text style={{ fontSize: 50 }}>🔒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCommand('Open arm 🔑')} style={styles.topButton}>
          <Text style={{ fontSize: 50 }}>🔑</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity
            onPressIn={() => handleCommand('up')}
            onPressOut={() => handleCommand('up Stop')}
            style={styles.button}
          >
            <Text style={{ color: '#fff', fontSize: 50 }}>▲</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => handleCommand('Down')}
            onPressOut={() => handleCommand('Down Stop')}
            style={styles.button}
          >
            <Text style={{ color: '#fff', fontSize: 50 }}>▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightButtonsContainer}>
          <TouchableOpacity onPress={() => handleCommand('left')} style={styles.button}>
            <Text style={{ color: '#fff', fontSize: 50 }}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCommand('right')} style={styles.button}>
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
