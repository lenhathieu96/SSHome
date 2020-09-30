import {StyleSheet, Dimensions} from 'react-native';
import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.3,
    overflow: 'hidden',
  },
  headerBg: {
    flex: 1,
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: 'black',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  imgBg: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.6,
  },
  btnChangeBg: {
    width: 120,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Color.primary,
  },

  txtBtnChangeBg: {
    fontWeight: 'normal',
    fontSize: fontSize.smaller,
  },
  titleContainer: {
    zIndex: 1,
    position: 'absolute',
    width: windowWidth,
    bottom: 30,
    padding: 5,
  },
  title: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: fontSize.huge,
  },
  titleDescContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDesc: {
    color: 'white',
    fontSize: fontSize.large,
  },
  bodyContainer: {
    flex: 0.7,
  },
  listDevice: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default styles;
