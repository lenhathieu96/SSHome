import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Header: {
    backgroundColor: Color.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Body: {
    backgroundColor: Color.background,
    padding: 10,
    height: 0.67 * height,
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
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  radioButtonContainer: {
    marginHorizontal: 10,
    flex: 0.6,
  },
  listRoom: {
    justifyContent: 'space-between',
  },
  radioButton: {
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lines: {
    width: 50,
    height: 5,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});

export default styles;
