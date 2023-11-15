import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';
import CarRemoteControl from './components/pages/controlePage';

const App = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Check if Bluetooth is available
    BluetoothClassic.isBluetoothAvailable()
      .then((available) => {
        if (available) {
          console.log('Bluetooth is available');

          // Check if Bluetooth is enabled
          BluetoothClassic.isBluetoothEnabled()
            .then((enabled) => {
              if (enabled) {
                console.log('Bluetooth is enabled');

                // Get a list of paired devices
                BluetoothClassic.getBondedDevices()
                  .then((devices) => {
                    setPairedDevices(devices);
                  })
                  .catch((error) => {
                    console.error('Error getting paired devices:', error);
                  });

                // Start scanning for new devices
                BluetoothClassic.startScan()
                  .then(() => {
                    console.log('Started scanning for Bluetooth devices');
                  })
                  .catch((error) => {
                    console.error('Error starting scan:', error);
                  });
              } else {
                console.log('Bluetooth is not enabled');
              }
            })
            .catch((error) => {
              console.error('Error checking Bluetooth state:', error);
            });
        } else {
          console.log('Bluetooth is not available on this device');
        }
      })
      .catch((error) => {
        console.error('Error checking Bluetooth availability:', error);
      });
  }, []);

  const handleConnect = (device) => {
    BluetoothClassic.connectToDevice(device.id)
      .then(() => {
        setConnectedDevice(device);
        console.log('Connected to Bluetooth device:', device.name);
        setIsConnected(true)
      })
      .catch((error) => {
        console.error('Error connecting to Bluetooth device:', error);
        setIsConnected(false)
      });
  };

  const renderPairedDevice = ({ item }) => (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
      <Text>{item.name}</Text>
      <Text>{item.address}</Text>
      <Button onPress={() => handleConnect(item)} title="Connect" />
    </View>
  );

  const renderScannedDevice = ({ item }) => (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
      <Text>{item.name}</Text>
      <Text>{item.address}</Text>
      <Button disabled={connectedDevice} onPress={() => handleConnect(item)} title="Connect" />
    </View>
  );

  const handleSendMessage = () => {
    if (connectedDevice) {
      BluetoothClassic.write(connectedDevice.id, 'h')
        .then(() => {
          console.log('Message sent successfully');
          setMessage(''); // Clear message input field
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };
  const handleControlCar = (command) => {
    console.log("handle Controle Car Function");
    if (connectedDevice) {
      const data = JSON.stringify({ command });
      BluetoothClassic.writeToDevice(connectedDevice.id, data)
        .then(() => {
          console.log('Control command sent successfully:', command);
        })
        .catch((error) => {
          console.error('Error sending control command:', error);
        });
    }
  };
  if(isConnected){
    return(
      <CarRemoteControl connectedDevice={connectedDevice}/>
    )
  }
 return (
    <View style={{flex:1}}>
      <Text style={{fontSize:20}}>Paired Devices</Text>
      <FlatList
        data={pairedDevices}
        renderItem={renderPairedDevice}
        keyExtractor={(item) => item.address}
      />

      <Text style={{fontSize:20}}> Scanned Devices</Text>
      <FlatList
        data={scannedDevices}
        renderItem={renderScannedDevice}
        keyExtractor={(item) => item.address}
      />
    </View>
  );
};

export default App;
