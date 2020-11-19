import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../../Utils/FontSize';

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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgBg: {
    width: 0.7 * width,
    height: 0.58 * height,
    borderRadius: 20,
    position: 'relative',
    zIndex: 0,
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
