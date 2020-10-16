import {StyleSheet} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  formContainer: {
    padding: 5,
    flexGrow: 1,
    justifyContent: 'space-around',
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
    marginTop: 5,
    color: Color.red,
  },

  txtSignupError:{
    marginTop: 5,
    color: Color.red,
    textAlign: 'center',
  },
  btnSignUp: {
    marginTop: 30,
  },
});

export default styles;
