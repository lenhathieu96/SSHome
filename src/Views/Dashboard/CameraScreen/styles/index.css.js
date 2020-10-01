import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    zIndex: 0,
  },
  rootContainer: {
    flexDirection: 'row',
  },

  btnBack: {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    left: 20,
    transform: [{rotate: '-90deg'}],
  },

  btnTakePictureContainer: {
    position: 'absolute',
    right: 10,
    padding: 10,
    height: deviceHeight,
    zIndex: 1,
    justifyContent: 'center',
  },

  btnTakePicture: {
    transform: [{rotate: '-90deg'}],
  },
});
export default styles;
