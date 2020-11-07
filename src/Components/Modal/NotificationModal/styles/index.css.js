import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  ModalContainer: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.primary,
    width: 0.65 * width,
    height: 0.45 * width,
    backgroundColor: 'white',
  },
  ModalText: {
    textAlign: 'center',
    flexGrow: 1,
    marginTop: 10,
    fontSize: fontSize.larger,
  },
  btn: {
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    height: 0.1 * width,
    backgroundColor: Color.blue,
  },
  icon: {
    position: 'relative',
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    marginTop: -fontSize.biggest,
    borderRadius: 50,
    padding: 5,
  },
});

export default styles;
