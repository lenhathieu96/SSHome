import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  areaCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    flex: 0.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  input: {
    flex: 0.6,
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
  inputController: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  body: {
    marginHorizontal: 10,
    flex: 0.35,
    justifyContent: 'space-between',
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
