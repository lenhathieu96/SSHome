import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {ModalProvider} from './src/Context/ModalContext';
import {NavigationContainer} from '@react-navigation/native';

import {checkPermission} from './src/Utils/Permissions';
import MainRoute from './src/Routes';
import store from './src/Redux/Store';

export default function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    const result = checkPermission();
  }, []);

  // NetInfo.addEventListener((state) => {
  //   dispatch(setInternetConnection(state.isConnected));
  // });

  return (
    <Provider store={store}>
      <ModalProvider>
        <NavigationContainer>
          <MainRoute />
        </NavigationContainer>
      </ModalProvider>
    </Provider>
  );
}
