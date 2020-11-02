import {StyleSheet} from 'react-native';

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
  dot: {
    width: fontSize.small,
    height: fontSize.small,
    borderRadius: 50,
  },
});

export default styles;
