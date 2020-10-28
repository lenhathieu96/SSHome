import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../../../Utils/Color';
import * as fontSize from '../../../../../Utils/FontSize';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  btnContainer: {
    height: 0.45 * width,
    width: 0.4 * width,
    backgroundColor: Color.secondary,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  deviceInfoContainer: {
    flex: 0.7,
    justifyContent: 'space-around',
  },
  deviceName: {
    fontSize: fontSize.huge,
  },
  deviceStatusContainer: {
    flex: 0.2,
    justifyContent: 'space-around',
    marginRight: 10,
  },
  switch: {
    transform: [{rotate: '-90deg'}],
    borderRadius: 50,
  },
});
export default styles;
