import {StyleSheet} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  formContainer: {
    padding: 5,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    flex: 0.2,
  },
  input: {
    flex: 1,
    fontSize: fontSize.normal,
    fontFamily: 'MavenPro-Regular',
  },
  txtError: {
    marginTop: 10,
    color: Color.red,
  },
  btnSignUp: {
    marginTop: 20,
  },
});

export default styles;
