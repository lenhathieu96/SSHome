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
  },
  avatar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btnCameraContainer: {
    flex: 0.3,
    backgroundColor: Color.background,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
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
