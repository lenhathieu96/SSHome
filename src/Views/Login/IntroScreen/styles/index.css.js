import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

import Color from '../../../../Utils/Color'

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.4,
    justifyContent: 'space-evenly',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 0.6,
  },
  btn: {
    height: 0.2 * width,
    alignSelf: 'center',
    width: 0.7 * width,
    borderRadius: 50,
  },
  btnMember: {
    height: 0.2 * width,
    alignSelf: 'center',
    width: 0.7 * width,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Color.primary,
    backgroundColor: 'white',
  }
});

export default styles;
