import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  roomlist: {
    flex: 0.8,
  },
  BtnContainer: {
    height: 0.6 * height,
    width: 0.8 * width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  imgBg: {
    width: 0.75 * width,
    height: 0.58 * height,
    borderRadius: 20,
    position: 'relative',
    zIndex: 0,
  },
  roomTitle: {
    position: 'absolute',
    top: 0.1 * height,
    zIndex: 1,
    alignSelf: 'center',
    color: 'white',
    fontSize: fontSize.bigger,
  },
  descContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

export default styles;
