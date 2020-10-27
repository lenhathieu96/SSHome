import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  ModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.primary,
    width: 0.6 * width,
    height: 0.3 * width,
    backgroundColor: Color.unactive,
  },
  ModalText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: fontSize.larger,
    color: 'white',
  },
});

export default styles;
