import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 0.05 * height,
  },
  Body: {
    backgroundColor: 'white',
    padding: 10,
    height: 0.75 * height,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginVertical: 10,
  },
  timesBtn: {
    alignSelf: 'flex-end',
  },
  radioButton: {
    flex: 0.33,
    alignSelf: 'flex-start',
  },
  listPorts: {
    flex: 0.6,
    paddingHorizontal: 5,
  },
  btnContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
});

export default styles;
