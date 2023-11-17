import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, StatusBar, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Home from './Home';
import BluetoothClassic from 'react-native-bluetooth-classic';

export default function Onbording ()  {

    const [onbord,setOnBord]= useState(0)

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to provide you with location-based services.',
              buttonPositive: 'OK',
            },
          );
      
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
            bording()
            // Proceed with location-based operations
          } else {
            console.error('Location permission denied');
            // Handle permission denial
          }
        } catch (error) {
          console.error('Error requesting location permission:', error);
        }
      };


const requestBluetoothConnectPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Bluetooth Connect Permission',
        message: 'This app needs access to Bluetooth connectivity to discover and connect to other devices.',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bluetooth Connect permission granted');
      // Proceed with Bluetooth-related operations
      bording()
    } else {
      console.error('Bluetooth Connect permission denied');
      // Handle permission denial
    }
  } catch (error) {
    console.error('Error requesting Bluetooth Connect permission:', error);
  }
};

const requestBluetoothScanPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Bluetooth Scan Permission',
        message: 'This app needs access to Bluetooth scanning to discover nearby devices.',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Bluetooth Scan permission granted');
      bording()
      // Proceed with Bluetooth scanning operations
    } else {
      console.error('Bluetooth Scan permission denied');
      // Handle permission denial
    }
  } catch (error) {
    console.error('Error requesting Bluetooth Scan permission:', error);
  }
};
const bording=()=>{
    console.log("--",onbord);
    setOnBord((prev) => ++prev);
    console.log("--",onbord);
}
const enableBluetooth = () => {
  BluetoothClassic.requestBluetoothEnabled()
    .then(() => {
      console.log('Bluetooth enabled');
      // Call the bording function (assuming it's defined somewhere)
      bording();
    })
    .catch((error) => {
      console.error('Error enabling Bluetooth:', error);
    });
};





if(onbord === 0){
    return(
        <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={require('../../Assets/onbording0.jpg')} style={{width:'100%',height:'100%', justifyContent:'center',alignItems:'center'}} resizeMode='cover' onPress={()=>{bording()}}>
        <Text style={styles.textTitle}>Hello In Lor COMMAND APP</Text>
        <Text style={styles.text}>Befor we start we need To get Some neccessery Permissions</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>bording()} >
        <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    )
}else if(onbord === 1){
    return(
        <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={require('../../Assets/onbording1.jpg')} style={styles.backgroundImage}>
        <Text style={styles.textTitle}>Location permission</Text>
        <Text style={styles.text}>We need permission of Location </Text>
        <TouchableOpacity style={styles.btn} onPress={()=>requestLocationPermission()} >
        <Text style={styles.btnText}>Location permission</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    )
}else if(onbord === 2){
    return(
        <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={require('../../Assets/onbording2.jpg')} style={styles.backgroundImage}>
        <Text style={styles.textTitle}>Bluetooth Scan</Text>
        <Text style={styles.text}>We need permission of Bluetooth Scan</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>requestBluetoothScanPermission()} >
        <Text style={styles.btnText} >Bluetooth Scan Permission</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    )
}else if(onbord === 3){
    return(
        <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={require('../../Assets/onbording3.jpg')} style={styles.backgroundImage}>
        <Text style={styles.textTitle}>Bluetooth Connect Permission</Text>
        <Text style={styles.text}>We need permission of Bluetooth Connect</Text>
        <TouchableOpacity style={styles.btn} >
        <Text style={styles.btnText} onPress={()=>requestBluetoothConnectPermission()}>Bluetooth Connect Permission</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    )
}else if(onbord === 4){
  return(
      <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={require('../../Assets/onbording5.jpg')} style={styles.backgroundImage}>
      <Text style={styles.textTitle}>Bluetooth Enable</Text>
      <Text style={styles.text}>We need to enable Bluetooth </Text>
      <TouchableOpacity style={styles.btn} onPress={()=>enableBluetooth()} >
      <Text style={styles.btnText}>Bluetooth Enable</Text>
      </TouchableOpacity>
      </ImageBackground>
  </View>
  )

}else if(onbord === 5){
    return(
        <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={require('../../Assets/onbording4.jpg')} style={styles.backgroundImage} resizeMode='cover'>
        <Text style={styles.textTitle}>Now shall we start our trip ?</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>bording()} >
        <Text style={styles.btnText} >Start</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
    )
}else{
  return(
    <Home />
  )
}

 
};

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    backgroundImage:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:30, 
        fontWeight:'500',
        color:'#fff',
        backgroundColor:'#211a438f',
        padding:10, 
        textAlign:'center',
        borderRadius:12,
        marginBottom:10
    },
    textTitle:{
        marginBottom:10,
        borderRadius:12,
        fontSize:40,
        fontWeight:'bold',
        color:'#fff',
        backgroundColor:'#211a438f',
        padding:10,
    },
    btn:{
        padding:30,
        backgroundColor:'#211a43',
        borderRadius:16
    },
    btnText:{
        fontSize:20, 
        fontWeight:'500',
        color:'#fff',
    }

})