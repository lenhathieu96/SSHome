import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


export const handleSignUp = async (signupForm) => {
  const userDBRef = firestore().collection('Master_User')
  const homeID = await userDBRef.doc(signupForm.homeID).get()
  if(homeID.data()){
    try{
      await auth().createUserWithEmailAndPassword(signupForm.email, signupForm.password)
      let userData ={
        id: auth().currentUser.uid,
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password
      }
      await userDBRef.doc(signupForm.homeID).set(userData)
    }
    catch(error){
      if (error.code === 'auth/email-already-in-use') {
        return('Email đã tồn tại')
      }

      if (error.code === 'auth/invalid-email') {
        return ('Email không hợp lệ')
      }
        console.log(error)
        return('Không thể tạo tài khoản')
    }
  }else{
    return('Mã khách hàng không tồn tại')
  }
  
};

export const handleMasterLogin = async (email, password) => {
  const userData = await firestore().collection('Master_User').where('email', '==', email).get()
  if(userData.docs.length > 0){
    await auth().signInWithEmailAndPassword(email, password).then(()=>console.log('Login Success')).catch(error=>{console.log(error); return ''})
  }else{
    return ('Tài Khoản Không Tồn Tại')
  }
 
};

export const handleMemberLogin = async (phoneNumber) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation ? confirmation : null;
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

export const getMasterProfile = async(userID) =>{
  const userData = await firestore().collection('Master_User').where('id', '==', userID).get()
  if(userData.docs.length > 0){
    console.log(userData.docs)
  }
}

export const getMemberProfile = async (phone) => {
  console.log(phone)
}

export const handleLogout = () => {
  auth()
    .signOut()
    .then(() => true);
};

