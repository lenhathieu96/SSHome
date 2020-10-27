import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';

export const addRoom = async () => {
  const homeID = await AsyncStorage.getItem('homeID');
  const roomID = `R${homeID.slice(2, 5)}${createID()}`;
  let roomData = {
    [roomID]: {
      name: 'Phòng Khách',
      id: roomID,
    },
  };
  try {
    await database().ref(homeID).update(roomData);
  } catch (error) {
    console.log(error);
  }
};

export const updateRoomBackground = async (imageURI, roomID) => {
  console.log(roomID, 'API');
  try {
    const homeID = await AsyncStorage.getItem('homeID');
    const reference = storage().ref(`/${homeID}/Rooms/${roomID}`);

    await reference.putFile(imageURI);
    const URL = await reference.getDownloadURL();
    await database().ref(`/${homeID}/${roomID}`).update({background: URL});
    return {result: true, uri: URL};
  } catch (error) {
    console.log(error);
    return {result: false};
  }
};

function createID() {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}
