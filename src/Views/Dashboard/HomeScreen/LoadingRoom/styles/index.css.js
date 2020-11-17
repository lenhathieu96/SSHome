import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../../../Utils/Color';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginBottom: -15,
    alignSelf: 'center',
    backgroundColor: Color.background,
    width: 0.7 * width,
    height: 0.58 * height,
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 4,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,
    // elevation: 5,
  },
});

export default styles;
