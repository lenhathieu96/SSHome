import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import {setUserID} from '../Redux/ActionCreators/userActions'
import {useDispatch} from 'react-redux'

export const handleSignUp = async (signupForm) => {
  const dispatch = useDispatch()
  const userDBRef = database().ref(`MasterUser/${signupForm.homeID}`)
  const homeID = await userDBRef.once('value')
  if(homeID.val()){
    auth().createUserWithEmailAndPassword(signupForm.email, signupForm.password).then( async () => {
      let userData ={
        id: auth().currentUser.uid,
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password
      }
      await userDBRef.update(userData)
      dispatch(setUserID(auth().currentUser.uid))
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        return('Email đã tồn tại')
      }

      if (error.code === 'auth/invalid-email') {
        return ('Email không hợp lệ')
      }
        console.log(error)
        return('Không thể tạo tài khoản')
      });
  }else{
    return('Mã khách hàng không tồn tại')
  }
};

export const handleMasterLogin = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => console.log('loginSuccess'))
    .catch((err) => console.log(err));
};

export const handleMemberLogin = async (phoneNumber) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation ? confirmation : null;
};

export const confirmOTP = async (confirmation, OTPCode) => {
  console.log(confirmation, 'devH confirm');
  console.log(OTPCode, 'devH OTP');
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
  auth()
    .signOut()
    .then(() => true);
};
