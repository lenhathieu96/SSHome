import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    width: 0.8 * width,
    height: 0.3 * height,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: fontSize.huge,
  },
  input: {
    padding: 10,
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
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    flex: 0.4,
  },
});

export default styles;
