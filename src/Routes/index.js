import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {
  setLoginStatus,
  setUserProfile,
} from '../Redux/ActionCreators/userActions';
import {getMasterProfile, getMemberProfile, handleLogout} from '../Api/userAPI';

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
    if (user) {
      const userRole = await AsyncStorage.getItem('userRole');
      if (userRole === 'Master') {
        const UserData = await getMasterProfile(auth().currentUser.uid);
        dispatch(setUserProfile(UserData));
      } else {
        if (UserProfile.phone) {
          const homeID = await AsyncStorage.getItem('homeID');
          const UserData = await getMemberProfile(UserProfile.phone, homeID);
          if (UserData) {
            console.log(UserData);
            dispatch(setUserProfile(UserData));
          }else{
            console.log(UserData, 'user data')
          }
        }
      }
    }
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
