import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
// import {setInternetConnection} from './src/Redux/ActionCreators/hardwareActions';
import BleManager from 'react-native-ble-manager';
// import NetInfo from '@react-native-community/netinfo';

import MainRoute from './src/Routes';
import store from './src/Redux/Store';

import Color from './src/Utils/Color';

export default function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    if (Platform.OS === 'android') {
      checkPermission();
    }
  }, []);

  const checkPermission = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ).then((result) => {
      if (result) {
        BleManager.start({showAlert: false});
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ).then((result) => {
          if (result) {
            BleManager.start({showAlert: false});
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
  };
  // NetInfo.addEventListener((state) => {
  //   dispatch(setInternetConnection(state.isConnected));
  // });

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainRoute />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
