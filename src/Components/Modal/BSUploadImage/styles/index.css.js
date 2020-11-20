import {StyleSheet} from 'react-native';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    padding: 10,
    borderBottomWidth: 1,
  },
  txt: {
    color: 'black',
  },
  btnCancel: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  txtBtnCancel: {
    color: Color.red,
  },
  indicator: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  loadingTitle: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default styles;
