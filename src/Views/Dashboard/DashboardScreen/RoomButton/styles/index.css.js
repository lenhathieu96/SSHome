import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../../../Utils/Color';
import * as fontSize from '../../../../../Utils/FontSize';

const windowWidth = Dimensions.get('window').width;
const containerSize = 0.4 * windowWidth;

const styles = StyleSheet.create({
  BtnContainer: {
    padding: 5,
    borderRadius: 20,
    width: containerSize,
    height: containerSize,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default styles;
