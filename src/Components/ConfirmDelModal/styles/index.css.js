import {StyleSheet} from 'react-native';
import * as fontSize from '../../../Utils/fontSize';
import color from '../../../Utils/Color';

const styles = StyleSheet.create({
  ModalContainer: {
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    width: 10 * fontSize.biggest,
    backgroundColor: 'white',
  },
  ModalText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: fontSize.large,
  },
  ButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnDeny: {
    borderWidth: 1,
    borderColor: color.primary,
    margin: 10,
    flex: 0.4,
  },
  btnDeny__Text: {
    color: color.primary,
  },

  btnAccept: {
    backgroundColor: color.primary,
    margin: 10,
    flex: 0.4,
  },
  btnAccept__Text: {
    color: 'white',
  },
});

export default styles;
