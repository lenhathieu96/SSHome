import {StyleSheet} from 'react-native';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';

const styles = StyleSheet.create({
  radioBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  dotContainer: {
    width: fontSize.huge,
    height: fontSize.huge,
    borderRadius: 50,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dotChecked: {
    width: fontSize.small,
    height: fontSize.small,
    borderRadius: 50,
    backgroundColor: Color.primary,
  },
  dotUnChecked: {
    width: fontSize.small,
    height: fontSize.small,
    borderRadius: 50,
    backgroundColor: 'transparent',
  },
});

export default styles;
