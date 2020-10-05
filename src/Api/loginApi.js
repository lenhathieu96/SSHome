import auth from '@react-native-firebase/auth';

export const handleSignUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
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
};

export const handleMasterLogin = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => console.log('loginSuccess'))
    .catch((err) => console.log(err));
};

export const handleMemberLogin = async (phoneNumber) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  console.log(confirmation);
};

export const handleLogout = () => {
  auth()
    .signOut()
    .then(() => true);
};
