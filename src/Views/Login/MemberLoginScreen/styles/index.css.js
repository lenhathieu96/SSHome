import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  body: {
    marginHorizontal: 10,
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  input: {
    justifyContent: 'center',
    textAlign: 'center',
    letterSpacing: 2,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    fontWeight: 'bold',
  },
  txtInfo: {
    textAlign: 'center',
    color: Color.blue,
    marginVertical: 10,
  },
  txtError: {
    marginVertical: 10,
    color: Color.red,
    textAlign: 'center',
  },
  btnLogin: {
    marginHorizontal: 10,
  },
});

export default styles;
