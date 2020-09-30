import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  picture: {
    flex: 1,
    zIndex: 0,
  },
  btnTakePicture: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'space-evenly',
    bottom: 10,
    alignSelf: 'center',
  },
  txtButton: {
    marginHorizontal: 10,
    backgroundColor: Color.unactive,
  },
});
export default styles;
