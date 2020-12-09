import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  roomlist: {
    marginBottom: -25,
  },
  BtnContainer: {
    height: 0.6 * height,
    width: 0.75 * width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imgContainer: {
    width: 0.7 * width,
    height: 0.58 * height,
    borderRadius: 20,
    position: 'relative',
    zIndex: 0,
    borderWidth: 0.5,
    borderColor: Color.unactive,
  },

  imgBg: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    borderRadius: 20,
  },
  roomTitle: {
    fontSize: fontSize.huge,
  },
  roomNameContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.8,
    width: 0.7 * width,
    height: 0.2 * width,
    zIndex: 1,
  },
  descContainer: {
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    top: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.8,
    width: 0.3 * width,
    height: 0.1 * width,
    zIndex: 1,
  },
});

export default styles;
