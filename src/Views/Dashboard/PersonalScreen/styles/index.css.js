import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  userInfoContainer: {
    flex: 0.4,
    padding: 5,
    alignItems: 'center',
  },

  avatarContainer: {
    height: 0.5 * width,
    width: 0.5 * width,
    borderRadius: (0.5 * width) / 2,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: Color.secondary,
  },
  avatar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  txtInfoContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  memberListContainer: {
    flex: 0.2,
  },

  //place holder
  placeholderContainer: {
    borderRadius: 10,
    width: 0.3 * width,
    height: 0.4 * width,
    marginHorizontal: 5,
    alignItems: 'center',
    position: 'relative',
  },
  placeholderAvatar: {
    width: 0.25 * width,
    height: 0.25 * width,
    borderRadius: 50,
    overflow: 'hidden',
    padding: 10,
  },
  placeholderNameContainer: {
    width: 0.3 * width,
    height: 0.05 * width,
    padding: 5,
    marginTop: -15,
    alignItems: 'center',
    borderRadius: 20,
  },

  //
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
  },
  QRCodeContainer: {
    position: 'relative',
    zIndex: 0,
    padding: 5,
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
