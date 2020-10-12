import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../../../../Utils/Color';
import * as fontSize from '../../../../../Utils/FontSize';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  BtnContainer: {
    padding: 10,
    backgroundColor: 'transparent',
    height: 0.55 * height,
    width: 0.7 * width,
  },

  contentContainer: {
    padding: 10,
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  btnGetIn: {
    width: 0.15 * width,
    height: 0.15 * width,
    alignSelf: 'flex-end',
    borderRadius: 50,
    backgroundColor: Color.primary,
  },
});

export default styles;
