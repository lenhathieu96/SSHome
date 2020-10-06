import React, {useEffect, useState} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

import {setLoginStatus} from '../Redux/ActionCreators/userActions';

import LoginStack from './LoginStack';
import MasterStack from './MasterStack';
import MemberStack from './MemberStack';

// import {AuthContext} from '../Contexts/AuthContext';

const AuthStack = createStackNavigator();

export default function MainRoute() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    dispatch(setLoginStatus(user ? true : false));
  }

  return (
    <AuthStack.Navigator initialRouteName="LoginStack">
      {userStatus.isLogin ? (
        userStatus.isAdmin ? (
          <AuthStack.Screen
            name="MasterStack"
            component={MasterStack}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        ) : (
          <AuthStack.Screen
            name="MemberStack"
            component={MemberStack}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        )
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
