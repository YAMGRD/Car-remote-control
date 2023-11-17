import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import BluetoothClassic from 'react-native-bluetooth-classic';
import CarRemoteControl from './controlePage';

const Home = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
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
                BluetoothClassic.startDiscovery()
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
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' , flexDirection:'row',justifyContent:'space-between' }}>
      <View>
      <Text style={{fontSize:20,fontWeight:'bold', color:'#fff'}}>{item.name}</Text>
      <Text style={{fontSize:20,fontWeight:'bold', color:'#fff'}}>{item.address}</Text>
      </View>
      <TouchableOpacity style={item.name==='HC-05'?{backgroundColor:'#1f8107', padding:10 , width:70, height:70}:{backgroundColor:'#f22', padding:10 , width:70, height:70}} onPress={() => handleConnect(item)}>
        <Image source={require('../../Assets/link.png')} style={{width:'100%', height:'100%'}}  />
      </TouchableOpacity>
    </View>
  );

  const renderScannedDevice = ({ item }) => (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
      <Text style={{fontSize:20,fontWeight:'bold', color:'#fff'}}>{item.name}</Text>
      <Text style={{fontSize:20,fontWeight:'bold', color:'#fff'}}>{item.address}</Text>
      <Button disabled={connectedDevice} onPress={() => handleConnect(item)} title="Connect" />
    </View>
  );


  if(isConnected){
    return(
      <CarRemoteControl connectedDevice={connectedDevice}/>
    )
  }
 return (
    <View style={{flex:1}}>
      <Text style={{fontSize:30,color:'#fff',fontWeight:'bold',marginLeft:10}}>Paired Devices</Text>
      <FlatList
        data={pairedDevices}
        renderItem={renderPairedDevice}
        keyExtractor={(item) => item.address}
      />

<Text style={{fontSize:30,color:'#fff',fontWeight:'bold',marginLeft:10}}> Scanned Devices</Text>
      <FlatList
        data={scannedDevices}
        renderItem={renderScannedDevice}
        keyExtractor={(item) => item.address}
      />
    </View>
  );
};

export default Home;
