import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Body: {
    backgroundColor: 'white',
    padding: 10,
    height: 0.8 * height,
  },
  title: {
    fontSize: fontSize.larger,
    alignSelf: 'center',
    marginVertical: 10,
  },
  lines: {
    width: 60,
    height: 5,
    borderRadius: 50,
    backgroundColor: Color.primary,
  },
  radioButton: {
    flex: 0.4,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRoom: {
    flex: 0.6,
  },
  text: {
    flex: 0.2,
    textAlignVertical: 'center',
  },
  btnContainer: {
    flex: 0.3,
    textAlignVertical: 'center',
  },
});

export default styles;
