import {StyleSheet} from 'react-native';

import Color from '../../../../../Utils/Color';
import * as fontSize from '../../../../../Utils/FontSize';
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: fontSize.huge,
    color: Color.primary,
    alignSelf: 'center',
  },
});

export default styles;
