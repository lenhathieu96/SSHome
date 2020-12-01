import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

import * as fontSize from '../../../../Utils/FontSize';

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    padding: 10,
  },
  title: {
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
});

export default styles;
