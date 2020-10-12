import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    width,
    height,
  },
  content: {
    flex: 0,
  },
  marker: {
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 4,
  }
});

export default styles;
