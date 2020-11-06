import React, {useEffect} from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import BLEManager from 'react-native-ble-manager';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';

import {setLoginStatus} from '../Redux/ActionCreators/userActions';
import {
  setInternetConnection,
  setBLConnection,
} from '../Redux/ActionCreators/hardwareActions';

import LoginStack from './LoginStack';
import DashBoardStack from './DashboardStack';

const AuthStack = createStackNavigator();
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function MainRoute() {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.user);

  useEffect(() => {
    listenConnection();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onAuthStateChanged(user) {
    dispatch(setLoginStatus(user ? true : false));
  }

  const listenConnection = () => {
    BLEManager.start({showAlert: false});
    BLEManager.checkState();
    bleManagerEmitter.addListener('BleManagerDidUpdateState', (args) => {
      let status = args.state;
      switch (status) {
        case 'off':
          dispatch(setBLConnection(false));
          break;
        case 'on':
          dispatch(setBLConnection(true));
          break;
        default:
          break;
      }
      NetInfo.addEventListener((state) => {
        dispatch(setInternetConnection(state.isConnected));
      });
    });
  };

  return (
    <AuthStack.Navigator initialRouteName="LoginStack">
      {UserProfile.isLogin ? (
        <AuthStack.Screen
          name="DashBoardStack"
          component={DashBoardStack}
          options={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      ) : (
        <AuthStack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
        />
      )}

      {/*   */}
    </AuthStack.Navigator>
  );
}
