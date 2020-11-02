import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';

const styles = StyleSheet.create({
  input: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  body: {
    marginHorizontal: 10,
    flex: 0.4,
    justifyContent: 'space-between',
  },
  txtloginError: {
    marginTop: 5,
    color: Color.red,
    textAlign: 'center',
  },
  btnLogin: {
    marginHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default styles;
