import {StyleSheet} from 'react-native';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.biggest,
    alignSelf: 'center',
    color: Color.secondary,
  },
  btnContainer: {
    flex: 0.3,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  btnMember: {
    borderWidth: 1,
    borderColor: Color.primary,
    backgroundColor: 'white',
  },
});

export default styles;
