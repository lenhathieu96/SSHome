import {StyleSheet} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';
const styles = StyleSheet.create({
  masterInfoContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },

  avatarContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 120,
  },
  infoContainer: {
    flex: 0.7,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },

  txtInfoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  memberListContainer: {
    flex: 0.4,
  },
  btnAddContainer: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  text: {
    textAlign: 'center',
  },
  icon_container: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#3578E5',
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
