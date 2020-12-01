import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../Utils/FontSize';
import Color from '../../../Utils/Color';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  //Body
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
    justifyContent: 'space-between',
  },
  listTitle: {
    color: Color.primary,
    fontSize: fontSize.huge,
    alignSelf: 'center',
    marginTop: 10,
  },

  placeHolder: {
    marginBottom: -15,
    alignSelf: 'center',
    width: 0.7 * width,
    height: 0.58 * height,
    borderRadius: 20,
  },

  floatButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 0.15 * width,
    height: 0.15 * width,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10,
  },
});

export default styles;
