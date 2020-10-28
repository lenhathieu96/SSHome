import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  imgBg: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 0,
    opacity: 0.8,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  bodyContainer: {
    flex: 0.8,
    padding: 5,
  },
  btnContainer: {
    height: 0.45 * width,
    width: 0.4 * width,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default styles;
