import {StyleSheet} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const styles = StyleSheet.create({
  ModalContainer: {
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.primary,
    width: 10 * fontSize.biggest,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ModalText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: fontSize.large,
  },
});

export default styles;
