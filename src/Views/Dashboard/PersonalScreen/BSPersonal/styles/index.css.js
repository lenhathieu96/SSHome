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
    alignItems: 'center',
    justifyContent: 'center',
  },
  Body: {
    backgroundColor: 'white',
    padding: 10,
    height: 0.75 * height,
    justifyContent: 'space-around',
  },
  BSTitle: {
    textAlign: 'center',
    fontSize: fontSize.large,
  },
  input: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  radioButtonContainer: {
    flex: 0.7,
  },
  listRoom: {
    justifyContent: 'space-between',
  },
  radioButton: {
    flex: 0.5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lines: {
    width: 60,
    height: 5,
    borderRadius: 50,
    backgroundColor: Color.primary,
  },
});

export default styles;
