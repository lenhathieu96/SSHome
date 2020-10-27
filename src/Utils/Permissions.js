import {Platform, Alert} from 'react-native';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const checkPermission = async () => {
  await checkMultiple(
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.CAMERA]
      : [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ],
  ).then((result) => {
    console.log(result, ' user permisson');
    switch (result) {
      case RESULTS.GRANTED:
        console.log('All permissions granted');
        return true;
      default:
        requestPermission();
        break;
    }
  });
};

const requestPermission = async () => {
  await requestMultiple(
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.CAMERA]
      : [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ],
  )
    .then((result) => {
      console.log(result, 'request result');
      if (result === 'granted') {
        // getDriverLocation();
      }
    })
    .catch((err) => {
      Alert.alert('Có Lỗi Xảy Ra');
      console.log(err);
    });
};
