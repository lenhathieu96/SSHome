import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {checkPermission} from './src/Utils/Permissions';
import MainRoute from './src/Routes';
import store from './src/Redux/Store';

export default function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    const result = checkPermission();
    if (result) {
      // BLEManager.start({showAlert: false});
    }
  }, []);

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
