import {StyleSheet, Dimensions} from 'react-native';

import * as fontSize from '../../../../Utils/FontSize';
import Color from '../../../../Utils/Color';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  //info
  infoContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  txtWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txtWeather: {
    fontSize: fontSize.larger,
    marginBottom: 3,
  },
  //Body
  bodyContainer: {
    zIndex: 0,
    flex: 0.8,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 5,
    backgroundColor: Color.background,
  },
  roomlist: {
    zIndex: 0,
    flexGrow: 1,
    alignSelf: 'center',
  },
  listTitle: {
    marginVertical: 10,
    color: Color.primary,
    alignSelf: 'center',
  },
  btnMic: {
    borderRadius: 50,
    width: fontSize.biggest * 2.5,
    height: fontSize.biggest * 2.5,
    backgroundColor: 'blue',
  },
  floatBtnContainer: {
    marginTop: -30,
    marginBottom: -40,
    height: 120,
    zIndex: 1,
    width: 110,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 80,
    width,
  },
});

export default styles;
