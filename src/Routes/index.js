import React, {useEffect, useContext} from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import DashboardStack from './DashboardStack';
import LoginScreen from '../Views/LoginScreen';

// import {AuthContext} from '../Contexts/AuthContext';

const AuthStack = createStackNavigator();

export default function MainRoute() {
  //   const context = useContext(AuthContext);

  //   const restoreToken = async () => {
  //     try {
  //       let token = await AsyncStorage.getItem('accessToken');
  //       context.setLogin(token ? true : false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     restoreToken();
  //   }, []);

  return (
    <AuthStack.Navigator initialRouteName="DashboardStack">
      {/*  {!context.isLogin ? ( */}
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      {/*   ) : ( */}
      <AuthStack.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}}
      />
      {/* )} */}
    </AuthStack.Navigator>
  );
}
