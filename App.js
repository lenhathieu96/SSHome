import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
// import {setInternetConnection} from './src/Redux/ActionCreators/hardwareActions';
import BleManager from 'react-native-ble-manager';
// import NetInfo from '@react-native-community/netinfo';

import MainRoute from './src/Routes';
import store from './src/Redux/Store';

export default function App() {
  // const dispatch = useDispatch();

  BleManager.start({showAlert: false});
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
