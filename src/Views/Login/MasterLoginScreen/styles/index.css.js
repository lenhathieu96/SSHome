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
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  btnLogin: {
    marginHorizontal: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default styles;
