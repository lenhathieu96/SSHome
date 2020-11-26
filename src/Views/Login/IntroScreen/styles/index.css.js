import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

import Color from '../../../../Utils/Color';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.4,
    justifyContent: 'flex-end',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 0.6,
  },
  btnMember: {
    borderWidth: 1,
    borderColor: Color.primary,
    backgroundColor: 'white',
  },
});

export default styles;
