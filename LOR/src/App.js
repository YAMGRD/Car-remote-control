import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx'; // Import the BLE manager library
import CarRemoteControl from './components/pages/controlePage';

export default function App() {
  const [isGranted, setIsGranted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Not granted");
  const manager = new BleManager();

  useEffect(() => {
    // Check Bluetooth permission when the component mounts
    checkBluetoothPermission();
  }, []);

  const requestBluetoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,        
        {
          title: 'To control Car APP needs access to Bluetooth',
          message: 'Car Remote Control App needs access to Bluetooth',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Bluetooth');
        setStatusMessage("Bluetooth permission granted");
        setIsGranted(true);
        enableBluetooth();
      } else {
        console.log('Bluetooth permission denied');
        setStatusMessage("Bluetooth permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkBluetoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check('android.permission.BLUETOOTH_CONNECT');
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bluetooth permission granted');
        setStatusMessage("Bluetooth permission granted");
        setIsGranted(true);
        enableBluetooth();
      } else {
        console.log('Bluetooth permission denied2');
        setStatusMessage("Bluetooth permission denied2");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const enableBluetooth = async () => {
    try {
      if (Platform.OS === 'android') {
        const isEnabled = await manager.state();
        if (isEnabled !== 'PoweredOn') {
          await manager.enable();
          setStatusMessage("Bluetooth enabled");
          scanAndConnect();
        } else {
          setStatusMessage("Bluetooth already enabled");
          scanAndConnect();
        }
      } else {
        setStatusMessage("Bluetooth enabled (iOS)");
        scanAndConnect();
      }
    } catch (error) {
      console.error('Error enabling Bluetooth', error);
    }
  };

  const scanAndConnect = async () => {
    const DEVICE_NAME = "HC-05";
    console.log('====================================');
    console.log("---",manager.discoverAllServicesAndCharacteristicsForDevice(DEVICE_NAME));
    try {
      await manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error('Error scanning for devices', error);
          return;
        }

        if (device.name === DEVICE_NAME) {
          console.log("find device");
          manager.stopDeviceScan();
          manager.connectToDevice(device);
        }
      });
    } catch (error) {
      console.error('Error starting device scan', error);
    }
  };

  const connectToDevice = async (device) => {
    try {
      await device.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to device', error);
    }
  };
  
  if (!isGranted) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.item}>Try permissions</Text>
        <Text style={{ color: "#000", textAlign: 'center' }}>PERMISSIONS Status: {isGranted ? (<Text style={{ color: "darkgreen" }}>OK</Text>) :
          (<Text style={{ color: "#f00" }}>No</Text>)
        }</Text>
        <Button title="Request permissions" onPress={requestBluetoothPermission} />
        <Text style={{ color: "#000", textAlign: 'center' }}>{statusMessage}</Text>
      </View>
    );
  } else if (!isConnected) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.item}>Connecting to HC-05 Arduino...</Text>
        <ActivityIndicator size={'large'}  />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <CarRemoteControl />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f58',
  },
});
