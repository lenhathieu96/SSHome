import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import MainRoute from './src/Routes';
import store from './src/Redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainRoute />
      </NavigationContainer>
    </Provider>
  );
}
