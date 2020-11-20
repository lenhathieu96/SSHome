import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
const APPID = '0fb25e211281a90b0df6aef6ab6224c3';

export const getCurrentWeather = async (lat, long) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APPID}`;
  try {
    const homeID = await AsyncStorage.getItem('homeID');
    const response = await fetch(URL);
    const indoorTemp = await database()
      .ref(`/${homeID}/DHT22/Temperature`)
      .once('value');
    const weatherData = await response.json();
    if (weatherData && indoorTemp.val()) {
      return {
        result: true,
        message: 'Lấy dữ liệu thời tiết thành công',
        data: {
          indoorTemp: Math.floor(indoorTemp.val()),
          temp: weatherData.main.temp,
          main: weatherData.weather[0].main,
          desc: weatherData.weather[0].description,
        },
      };
    }
  } catch (error) {
    return {result: false, message: 'Lỗi khi lấy dữ liệu thời tiết'};
  }
};

//Auth Management===================================================================================
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
      return {result: true, message: 'Đăng nhập thành công'};
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        return {result: false, message: 'Sai mật khẩu'};
      }
      console.log(error);
      return {result: false, message: ''};
    }
  } else {
    return {result: false, message: 'Tài khoản không tồn tại'};
  }
};

export const handleMasterForgotPassword = async (email) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => console.log('email sent'))
    .catch((error) => console.log(error));
};

export const handleMemberLogin = async (phoneNumber, homeID) => {
  console.log(homeID);
  let phone = phoneNumber.slice(1);
  const User = await firestore()
    .collection('Home')
    .doc(homeID)
    .collection('Member')
    .where('phone', '==', `+84${phone}`)
    .get();
  if (User.docs.length > 0) {
    try {
      await AsyncStorage.setItem('userRole', 'Member');
      await AsyncStorage.setItem('homeID', homeID);
      const confirmation = await auth().signInWithPhoneNumber(`+84${phone}`);
      return {
        result: true,
        message: '',
        data: confirmation ? confirmation : null,
      };
    } catch (error) {
      if (error.code === 'auth/invalid-phone-number') {
        return {result: false, message: 'Số điện thoại không hợp lệ'};
      }
      if (error.code === 'auth/too-many-requests') {
        return {result: false, message: 'Quá số lần quy định'};
      }
      console.log(error);
      return {result: false, message: ''};
    }
  } else {
    return {result: false, message: 'Tài khoản không tồn tại'};
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

export const handleLogout = () => {
  AsyncStorage.clear();
  auth().signOut();
};

export const getMasterProfile = async (userID) => {
  try {
    const User = await firestore()
      .collection('Home')
      .where('id', '==', userID)
      .get();
    if (User.docs.length > 0) {
      const UserData = User.docs[0];
      await AsyncStorage.setItem('homeID', UserData.id);
      const homeData = await database().ref(UserData.id).once('value');
      const rooms = homeData.val();
      delete rooms.DHT22;
      return {
        result: true,
        message: 'Lấy dữ liệu chủ nhà thành công',
        data: {
          name: UserData.data().name,
          phone: UserData.data().phone,
          email: UserData.data().email,
          avatar: UserData.data().avatar,
          availableRooms: Object.values(rooms),
        },
      };
    } else {
      return {
        result: false,
        message: 'Không tồn tại tài khoản chủ nhà',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      result: false,
      message: 'Lấy dữ liệu chủ nhà thất bại',
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
    const userAvailableRooms = UserData.data().availableRooms;
    const roomlist = await database().ref(homeID).once('value');

    userAvailableRooms.forEach((roomID) => {
      for (const room in roomlist.val()) {
        if (room === roomID) {
          result.push(roomlist.val()[room]);
        }
      }
    });

    return {
      result: true,
      message: 'Lấy dữ liệu thành viên thành công',
      data: {
        name: UserData.data().name,
        phone: UserData.data().phone,
        email: UserData.data().email,
        availableRooms: result,
      },
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
    return {
      result: true,
      message: 'Cập nhập thành công',
      uri: URL,
    };
  } catch (error) {
    console.log(error);
    return {result: false, mesage: 'Cập Nhập thất bại'};
  }
};

//Member Management===================================================================================

export const configMember = async (member, isUpdate) => {
  const homeID = await AsyncStorage.getItem('homeID');
  //Check user exists
  const Member = await firestore()
    .collection('Home')
    .doc(homeID)
    .collection('Member')
    .doc(member.id)
    .get();
  if (isUpdate) {
    if (Member.data()) {
      try {
        await firestore()
          .collection('Home')
          .doc(homeID)
          .collection('Member')
          .doc(member.id)
          .update(member);
        return {result: true, message: 'Cập Nhập thành viên thành công'};
      } catch (error) {
        console.log(error);
        return {result: false, message: 'Cập Nhập thành viên thất bại'};
      }
    }
  } else {
    //add new member
    if (Member.data()) {
      return {result: false, message: 'Số điện thoại đã tồn tại'};
    } else {
      let newMember = {
        ...member,
        phone: `+84${member.phone.slice(1)}`,
      };
      try {
        await firestore()
          .collection('Home')
          .doc(homeID)
          .collection('Member')
          .add(newMember);
        return {result: true, message: 'Tạo thành viên thành công'};
      } catch (error) {
        console.log(error);
        return {result: false, message: 'Tạo thành viên thất bại'};
      }
    }
  }
};

export const deleteMember = async (memberID) => {
  const homeID = await AsyncStorage.getItem('homeID');
  console.log(memberID);
  try {
    await firestore()
      .collection('Home')
      .doc(homeID)
      .collection('Member')
      .doc(memberID)
      .delete();
    return {result: true, message: 'Xoá thành viên thành công'};
  } catch (error) {
    return {result: false, message: 'Xoá thành viên thất bại'};
  }
};
