import {StyleSheet} from 'react-native';

import Color from '../../../../Utils/Color';
import * as fontSize from '../../../../Utils/FontSize';

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: Color.blue,
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginVertical: 10,
  },
  voiceContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listenContainer: {
    flex: 1,
  },
});

export default styles;
