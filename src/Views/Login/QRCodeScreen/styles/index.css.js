import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QRMask: {
    width: 0.6 * width,
    height: 0.6 * width,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  QRMask_CornerTopRight: {
    width: 0.05 * width,
    height: 0.05 * width,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderColor: 'white',
  },
  QRMask_CornerBottomRight: {
    width: 0.05 * width,
    height: 0.05 * width,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: 'white',
  },
  QRMask_CornerTopLeft: {
    width: 0.05 * width,
    height: 0.05 * width,
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderColor: 'white',
  },
  QRMask_CornerBottomLeft: {
    width: 0.05 * width,
    height: 0.05 * width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: 'white',
  },
});

export default styles;
