# React Native Car Control App with HC-05 Bluetooth README

## Introduction

This project demonstrates how to build a mobile application using React Native to control a car using Bluetooth communication with an HC-05 module. The app allows users to connect their mobile devices to a car via Bluetooth and send control commands.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js and npm installed on your machine.
- React Native development environment set up.
- An Android device for testing.
- An HC-05 Bluetooth module connected to your car.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/YAMGRD/Car-remote-control.git
   cd react-native-car-control
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Connect your mobile device to your development machine.

4. Make sure your HC-05 Bluetooth module is properly connected to your car.

5. Update Bluetooth permissions in your `AndroidManifest.xml` file:

   ```xml
    <uses-permission android:name="android.permission.BLUETOOTH"/>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
    <uses-permission-sdk-23 android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-feature android:name="android.hardware.bluetooth_le" android:required="true"/>
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN"/>
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>
   ```

6. Update your `package.json` to include the necessary dependencies:

   ```json
   "dependencies": {
   "react-native-bluetooth-classic": "^1.60.0-rc.29"
     // ... other dependencies
   }
   ```

   Run `npm install` again to install the new dependency.

7. Start the React Native development server:

   ```bash
   npx react-native start
   ```

8. Run the app on your connected device:

   For Android:

   ```bash
   npx react-native run-android
   ```


## Usage

1. Open the app on your mobile device.
2. Enable ACCESS_FINE_LOCATION Permission.
3. Enable BLUETOOTH_CONNECT Permission.
4. Enable BLUETOOTH_SCAN Permission.
5. Enable Bluetooth on your device.
6. Connect to the HC-05 module from the app.
7. Once connected, use the provided controls to send commands to your car.

## Troubleshooting

- If you encounter any issues with Bluetooth connectivity, ensure that the HC-05 module is properly connected, and permissions are set correctly.
- Check the console for error messages and consult the documentation for the `react-native-bluetooth-serial-next` library.
- Pair HC-05 module manualy then open app.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your feedback and improvements are welcome!

## License


## Acknowledgments

- This project was inspired by the need for a simple and customizable car control app using React Native and Bluetooth communication.

Happy coding! 🚗💨
