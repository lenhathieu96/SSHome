import {StyleSheet, Dimensions} from 'react-native';

import Color from '../../../Utils/Color';
import * as fontSize from '../../../Utils/FontSize';

const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
  drawerHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.borderHighLight,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: 'blue',
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
    borderColor: Color.borderHighLight,
  },
  txtVersion: {
    marginTop: 10,
    marginLeft: 20,
  },
});

export default styles;
