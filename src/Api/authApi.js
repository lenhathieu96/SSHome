import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export const handleSignUp = async (signupForm) => {
  console.log(signupForm)
  const userID = await firestore().collection('Users').doc(signupForm.customerID).get()
  if(userID.data()){
    auth()
    .createUserWithEmailAndPassword(signupForm.email, signupForm.password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
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
