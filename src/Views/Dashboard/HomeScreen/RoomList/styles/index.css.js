import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  roomlist: {
    marginBottom: -15,
  },
  BtnContainer: {
    height: 0.6 * height,
    width: 0.75 * width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imgBg: {
    width: 0.7 * width,
    height: 0.58 * height,
    borderRadius: 20,
  },
  roomTitle: {
    marginTop: 0.1 * height,
    alignSelf: 'center',
    color: 'white',
    fontSize: fontSize.bigger,
  },
  descContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: 100,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default styles;
