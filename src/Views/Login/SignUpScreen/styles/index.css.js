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
    justifyContent: 'space-evenly',
  },
  input: {
    flex: 0.7,
    fontSize: fontSize.normal,
    fontFamily: 'MavenPro-Regular',
  },
  txtError: {
    marginLeft: 5,
    alignSelf: 'flex-start',
  },

  txtSignupError: {
    marginTop: 5,
    color: Color.red,
    textAlign: 'center',
  },
  btnSignUp: {
    marginTop: 30,
  },
});

export default styles;
