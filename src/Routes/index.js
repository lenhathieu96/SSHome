import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {
  setLoginStatus,
  setUserProfile,
} from '../Redux/ActionCreators/userActions';
import {getMasterProfile, handleLogout} from '../Api/userAPI';

import LoginStack from './LoginStack';
import DashBoardStack from './DashboardStack';

const AuthStack = createStackNavigator();

export default function MainRoute() {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    GetUserProflie();
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onAuthStateChanged(user) {
    dispatch(setLoginStatus(user ? true : false));
  }

  async function GetUserProflie() {
    const currentUser = auth().currentUser;
    const userRole = await AsyncStorage.getItem('userRole');
    //Master role
    if (userRole === 'Master') {
      const MasterUser = await getMasterProfile(currentUser.uid);
      console.log(MasterUser, 'this is master');
      dispatch(setUserProfile(MasterUser));
    }
    //Member role
    else {
      const homeID = await AsyncStorage.getItem('homeID');
      firestore()
        .collection('Home')
        .doc(homeID)
        .collection('Member')
        .where('phone', '==', auth().currentUser.phoneNumber)
        .onSnapshot((document) => {
          const UserData = document.docs[0];
          if (UserData) {
            let MemberUser = {
              name: UserData.data().name,
              phone: UserData.data().phone,
              email: UserData.data().email,
            };
            dispatch(setUserProfile(MemberUser));
          } else {
            handleLogout();
          }
        });
    }
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
