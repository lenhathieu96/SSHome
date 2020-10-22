import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import {Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export const handleMasterSignUp = async (signupForm) => {
  const userDBRef = firestore().collection('Home');
  const homeID = await userDBRef.doc(signupForm.homeID).get();
  if (homeID.data()) {
    try {
      await AsyncStorage.setItem('userRole', 'Master');
      await auth().createUserWithEmailAndPassword(
        signupForm.email,
        signupForm.password,
      );
      let userData = {
        id: auth().currentUser.uid,
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password,
      };
      await userDBRef.doc(signupForm.homeID).set(userData);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return 'Email đã tồn tại';
      }

      if (error.code === 'auth/invalid-email') {
        return 'Email không hợp lệ';
      }
      console.log(error);
      return 'Không thể tạo tài khoản';
    }
  } else {
    return 'Mã khách hàng không tồn tại';
  }
};

export const handleMasterLogin = async (email, password) => {
  const userData = await firestore()
    .collection('Home')
    .where('email', '==', email)
    .get();
  if (userData.docs.length > 0) {
    try {
      await AsyncStorage.setItem('userRole', 'Master');
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      return '';
    }
  } else {
    return 'Tài Khoản Không Tồn Tại';
  }
};

export const handleMasterForgotPassword = async (email) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => console.log(error));
};

export const hanldeMemberSignUp = async (homeID, signupForm) => {
  try {
    await firestore()
      .collection('Home')
      .doc(homeID)
      .collection('Member')
      .add(signupForm);
    console.log('add Member Success');
  } catch (error) {
    console.log('error while create new member: ', error);
    return '';
  }
};

export const getMemberList = async () => {
  const homeIDStorage = await AsyncStorage.getItem('homeID');
  try {
    let Users = [];
    const data = await firestore()
      .collection('Home')
      .doc(homeIDStorage)
      .collection('Member')
      .get();
    data.docs.forEach((userData) => {
      let user = {
        id: userData.id,
        ...userData.data(),
      };
      Users.push(user);
    });
    return Users;
  } catch (error) {
    console.log(error);
  }
};

export const handleMemberLogin = async (phoneNumber, homeID) => {
  const User = await firestore()
    .collection('Home')
    .doc(homeID)
    .collection('Member')
    .where('phone', '==', `+84${phoneNumber}`)
    .get();
  if (User.docs.length > 0) {
    try {
      await AsyncStorage.setItem('userRole', 'Member');
      await AsyncStorage.setItem('homeID', homeID);
      const confirmation = await auth().signInWithPhoneNumber(
        `+84${phoneNumber}`,
      );
      return {success: confirmation ? confirmation : null};
    } catch (error) {
      if (error.code === 'auth/invalid-phone-number') {
        return {error: 'Số điện thoại không hợp lệ'};
      }
      if (error.code === 'auth/too-many-requests') {
        return {error: 'Quá số lần quy định'};
      }
      console.log(error);
      return {error: ''};
    }
  } else {
    return {error: 'Tài Khoản Không Tồn Tại'};
  }
};

export const confirmOTP = async (confirmation, OTPCode) => {
  try {
    const res = await confirmation.confirm(OTPCode);
    if (res) {
      console.log('login success', res);
    }
  } catch (error) {
    console.log('OTP Auth Err', error);
  }
};

export const getMasterProfile = async (userID) => {
  const User = await firestore()
    .collection('Home')
    .where('id', '==', userID)
    .get();
  if (User.docs.length > 0) {
    const UserData = User.docs[0];
    await AsyncStorage.setItem('homeID', UserData.id);
    const rooms = await database().ref(UserData.id).once('value');

    return {
      name: UserData.data().name,
      phone: UserData.data().phone,
      email: UserData.data().email,
      avatar: UserData.data().avatar,
      availableRoom: Object.values(rooms.val()),
    };
  }
};

export const getMemberProfile = async (phone) => {
  const homeID = await AsyncStorage.getItem('homeID');
  const User = await firestore()
    .collection('Home')
    .doc(homeID)
    .collection('Member')
    .where('phone', '==', phone)
    .get();
  if (User.docs.length > 0) {
    const result = [];
    const UserData = User.docs[0];
    const userAvailableRooms = UserData.data().availableRoom;
    const roomlist = await database().ref(homeID).once('value');

    userAvailableRooms.forEach((roomID) => {
      for (const room in roomlist.val()) {
        if (room === roomID) {
          result.push(roomlist.val()[room]);
        }
      }
    });

    return {
      name: UserData.data().name,
      phone: UserData.data().phone,
      email: UserData.data().email,
      availableRoom: result,
    };
  }
};

export const uploadMasterAvatar = async (imageURI) => {
  const homeID = await AsyncStorage.getItem('homeID');
  // const filename = imageURI.substring(imageURI.lastIndexOf('/') + 1);
  // const uploadUri =
  //   Platform.OS === 'ios' ? imageURI.replace('file://', '') : imageURI;

  const reference = storage().ref(`/${homeID}/Master`);
  try {
    await reference.putFile(imageURI);
    const URL = await reference.getDownloadURL();
    await firestore().collection('Home').doc(homeID).update({avatar: URL});
    return {result: true, uri: URL};
  } catch (error) {
    console.log(error);
    return {result: false};
  }
};

export const handleLogout = () => {
  AsyncStorage.removeItem('userRole');
  auth()
    .signOut()
    .then(() => true);
};
