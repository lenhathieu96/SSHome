import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imgBg: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 0,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  headerContainer: {
    height: Platform.OS === 'android' ? 60 : 120,
    justifyContent: 'space-between',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomTitle: {
    color: 'white',
    fontSize: fontSize.bigger,
  },
});
export default styles;
