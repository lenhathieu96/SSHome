import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {setLoginStatus} from '../Redux/ActionCreators/userActions';

import LoginStack from './LoginStack';
import DashBoardStack from './DashboardStack';

const AuthStack = createStackNavigator();

export default function MainRoute() {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onAuthStateChanged(user) {
    dispatch(setLoginStatus(user ? true : false));
  }

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
