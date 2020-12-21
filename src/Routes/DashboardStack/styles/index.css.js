import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  drawerHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.background,
  },
  avatarContainer: {
    width: 2.3 * fontSize.biggest,
    height: 2.3 * fontSize.biggest,
    borderRadius: (2.3 * fontSize.biggest) / 2,
    backgroundColor: Color.unactive,
    marginRight: 15,
  },
  avatar: {
    flex: 1,
    width: null,
    height: null,
  },
  userInfoContainer: {
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: fontSize.larger,
    marginBottom: 5,
  },
  userInfo: {
    marginVertical: 2,
  },
  label: {
    fontFamily: 'MavenPro-Bold',
    fontSize: fontSize.normal,
    color: 'black',
    fontWeight: 'bold',
  },
  drawerBodyContainer: {
    height: 0.7 * height,
    borderBottomWidth: 1,
    borderColor: Color.background,
  },
  txtVersion: {
    marginTop: 10,
    marginLeft: 20,
  },
});

export default styles;
