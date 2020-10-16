import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';


import {setLoginStatus} from '../Redux/ActionCreators/userActions';
import {getMasterProfile, getMemberProfile} from '../Api/userAPI';

import LoginStack from './LoginStack';
import DashBoardStack from './DashboardStack';

const AuthStack = createStackNavigator();

export default function MainRoute() {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function onAuthStateChanged(user) {
    if(user){
     const userRole = await AsyncStorage.getItem('isMaster') 
     userRole ? 
      getMasterProfile(auth().currentUser.uid)
    :
      getMemberProfile("564a6546546546")
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
