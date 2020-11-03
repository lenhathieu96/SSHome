import {StyleSheet} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  body: {
    marginHorizontal: 10,
    flex: 0.3,
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: fontSize.large,
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    letterSpacing: 2,
    borderRadius: 10,
    marginVertical: 10,
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
  },
  txtInfo: {
    textAlign: 'center',
    color: Color.blue,
    marginVertical: 10,
  },
});

export default styles;
