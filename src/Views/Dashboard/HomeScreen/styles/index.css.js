import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  //Body
  bodyContainer: {
    backgroundColor: Color.secondary,
    flex: 0.9,
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

  floatButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 0.15 * width,
    height: 0.15 * width,
    borderRadius: (0.15 * width) / 2,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default styles;
