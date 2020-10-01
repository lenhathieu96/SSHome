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
    flex: 0.6,
  },
  listDevice: {
    flex: 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footerContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: Color.background,
    flexDirection: 'row',
    flex: 0.1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  floatButton: {
    backgroundColor: 'white',
    width: 0.2 * windowWidth,
    height: 0.2 * windowWidth,
    borderRadius: (0.2 * windowWidth) / 2,
    marginTop: -40,
    zIndex: 1,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
export default styles;
