import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {PermissionsAndroid} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import BLEManager from 'react-native-ble-manager';

import {checkPermission} from './src/Utils/Permissions';
import MainRoute from './src/Routes';
import store from './src/Redux/Store';

export default function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ).then((result) => {
      if (result) {
        BLEManager.start({showAlert: false});
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ).then((result) => {
          if (result) {
            console.log('User accept');
          } else {
            console.log('User refuse');
          }
        });
      }
    });
  });

  // NetInfo.addEventListener((state) => {
  //   dispatch(setInternetConnection(state.isConnected));
  // });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainRoute />
      </NavigationContainer>
    </Provider>
  );
}
