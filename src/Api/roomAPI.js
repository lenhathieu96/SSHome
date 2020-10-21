import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

export const addRoom = async () => {
  const homeID = await AsyncStorage.getItem('homeID');
  const roomID = `R${homeID.slice(2, 5)}${createID()}`;
  let roomData = {
    [roomID]: {
      name: 'Phòng Khách',
    },
  };
  try {
    await database().ref(homeID).update(roomData);
  } catch (error) {
    console.log(error);
  }
};

export const getRoom_Master = async () => {
  const homeID = await AsyncStorage.getItem('homeID');
  const rooms = await database().ref(homeID).once('value');
  console.log(rooms);
};

function createID() {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}
