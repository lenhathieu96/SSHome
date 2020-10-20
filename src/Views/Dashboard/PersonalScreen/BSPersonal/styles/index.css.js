import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../../Utils/FontSize';
import Color from '../../../../../Utils/Color';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  Body: {
    backgroundColor: Color.background,
    padding: 10,
    height: 0.7 * height,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
  },
  formController: {
    height: 0.3 * height,
    justifyContent: 'space-around',
  },
});

export default styles;
