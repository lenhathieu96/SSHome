import {StyleSheet} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  masterInfoContainer: {
    flex: 0.2,
  },

  memberListContainer: {
    flex: 0.4,
  },
  memberList: {
    alignSelf: 'center',
  },
  title: {
    fontSize: fontSize.large,
    color: Color.primary,
    padding: 5,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  QRCodeContainer: {
    padding: 5,
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
