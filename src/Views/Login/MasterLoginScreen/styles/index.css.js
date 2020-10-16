import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';

const styles = StyleSheet.create({
  input: {
    flex: 0.3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
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
    padding: 0,
  },
  body: {
    marginHorizontal: 10,
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  txtloginError:{
    marginTop: 5,
    color: Color.red,
    textAlign: 'center',
  },
  btnLogin: {
    marginHorizontal: 20,
  },
});

export default styles;
