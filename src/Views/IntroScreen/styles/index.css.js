import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../Utils/Color';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnContainer: {
    justifyContent: 'flex-end',
  },
  btnMember: {
    borderWidth: 1,
    borderColor: Color.primary,
    backgroundColor: 'white',
  },
});

export default styles;
