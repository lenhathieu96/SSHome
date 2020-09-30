import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../../../Utils/Color';
import * as fontSize from '../../../../../Utils/FontSize';

const windowWidth = Dimensions.get('window').width;
const containerSize = 0.4 * windowWidth;
const styles = StyleSheet.create({
  btnContainer: {
    height: 1.2 * containerSize,
    width: containerSize,
    backgroundColor: Color.secondary,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  iconContainer: {
    padding: 10,
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deviceName: {
    color: 'white',
    fontSize: fontSize.large,
    marginVertical: 10,
  },
  controlContainer: {
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  btnPowerOff: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: Color.red,
  },
  btnPowerOn: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: Color.green,
  },
  deviceStatusOn: {
    color: Color.green,
    fontSize: fontSize.large,
    marginTop: 0.6 * fontSize.biggest,
  },
  deviceStatusOff: {
    color: Color.red,
    fontSize: fontSize.large,
    marginTop: 0.6 * fontSize.biggest,
  },
});
export default styles;
